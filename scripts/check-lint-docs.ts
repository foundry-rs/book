import { readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { canonicalBody, checkImportedDocs, readLintDocs } from "./import-lint-docs.ts";

const root = resolve(import.meta.dirname, "..");
checkImportedDocs(root);
const pagesDir = join(root, "src/pages/forge/linting");
const index = readFileSync(join(root, "src/pages/forge/linting.mdx"), "utf8");
const sidebar = readFileSync(join(root, "sidebar/forge.ts"), "utf8");
const severityGroups: Record<string, string> = {
  "High severity": "High",
  "Medium severity": "Med",
  "Low severity": "Low",
  Informational: "Info",
  "Gas optimization": "Gas",
  "Code size": "CodeSize",
};
const sidebarGroups = new Map(
  [...sidebar.matchAll(/ruleGroup\("([^"]+)", \[([\s\S]*?)\]\)/g)].flatMap((group) =>
    [...group[2].matchAll(/"([a-z0-9-]+)"/g)].map(
      (match) => [match[1], severityGroups[group[1]]] as const,
    ),
  ),
);
const sidebarIds = new Set(sidebarGroups.keys());
const indexGroups = new Map<string, string | undefined>();
let indexSeverity: string | undefined;
for (const line of index.split("\n")) {
  if (line.startsWith("#### ")) indexSeverity = severityGroups[line.slice(5)];
  const entry = line.match(/^- \[`([a-z0-9-]+)`\]\(\/forge\/linting\/\1\)/);
  if (entry) indexGroups.set(entry[1], indexSeverity);
}
const failures: string[] = [];
const pages = new Map<string, string>();
const legacy = new Set<string>();

// Ignore code fences when interpreting headings and example markers.
function prose(text: string): string {
  return text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "");
}

for (const file of readdirSync(pagesDir)
  .filter((name) => name.endsWith(".mdx"))
  .sort()) {
  const id = basename(file, ".mdx");
  const text = readFileSync(join(pagesDir, file), "utf8");
  pages.set(id, text);
  const fail = (reason: string) => failures.push(`${id}: ${reason}`);
  const isLegacy = /^status: legacy$/m.test(text.split("---")[1] ?? "");
  if (isLegacy) legacy.add(id);
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) fail("ID must use kebab-case");
  if (!text.startsWith("---\n") || !/^description: .+/m.test(text)) fail("missing description");
  if (!text.includes(`**ID**: \`${id}\``)) fail("metadata ID differs from filename");
  if (!/^\*\*Severity\*\*: `(High|Med|Low|Info|Gas|CodeSize)`$/m.test(text)) {
    fail("missing or invalid severity");
  }
  const headings = [...prose(text).matchAll(/^### (.+)$/gm)].map((match) => match[1]);
  const what = headings.indexOf("What it does");
  const why = headings.findIndex((heading) => /^Why (is this bad|restrict this)\?$/.test(heading));
  const example = headings.indexOf("Example");
  if (!(what >= 0 && why > what && example > why))
    fail("required sections missing or out of order");
  for (const heading of ["What it does", "Example"]) {
    if (headings.filter((value) => value === heading).length !== 1)
      fail(`expected one ${heading} section`);
  }
  if (
    headings.filter((heading) => /^Why (is this bad|restrict this)\?$/.test(heading)).length !== 1
  ) {
    fail("expected exactly one rationale section");
  }
  for (const section of prose(text).split(/^### /m).slice(1)) {
    const [heading, ...body] = section.split("\n");
    if (
      (heading === "What it does" || /^Why (is this bad|restrict this)\?$/.test(heading)) &&
      body.join("\n").trim().length === 0
    ) {
      fail(`${heading} section must explain the lint`);
    }
  }
  if (/^#### (Bad|Good)$/m.test(prose(text))) fail("replace Bad/Good headings with Use instead:");
  const examples = text.split("\n### Example\n")[1]?.split(/\n### /)[0] ?? "";
  const parts = examples.split(/^Use instead:$/m);
  const hasCode = (part: string) =>
    [...part.matchAll(/```solidity\n([\s\S]*?)\n```/g)].some((match) => match[1].trim().length > 0);
  if (parts.length !== 2 || !parts.every(hasCode))
    fail("expected a Solidity example on each side of Use instead:");
  if (!isLegacy && !index.includes(`](/forge/linting/${id})`)) fail("missing active index entry");
  if (!isLegacy && !sidebarIds.has(id)) fail("missing sidebar entry");
  const severity = text.match(/^\*\*Severity\*\*: `(\w+)`$/m)?.[1];
  if (!isLegacy && indexGroups.get(id) !== severity)
    fail("index severity group differs from metadata");
  if (!isLegacy && sidebarGroups.get(id) !== severity)
    fail("sidebar severity group differs from metadata");
  if (isLegacy && index.includes(`](/forge/linting/${id})`))
    fail("legacy lint remains in active index");
  if (isLegacy && sidebarIds.has(id)) fail("legacy lint remains in active sidebar");
}

for (const match of index.matchAll(/\]\(\/forge\/linting\/([a-z0-9-]+)\)/g)) {
  if (!pages.has(match[1])) failures.push(`index: unknown lint ${match[1]}`);
}
for (const id of sidebarIds) {
  if (!pages.has(id)) failures.push(`sidebar: unknown lint ${id}`);
}

const foundryFlag = process.argv.indexOf("--foundry");
if (foundryFlag !== -1) {
  const argument = process.argv[foundryFlag + 1];
  if (!argument) throw new Error("--foundry requires a checkout path");
  const foundry = resolve(argument);
  const registered = readLintDocs(foundry);
  const registeredIds = new Set(registered.map(({ id }) => id));
  for (const { id, severity, body } of registered) {
    const page = pages.get(id);
    if (!page || legacy.has(id)) {
      failures.push(`${id}: registered lint has no active page`);
      continue;
    }
    if (!page.includes(`**Severity**: \`${severity}\``))
      failures.push(`${id}: severity differs from registry`);
    if (canonicalBody(page) !== body)
      failures.push(`${id}: page differs from canonical Foundry documentation`);
  }
  for (const id of pages.keys()) {
    if (!legacy.has(id) && !registeredIds.has(id))
      failures.push(`${id}: active page has no registered lint`);
  }
  console.log(
    `Foundry registry: ${registeredIds.size} active lints checked against canonical documentation.`,
  );
}

console.log(
  `Lint documentation: ${pages.size - legacy.size} active pages and ${legacy.size} legacy pages checked.`,
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
