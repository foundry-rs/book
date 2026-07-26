import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

// Lints forge/cast/anvil/chisel invocations in authored pages against the
// generated CLI reference: the resolved subcommand page must exist and every
// long flag used must appear in that page's captured --help output. The lint
// is deliberately conservative and skips anything it cannot confidently parse,
// preferring false negatives over false positives.

type Baseline = {
  schemaVersion: 1;
  violations: string[];
};

const root = resolve(import.meta.dir, "..");
const baselinePath = join(root, "scripts/narrative-command-baseline.json");
const pagesDir = join(root, "src/pages");
const referenceDir = join(pagesDir, "reference");

// Generated CLI reference trees (see AGENTS.md); authored pages are linted
// against them, the trees themselves are generator-owned and skipped.
const tools = ["forge", "cast", "anvil", "chisel"];

const args = new Set(process.argv.slice(2));

if (args.has("--help")) {
  console.log(`Usage:
  bun scripts/check-narrative-commands.ts
  bun scripts/check-narrative-commands.ts --accept-current

The default mode checks authored pages against the committed baseline. Only use
--accept-current when intentionally reviewing and accepting the current
violations.`);
  process.exit(0);
}

let baseline = JSON.parse(readFileSync(baselinePath, "utf8")) as Baseline;

const mdxFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(dir, entry.name);
      if (tools.some((tool) => path === join(referenceDir, tool))) {
        return [];
      }
      return entry.isDirectory() ? mdxFiles(path) : entry.name.endsWith(".mdx") ? [path] : [];
    })
    .sort();

// The generated page for a subcommand path; the tool root is `<tool>/<tool>.mdx`
// and `cast send --create`-style subcommands are `--create.mdx` pages.
const refPage = (tool: string, path: string[]) =>
  join(referenceDir, tool, ...path.slice(0, -1), `${path.at(-1) ?? tool}.mdx`);

const hasSubcommands = (tool: string, path: string[]) => {
  const dir = join(referenceDir, tool, ...path);
  return path.length === 0 || (existsSync(dir) && statSync(dir).isDirectory());
};

const pageCache = new Map<string, string>();
const readPage = (page: string) => {
  let content = pageCache.get(page);
  if (content === undefined) {
    content = readFileSync(page, "utf8");
    pageCache.set(page, content);
  }
  return content;
};

// A flag counts as documented when any page along the resolved subcommand
// chain mentions it: parent-level options such as wallet flags stay valid
// after a nested subcommand but only appear in the parent's captured help.
const flagDocumented = (chain: string[], flag: string) => {
  const escaped = flag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^A-Za-z0-9-])${escaped}(?![A-Za-z0-9.-])`, "m");
  return chain.some((page) => pattern.test(readPage(page)));
};

const aliasCache = new Map<string, Map<string, string>>();

// Subcommand aliases from a command page's captured help. Clap prints them as
// `[alias: x]` or `[aliases: x, y]` after the subcommand's summary, wrapping
// long lists, so continuation lines fold into the entry started at the
// two-space indent. Option aliases parsed the same way are harmless: no page
// ever exists for their entry name.
const aliasesOf = (page: string) => {
  let aliases = aliasCache.get(page);
  if (aliases !== undefined) return aliases;
  aliases = new Map();
  let entry: string | undefined;
  let buffer = "";
  const flush = () => {
    for (const match of buffer.matchAll(/\[alias(?:es)?:\s+([^\]]+)\]/g)) {
      for (const alias of match[1].split(",")) aliases.set(alias.trim(), entry ?? "");
    }
  };
  for (const line of readPage(page).split("\n")) {
    const start = /^ {2}(\S+)/.exec(line);
    if (start) {
      flush();
      entry = start[1];
      buffer = line;
    } else if (entry !== undefined) {
      buffer += `\n${line}`;
    }
  }
  flush();
  aliasCache.set(page, aliases);
  return aliases;
};

// Splits a command into top-level shell tokens. Quoted contents, command
// substitutions, and `<PLACEHOLDER>` values stay inside their token but are
// never inspected; the command is cut at pipes, separators, redirects, and
// comments. Returns undefined for lines this lint does not confidently parse.
function tokenize(command: string): string[] | undefined {
  const tokens: string[] = [];
  let current = "";
  const push = () => {
    if (current.length > 0) {
      tokens.push(current);
      current = "";
    }
  };
  let i = 0;
  while (i < command.length) {
    const ch = command[i];
    if (ch === "'") {
      const end = command.indexOf("'", i + 1);
      if (end === -1) return undefined;
      current += "''";
      i = end + 1;
    } else if (ch === '"') {
      let j = i + 1;
      while (j < command.length && command[j] !== '"') {
        j += command[j] === "\\" ? 2 : 1;
      }
      if (j >= command.length) return undefined;
      current += '""';
      i = j + 1;
    } else if (ch === "$" && command[i + 1] === "(") {
      let depth = 1;
      let j = i + 2;
      while (j < command.length && depth > 0) {
        if (command[j] === "(") depth += 1;
        else if (command[j] === ")") depth -= 1;
        j += 1;
      }
      if (depth > 0) return undefined;
      current += "$()";
      i = j;
    } else if (ch === "`") {
      return undefined;
    } else if (ch === "<") {
      const placeholder = /^<[\w.:-]+>/.exec(command.slice(i));
      if (!placeholder) break;
      current += placeholder[0];
      i += placeholder[0].length;
    } else if (ch === "|" || ch === ";" || ch === "&" || ch === ">" || ch === "#") {
      break;
    } else if (ch === " " || ch === "\t") {
      push();
      i += 1;
    } else {
      current += ch;
      i += 1;
    }
  }
  push();
  return tokens;
}

type Resolved = {
  display: string;
  // The resolved page followed by its ancestors up to the tool root.
  chain: string[];
};

type PageLint = {
  file: string;
  // Commands resolved from the page's invocations, keyed by reference page.
  resolvedPages: Map<string, Resolved>;
  violations: Set<string>;
};

function checkInvocation(command: string, lint: PageLint) {
  const tokens = tokenize(command);
  if (!tokens) return;

  // Skip leading environment assignments such as `FOUNDRY_PROFILE=ci`.
  let index = 0;
  while (index < tokens.length && /^[A-Za-z_]\w*=/.test(tokens[index])) index += 1;
  const tool = tokens[index] ?? "";
  if (!tools.includes(tool)) return;
  index += 1;

  // Greedily resolve the longest subcommand path with a generated page; this
  // also consumes `--create` where `--create.mdx` exists. A token without a
  // page of its own may still be a subcommand alias listed in the parent's
  // help, in which case it resolves to the canonical command's page.
  const path: string[] = [];
  const written: string[] = [];
  while (index < tokens.length) {
    const token = tokens[index];
    let canonical: string | undefined;
    if (existsSync(refPage(tool, [...path, token]))) {
      canonical = token;
    } else {
      const target = aliasesOf(refPage(tool, path)).get(token);
      if (target !== undefined && existsSync(refPage(tool, [...path, target]))) {
        canonical = target;
      }
    }
    if (canonical === undefined) break;
    path.push(canonical);
    written.push(token);
    index += 1;
  }
  const display = [tool, ...written].join(" ");
  const page = refPage(tool, path);
  if (!existsSync(page)) {
    lint.violations.add(`${lint.file}: no reference page for \`${display}\``);
    return;
  }

  // A bare word right after a command that has subcommands is an intended
  // subcommand without a generated page or alias, not a positional argument.
  // Hex literals and bare numbers are argument values, never command words.
  const next = tokens[index] ?? "";
  if (
    hasSubcommands(tool, path) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(next) &&
    /[a-z]/.test(next) &&
    !next.startsWith("0x")
  ) {
    lint.violations.add(`${lint.file}: unknown subcommand \`${display} ${next}\``);
    return;
  }

  const chain = path.map((_, depth) => refPage(tool, path.slice(0, path.length - depth)));
  chain.push(refPage(tool, []));
  lint.resolvedPages.set(page, { display, chain });
  for (; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token === "--") break;
    const flag = /^(--[a-z0-9][a-z0-9.-]*)(?:=|$)/.exec(token);
    if (flag && !flagDocumented(chain, flag[1])) {
      lint.violations.add(`${lint.file}: \`${display}\` does not document \`${flag[1]}\``);
    }
  }
}

function checkFile(file: string): Set<string> {
  const lint: PageLint = {
    file: relative(root, file).replaceAll("\\", "/"),
    resolvedPages: new Map(),
    violations: new Set(),
  };
  const lines = readFileSync(file, "utf8").split("\n");
  const flagRows: string[] = [];

  let fence: string | undefined;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const open = /^```+(\w*)/.exec(line);
    if (open) {
      fence = fence === undefined ? open[1] : undefined;
      continue;
    }
    if (fence === "bash" && line.startsWith("$ ")) {
      let command = line.slice(2);
      while (command.endsWith("\\") && i + 1 < lines.length) {
        i += 1;
        command = `${command.slice(0, -1)} ${lines[i].trim()}`;
      }
      checkInvocation(command, lint);
    } else if (fence === undefined) {
      const row = /^\|\s*`(--[a-z0-9][a-z0-9.-]*)[^`]*`\s*\|/.exec(line);
      if (row) flagRows.push(row[1]);
    }
  }

  // Markdown rows like `| \`--flag\` | ... |` document flags of the command a
  // page is about. Only pages whose invocations all resolve to one reference
  // page give that association confidently; skip flag tables everywhere else.
  if (lint.resolvedPages.size === 1 && lint.violations.size === 0) {
    const [{ display, chain }] = lint.resolvedPages.values();
    for (const flag of flagRows) {
      if (!flagDocumented(chain, flag)) {
        lint.violations.add(`${lint.file}: \`${display}\` does not document \`${flag}\``);
      }
    }
  }

  return lint.violations;
}

const files = mdxFiles(pagesDir);
const violations = [...new Set(files.flatMap((file) => [...checkFile(file)]))].sort();

if (args.has("--accept-current")) {
  baseline = { ...baseline, violations };
  writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
}

// Baseline entries fixed by docs PRs must be removed from the baseline; run
// with --accept-current to refresh it after reviewing the change.
const known = new Set(baseline.violations);
const unexpected = violations.filter((violation) => !known.has(violation));
const fixed = baseline.violations.filter((violation) => !violations.includes(violation));

console.log(
  `Narrative commands: ${files.length} authored pages scanned; ${violations.length - unexpected.length} baselined violations; ${unexpected.length} new.`,
);

const failures: string[] = [];
if (unexpected.length > 0) {
  failures.push(`New narrative command violations:\n  ${unexpected.join("\n  ")}`);
}
if (fixed.length > 0) {
  failures.push(`Remove fixed entries from the baseline:\n  ${fixed.join("\n  ")}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.join("\n\n")}\n`);
  console.error(
    "Fix the page against the generated CLI reference, or run with --accept-current only when intentionally updating the reviewed baseline.",
  );
  process.exit(1);
}
