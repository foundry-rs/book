#!/usr/bin/env python3

import argparse
import os
import re
import subprocess
import sys
from os import makedirs, path

HELP_KEY = "help"
SECTION_START = "<!-- CLI_REFERENCE START -->"
SECTION_END = "<!-- CLI_REFERENCE END -->"
SECTION_RE = rf"\s*{SECTION_START}.*?{SECTION_END}"


def main():
    args = parse_args(sys.argv[1:])
    for cmd in args.commands:
        if cmd.find(" ") >= 0:
            raise Exception(f"subcommands are not allowed: {cmd}")
    makedirs(args.out_dir, exist_ok=True)

    output = {}

    # Iterate over all commands and their subcommands.
    cmd_iter = [[cmd] for cmd in args.commands]
    for cmd in cmd_iter:
        subcmds, stdout = get_entry(cmd)
        if args.verbose and len(subcmds) > 0:
            eprint(f"Found subcommands for \"{' '.join(cmd)}\": {subcmds}")

        # Add entry to output map, e.g. `output["cmd"]["subcmd"]["help"] = "..."`.
        e = output
        for arg in cmd:
            tmp = e.get(arg)
            if not tmp:
                e[arg] = {}
                tmp = e[arg]
            e = tmp
        e[HELP_KEY] = stdout

        # Append subcommands.
        for subcmd in subcmds:
            eprint(f"Adding subcommand: {' '.join(cmd)} {subcmd}")
            cmd_iter.append(cmd + [subcmd])

    # Generate markdown files.
    summary = ""
    root_summary = ""
    for cmd, obj in output.items():
        cmd_markdown(args.out_dir, cmd, obj)

        root_path = path.relpath(args.out_dir, args.root_dir)
        summary += cmd_summary("", cmd, obj, 0)
        summary += "\n"

        root_summary += cmd_summary(root_path, cmd, obj, args.root_indentation)
        root_summary += "\n"
    with open(path.join(args.out_dir, "SUMMARY.md"), "w") as f:
        f.write(summary)

    # Replace the CLI_REFERENCE section in the root SUMMARY.md file.
    summary_file = path.join(args.root_dir, "SUMMARY.md")

    with open(summary_file, "r") as f:
        real_root_summary = f.read()

    if not re.search(SECTION_RE, real_root_summary, flags=re.DOTALL):
        raise Exception(
            f"Could not find CLI_REFERENCE section in {summary_file}. "
            "Please add the following section to the file:\n"
            f"{SECTION_START}\n{SECTION_END}"
        )

    last_line = re.findall(f".*{SECTION_END}", real_root_summary)[0]
    root_summary_s = root_summary.rstrip().replace("\n\n", "\n")
    replace_with = f" {SECTION_START}\n{root_summary_s}\n{last_line}"

    real_root_summary = re.sub(
        SECTION_RE, replace_with, real_root_summary, flags=re.DOTALL
    )
    root_summary_file = path.join(args.root_dir, "SUMMARY.md")
    with open(root_summary_file, "w") as f:
        f.write(real_root_summary)


def parse_args(args: list[str]):
    """Parses command line arguments."""
    parser = argparse.ArgumentParser(
        description="Generate markdown files from help output of commands"
    )
    parser.add_argument("--root-dir", default=".", help="Root directory")
    parser.add_argument(
        "--root-indentation",
        default=0,
        type=int,
        help="Indentation for the root SUMMARY.md file",
    )
    parser.add_argument("--out-dir", default=".", help="Output directory")
    parser.add_argument(
        "commands",
        nargs="+",
        help="Command to generate markdown for. Can be a subcommand.",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Print verbose output"
    )
    return parser.parse_known_args(args)[0]


def get_entry(cmd: list[str]):
    """Returns the subcommands and help output for a command."""
    env = os.environ.copy()
    env["NO_COLOR"] = "1"
    env["COLUMNS"] = "100"
    env["LINES"] = "10000"
    output = subprocess.run(cmd + ["--help"], capture_output=True, env=env)
    if output.returncode != 0:
        stderr = output.stderr.decode("utf-8")
        raise Exception(f"Command \"{' '.join(cmd)}\" failed:\n{stderr}")
    stdout = output.stdout.decode("utf-8")
    subcmds = parse_sub_commands(stdout)
    return subcmds, stdout


def parse_sub_commands(s: str):
    """Returns a list of subcommands from the help output of a command."""
    idx = s.find("Commands:")
    if idx < 0:
        return []
    s = s[idx:]

    idx = s.find("Options:")
    if idx < 0:
        return []
    s = s[:idx]

    idx = s.find("Arguments:")
    if idx >= 0:
        s = s[:idx]

    subcmds = s.splitlines()[1:]
    subcmds = filter(
        lambda x: x.strip() != "" and x.startswith("  ") and x[2] != " ", subcmds
    )
    subcmds = map(lambda x: x.strip().split(" ")[0], subcmds)
    subcmds = filter(lambda x: x != "help", subcmds)
    return list(subcmds)


def cmd_markdown(out_dir: str, cmd: str, obj: object):
    """Writes the markdown for a command and its subcommands to out_dir."""

    def rec(cmd: list[str], obj: object):
        out = ""
        out += f"# {' '.join(cmd)}\n\n"
        out += help_markdown(cmd, obj[HELP_KEY])
        out_path = out_dir
        for arg in cmd:
            out_path = path.join(out_path, arg)
        makedirs(path.dirname(out_path), exist_ok=True)
        with open(path.join(out_dir, f"{out_path}.md"), "w") as f:
            f.write(out)

        for k, v in obj.items():
            if k == HELP_KEY:
                continue
            rec(cmd + [k], v)

    rec([cmd], obj)


def help_markdown(cmd: list[str], s: str):
    """Returns the markdown for a command's help output."""
    description, s = parse_description(s)
    return f"""\
{description}

```bash
$ {' '.join(cmd)} --help
{s.strip()}
```"""


def parse_description(s: str):
    """Splits the help output into a description and the rest."""
    idx = s.find("Usage:")
    if idx < 0:
        return "", s
    return s[:idx].strip().splitlines()[0].strip(), s[idx:]


def cmd_summary(md_root: str, cmd: str, obj: object, indent: int):
    """Returns the summary for a command and its subcommands."""

    def rec(cmd: list[str], obj: object, indent: int):
        nonlocal out
        cmd_s = " ".join(cmd)
        cmd_path = cmd_s.replace(" ", "/")
        if md_root != "":
            cmd_path = f"{md_root}/{cmd_path}"
        out += f"{' ' * indent}- [`{cmd_s}`](./{cmd_path}.md)\n"

        for k, v in obj.items():
            if k == HELP_KEY:
                continue
            rec(cmd + [k], v, indent + 2)

    out = ""
    rec([cmd], obj, indent)
    return out


def eprint(*args, **kwargs):
    """Prints to stderr."""
    print(*args, file=sys.stderr, **kwargs)


if __name__ == "__main__":
    main()
