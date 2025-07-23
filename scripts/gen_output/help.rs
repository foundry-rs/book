#!/usr/bin/env -S cargo +nightly -Zscript
---
[package]
edition = "2021"

[dependencies]
clap = { version = "4", features = ["derive"] }
pathdiff = "0.2"
regex = "1"
---
use clap::Parser;
use regex::Regex;
use std::borrow::Cow;
use std::collections::BTreeMap;
use std::fs;
use std::io;
use std::iter::once;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::str;
use std::sync::LazyLock;
use std::{fmt, process};

const SECTION_START: &str = "<!-- CLI_REFERENCE START -->";
const SECTION_END: &str = "<!-- CLI_REFERENCE END -->";
const TRIM_LINE_END_MARKDOWN: bool = false;

/// Lazy static regex to avoid recompiling the same regex pattern multiple times.
macro_rules! regex {
    ($re:expr) => {{
        static RE: LazyLock<Regex> =
            LazyLock::new(|| Regex::new($re).expect("Failed to compile regex pattern"));
        &*RE
    }};
}

/// Generate markdown files from help output of commands
#[derive(Parser, Debug)]
#[command(about, long_about = None)]
struct Args {
    /// Root directory
    #[arg(long, default_value = ".")]
    root_dir: PathBuf,

    /// Indentation for the root SUMMARY.mdx file
    #[arg(long, default_value = "2")]
    root_indentation: usize,

    /// Output directory
    #[arg(long)]
    out_dir: PathBuf,

    /// Whether to add a README.md file
    #[arg(long)]
    readme: bool,

    /// Whether to update the root SUMMARY.mdx file
    #[arg(long)]
    root_summary: bool,

    /// Print verbose output
    #[arg(short, long)]
    verbose: bool,

    /// Path to generate TypeScript sidebar file
    #[arg(long)]
    sidebar_file: Option<PathBuf>,

    /// Commands to generate markdown for.
    #[arg(required = true, num_args = 1..)]
    commands: Vec<PathBuf>,
}

fn write_file(file_path: &Path, content: &str) -> io::Result<()> {
    let content = if TRIM_LINE_END_MARKDOWN {
        content
            .lines()
            .map(|line| line.trim_end())
            .collect::<Vec<_>>()
            .join("\n")
    } else {
        content.to_string()
    };
    fs::write(file_path, content)
}

fn main() -> io::Result<()> {
    let args = Args::parse();
    debug_assert!(args.commands.len() >= 1);

    let out_dir = args.out_dir;
    fs::create_dir_all(&out_dir)?;

    let mut todo_iter: Vec<Cmd> = args
        .commands
        .iter()
        .rev() // reverse to keep the order (pop)
        .map(|path| Cmd::new(path, vec![]))
        .collect();
    let mut output = Vec::new();

    // Iterate over all commands and their subcommands.
    while let Some(cmd) = todo_iter.pop() {
        let (new_subcmds, stdout) = get_entry(&cmd)?;
        if args.verbose && !new_subcmds.is_empty() {
            println!("Found subcommands for `{cmd}`: {}", new_subcmds.join(", "));
        }
        // Add new subcommands to todo_iter (so that they are processed in the correct order).
        for subcmd in new_subcmds.into_iter().rev() {
            let new_subcmds: Vec<_> = cmd
                .subcommands
                .iter()
                .cloned()
                .chain(once(subcmd))
                .collect();

            todo_iter.push(Cmd::new(cmd.cmd, new_subcmds));
        }
        output.push((cmd, stdout));
    }

    // Generate markdown files.
    for (cmd, stdout) in &output {
        cmd_markdown(&out_dir, cmd, stdout)?;
    }

    // Skip generating SUMMARY.mdx as it's not needed for vocs


    // Generate root SUMMARY.mdx.
    if args.root_summary {
        let root_summary: String = output
            .iter()
            .map(|(cmd, _)| {
                let root_path = pathdiff::diff_paths(&out_dir, &args.root_dir);
                cmd_summary(root_path, cmd, args.root_indentation)
            })
            .collect();

        let path = &args.root_dir;
        if args.verbose {
            println!("Updating root summary in {}", path.display());
        }
        update_root_summary(path, &root_summary)?;
    }

    // Generate TypeScript sidebar file
    if let Some(sidebar_file) = &args.sidebar_file {
        if args.verbose {
            println!("Generating sidebar file at {}", sidebar_file.display());
        }
        generate_sidebar(&output, &out_dir, sidebar_file)?;
    }

    Ok(())
}

/// Returns the subcommands and help output for a command.
fn get_entry(cmd: &Cmd) -> io::Result<(Vec<String>, String)> {
    let output = Command::new(cmd.cmd)
        .args(&cmd.subcommands)
        .arg("--help")
        .env("NO_COLOR", "1")
        .env("COLUMNS", "80")
        .env("LINES", "10000")
        .stdout(Stdio::piped())
        .output()?;

    if !output.status.success() {
        let stderr = str::from_utf8(&output.stderr).unwrap_or("Failed to parse stderr as UTF-8");
        return Err(io::Error::new(
            io::ErrorKind::Other,
            format!("Command \"{}\" failed:\n{}", cmd, stderr),
        ));
    }

    let stdout = str::from_utf8(&output.stdout)
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?
        .to_string();

    // Parse subcommands from the help output
    let subcmds = parse_sub_commands(&stdout);

    Ok((subcmds, stdout))
}

/// Returns a list of subcommands from the help output of a command.
fn parse_sub_commands(s: &str) -> Vec<String> {
    // This regex matches lines starting with two spaces, followed by the subcommand name.
    let re = regex!(r"^  (\S+)");

    s.split("Commands:")
        .nth(1) // Get the part after "Commands:"
        .map(|commands_section| {
            commands_section
                .lines()
                .take_while(|line| !line.starts_with("Options:") && !line.starts_with("Arguments:"))
                .filter_map(|line| {
                    re.captures(line)
                        .and_then(|cap| cap.get(1).map(|m| m.as_str().to_string()))
                })
                .filter(|cmd| cmd != "help")
                .map(String::from)
                .collect()
        })
        .unwrap_or_default() // Return an empty Vec if "Commands:" was not found
}

/// Writes the markdown for a command to out_dir.
fn cmd_markdown(out_dir: &Path, cmd: &Cmd, stdout: &str) -> io::Result<()> {
    let out = format!("## {}\n\n{}", cmd, help_markdown(cmd, stdout));

    let out_path = out_dir.join(cmd.md_path());
    fs::create_dir_all(out_path.parent().unwrap())?;
    write_file(&out_path.with_extension("mdx"), &out)?;

    Ok(())
}

/// Returns the markdown for a command's help output.
fn help_markdown(cmd: &Cmd, stdout: &str) -> String {
    let (description, s) = parse_description(stdout);
    let help = preprocess_help(s.trim());
    format!("{description}\n\n```bash\n$ {cmd} --help\n```\n\n```txt\n{help}\n```")
}

/// Splits the help output into a description and the rest.
fn parse_description(s: &str) -> (&str, &str) {
    match s.find("Usage:") {
        Some(idx) => {
            let description = s[..idx].trim().lines().next().unwrap_or("");
            (description, &s[idx..])
        }
        None => ("", s),
    }
}

/// Returns the summary for a command and its subcommands.
fn cmd_summary(md_root: Option<PathBuf>, cmd: &Cmd, indent: usize) -> String {
    let cmd_path = cmd.md_path();
    let tool_name = cmd.command_name();
    let full_cmd_path = match md_root {
        None => format!("/{}/reference/{}", tool_name, cmd_path),
        Some(md_root) => format!("{}/{}", md_root.to_string_lossy(), cmd_path),
    };
    let indent_string = " ".repeat(indent + (cmd.subcommands.len() * 2));
    format!("{indent_string}- [`{cmd}`]({full_cmd_path}.mdx)\n")
}

/// Replaces the CLI_REFERENCE section in the root SUMMARY.mdx file.
fn update_root_summary(root_dir: &Path, root_summary: &str) -> io::Result<()> {
    let summary_file = root_dir.join("SUMMARY.mdx");
    let original_summary_content = fs::read_to_string(&summary_file)?;

    let section_re = regex!(&format!(r"(?s)\s*{SECTION_START}.*?{SECTION_END}"));
    if !section_re.is_match(&original_summary_content) {
        eprintln!(
            "Could not find CLI_REFERENCE section in {}. Please add the following section to the file:\n{}\n... CLI Reference goes here ...\n\n{}",
            summary_file.display(),
            SECTION_START,
            SECTION_END
        );
        process::exit(1);
    }

    let section_end_re = regex!(&format!(r".*{SECTION_END}"));
    let last_line = section_end_re
        .find(&original_summary_content)
        .map(|m| m.as_str().to_string())
        .expect("Could not extract last line of CLI_REFERENCE section");

    let root_summary_s = root_summary.trim_end().replace("\n\n", "\n");
    let replace_with = format!(" {}\n{}\n{}", SECTION_START, root_summary_s, last_line);

    let new_root_summary = section_re
        .replace(&original_summary_content, replace_with.as_str())
        .to_string();

    fs::write(&summary_file, &new_root_summary)
}

/// Preprocesses the help output of a command.
fn preprocess_help(s: &str) -> Cow<'_, str> {
    static REPLACEMENTS: LazyLock<Vec<(Regex, &str)>> = LazyLock::new(|| {
        let patterns: &[(&str, &str)] = &[
            // Escape angle brackets that might be interpreted as HTML/JSX
            (r"<([^>]+)>", "&lt;$1&gt;"),
            // Escape comparison operators
            (r" <= ", " &lt;= "),
            (r" >= ", " &gt;= "),
        ];
        patterns
            .iter()
            .map(|&(re, replace_with)| (Regex::new(re).expect(re), replace_with))
            .collect()
    });

    let mut s = Cow::Borrowed(s);
    for (re, replacement) in REPLACEMENTS.iter() {
        if let Cow::Owned(result) = re.replace_all(&s, *replacement) {
            s = Cow::Owned(result);
        }
    }
    s
}

/// Command with subcommands.
#[derive(Hash, Debug, PartialEq, Eq)]
struct Cmd<'a> {
    /// Path to the binary file (e.g. ./target/debug/reth).
    cmd: &'a Path,
    /// Subcommands (e.g. [db, stats]).
    subcommands: Vec<String>,
}

impl<'a> Cmd<'a> {
    #[track_caller]
    fn new(cmd: &'a Path, subcommands: Vec<String>) -> Self {
        let cmd = Self { cmd, subcommands };
        cmd.assert();
        cmd
    }

    #[track_caller]
    fn assert(&self) {
        for subcmd in &self.subcommands {
            assert!(!subcmd.is_empty(), "subcommand is empty");
            assert!(
                subcmd.chars().all(|c| !c.is_whitespace()),
                "subcommand contains invalid characters: {subcmd}"
            );
        }
    }

    fn command_name(&self) -> &str {
        self.cmd
            .file_name()
            .and_then(|os_str| os_str.to_str())
            .expect("Expect valid command")
    }

    fn md_path(&self) -> String {
        // Don't include the root command name in the path
        if self.subcommands.is_empty() {
            // For root command (e.g., "forge"), just return the command name
            self.command_name().to_string()
        } else {
            // For subcommands, join only the subcommands without the root
            self.subcommands.join("/")
        }
    }

    fn join_s(&self, sep: &str) -> String {
        let mut joined = self.command_name().to_string();
        for subcmd in &self.subcommands {
            joined.push_str(sep);
            joined.push_str(subcmd);
        }
        joined
    }
    
    fn display_name(&self) -> String {
        // For display in sidebar, show full command name
        self.join_s(" ")
    }
}

impl<'a> fmt::Display for Cmd<'a> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        self.join_s(" ").fmt(f)
    }
}

/// Categorize commands for sidebar generation
fn categorize_command(cmd_name: &str, tool_name: &str) -> &'static str {
    match tool_name {
        "forge" => match cmd_name {
            "help" | "completions" => "General Commands",
            "init" | "clone" | "install" | "update" | "remove" | "config" | "remappings" | "tree" | "geiger" => "Project Commands",
            "build" | "clean" | "inspect" => "Build Commands",
            "test" | "snapshot" | "coverage" => "Test Commands",
            "create" | "verify-contract" | "verify-check" | "flatten" => "Deploy Commands",
            _ => "Utility Commands",
        },
        "cast" => match cmd_name {
            "help" | "completions" => "General Commands",
            "chain-id" | "chain" | "client" => "Chain Commands",
            "publish" | "receipt" | "send" | "mktx" | "call" | "rpc" | "tx" | "run" | "estimate" | "access-list" | "logs" => "Transaction Commands",
            "find-block" | "gas-price" | "block-number" | "basefee" | "block" | "age" => "Block Commands",
            "balance" | "storage" | "proof" | "nonce" | "code" | "codesize" => "Account Commands",
            "lookup-address" | "resolve-name" | "namehash" => "ENS Commands",
            "etherscan-source" | "source" => "Etherscan Commands",
            "abi-encode" | "4byte" | "4byte-calldata" | "4byte-event" | "calldata" | "decode-abi" | "decode-calldata" | "pretty-calldata" | "selectors" | "upload-signature" => "ABI Commands",
            "format-bytes32-string" | "from-bin" | "from-fixed-point" | "from-rlp" | "from-utf8" | "from-wei" | "parse-bytes32-address" | "parse-bytes32-string" | "to-ascii" | "to-base" | "to-bytes32" | "to-dec" | "to-fixed-point" | "to-hex" | "to-hexdata" | "to-int256" | "to-rlp" | "to-uint256" | "to-unit" | "to-wei" | "shl" | "shr" => "Conversion Commands",
            "address-zero" | "sig" | "sig-event" | "keccak" | "compute-address" | "create2" | "interface" | "index" | "concat-hex" | "max-int" | "min-int" | "max-uint" | "to-check-sum-address" => "Utility Commands",
            "wallet" => "Wallet Commands",
            _ => "Utility Commands",
        },
        "anvil" => "General Commands",
        "chisel" => match cmd_name {
            "help" | "completions" => "General Commands",
            _ => "Commands",
        },
        _ => "Commands",
    }
}

/// Generate TypeScript sidebar file
fn generate_sidebar(output: &[(Cmd, String)], _out_dir: &Path, sidebar_file: &Path) -> io::Result<()> {
    let tool_name = output.first()
        .map(|(cmd, _)| cmd.command_name())
        .unwrap_or("unknown");
    
    // Group commands by category
    let mut categories: BTreeMap<&str, Vec<&Cmd>> = BTreeMap::new();
    
    for (cmd, _) in output {
        if cmd.subcommands.is_empty() {
            continue; // Skip root command
        }
        
        let cmd_name = cmd.subcommands.last().unwrap();
        let category = categorize_command(cmd_name, tool_name);
        categories.entry(category).or_insert_with(Vec::new).push(cmd);
    }
    
    // Build TypeScript content
    let mut content = String::from("import { SidebarItem } from \"vocs\";\n\n");
    content.push_str(&format!("export const {}CliReference: SidebarItem = {{\n", tool_name));
    content.push_str("    text: \"Reference\",\n");
    content.push_str("    collapsed: true,\n");
    content.push_str("    items: [\n");
    
    // Add root command
    content.push_str(&format!("        {{ text: \"{}\", link: \"/{}/reference\" }},\n", tool_name, tool_name));
    
    // Add categories
    for (category, cmds) in categories {
        if cmds.is_empty() {
            continue;
        }
        
        content.push_str(&format!("        {{\n"));
        content.push_str(&format!("            text: \"{}\",\n", category));
        content.push_str("            collapsed: true,\n");
        content.push_str("            items: [\n");
        
        // Sort commands within category
        let mut sorted_cmds = cmds.clone();
        sorted_cmds.sort_by_key(|cmd| cmd.join_s(" "));
        
        for cmd in sorted_cmds {
            let cmd_path = cmd.md_path();
            content.push_str(&format!("                {{ text: \"{}\", link: \"/{}/reference/{}\" }},\n", 
                cmd.display_name(), tool_name, cmd_path));
        }
        
        content.push_str("            ],\n");
        content.push_str("        },\n");
    }
    
    content.push_str("    ],\n");
    content.push_str("};\n");
    
    // Write the sidebar file
    fs::create_dir_all(sidebar_file.parent().unwrap())?;
    write_file(sidebar_file, &content)?;
    
    Ok(())
}
