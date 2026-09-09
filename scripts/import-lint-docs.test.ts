import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import {
  canonicalBody,
  checkImportedDocs,
  main,
  planImport,
  readLintDocs,
  renderPage,
  shiftHeadings,
} from "./import-lint-docs.ts";
import { diagnosticOutput, renderExamples } from "./lint-examples.ts";

let temporary: string;
let root: string;
let foundry: string;
const pagePath = "src/pages/forge/linting/example.mdx";
const canonical = (id = "example", severity = "Info") => `# Example \`code\`: a lint

**Severity**: \`${severity}\`
**ID**: \`${id}\`

Flags an example.

## What it does

Reports an example.

## Why is this bad?

It is an example.

## Example

\`\`\`solidity
bad();
\`\`\`

Use instead:

\`\`\`solidity
good();
\`\`\`
`;

function put(base: string, path: string, text: string) {
  mkdirSync(dirname(join(base, path)), { recursive: true });
  writeFileSync(join(base, path), text);
}
const read = (path: string) => readFileSync(join(root, path), "utf8");
const git = (...args: string[]) =>
  execFileSync("git", ["-C", foundry, ...args], { encoding: "utf8" }).trim();
function commit() {
  git("add", "crates/lint");
  git(
    "-c",
    "user.name=Importer test",
    "-c",
    "user.email=importer@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-qm",
    "test: update fixture",
  );
}
const run = (...args: string[]) => main(["--foundry", foundry, ...args], root);

beforeEach(() => {
  temporary = mkdtempSync(join(tmpdir(), "book-lint-import-"));
  root = join(temporary, "book");
  foundry = join(temporary, "foundry");
  mkdirSync(foundry);
  git("init", "-q");
  for (const group of ["high", "med", "low", "info", "gas", "codesize"])
    put(
      foundry,
      `crates/lint/src/sol/${group}/mod.rs`,
      `register_lints!(${group === "info" ? "example: (Example, late, (EXAMPLE));" : ""});\n`,
    );
  put(
    foundry,
    "crates/lint/src/sol/info/example.rs",
    'declare_forge_lint!(EXAMPLE, Severity::Info, "example", "example");\n',
  );
  put(foundry, "crates/lint/docs/example.md", canonical());
  commit();
  put(
    root,
    "sidebar/forge.ts",
    "// authored\n  // BEGIN GENERATED LINTS\n  // END GENERATED LINTS\n// authored footer\n",
  );
  put(
    root,
    "src/pages/forge/linting.mdx",
    "## Authored guide\n\n{/* BEGIN GENERATED LINTS */}\n{/* END GENERATED LINTS */}\n",
  );
  mkdirSync(join(root, "src/pages/forge/linting"));
  mkdirSync(join(root, "scripts"));
});
afterEach(() => rmSync(temporary, { recursive: true, force: true }));

describe("lint import", () => {
  const diagnostic = (
    id = "example",
    rendered = "warning[example]: explanation\n  --> src/Example.sol:1:1\n",
  ) => JSON.stringify({ level: "warning", code: { code: id }, rendered });

  test("replaces produces with the expected lint's actual rendered output", () => {
    const source = canonical().replace("\nUse instead:", "\n{{produces}}\n\nUse instead:");
    const seen: string[] = [];
    const page = renderExamples(source, "example", (code, id) => {
      seen.push(code, id);
      return [diagnostic("other", "unrelated"), diagnostic()].join("\n");
    });
    expect(seen).toEqual(["bad();\n", "example"]);
    expect(page).toContain(
      "```text\nwarning[example]: explanation\n  --> src/Example.sol:1:1\n```",
    );
    expect(page).not.toContain("unrelated");
    expect(page).not.toContain("{{produces}}");
    expect(page).toContain("Use instead:\n\n```solidity\ngood();");
  });

  test("preserves markers inside code and does not execute unmarked fragments", () => {
    const source = canonical().replace("bad();", "// {{produces}}\n{{produces}}");
    expect(
      renderExamples(source, "example", () => {
        throw new Error("must not run");
      }),
    ).toBe(source);
  });

  test("supports longer and tilde fences and encloses backticks in diagnostics", () => {
    for (const fence of ["````", "~~~"]) {
      const source = `${fence}solidity\ncontract C {}\n${fence}\n\n{{produces}}`;
      expect(
        renderExamples(source, "example", (code) => {
          expect(code).toBe("contract C {}\n");
          return diagnostic("example", "source contains ```\n");
        }),
      ).toContain("````text\nsource contains ```\n````");
    }
  });

  test("rejects markers without an immediately preceding Solidity block", () => {
    for (const source of [
      "{{produces}}",
      "```text\ncode\n```\n{{produces}}",
      "```solidity\ncode\n```\nExplanation\n{{produces}}",
      "```solidity\ncode\n```\n{{produces}}\n{{produces}}",
    ])
      expect(() => renderExamples(source, "example", () => diagnostic())).toThrow(
        "must immediately follow",
      );
  });

  test("requires a rendered diagnostic for the documented lint", () => {
    for (const output of ["", diagnostic("other"), diagnostic("example", "")])
      expect(() => diagnosticOutput(output, "example")).toThrow("did not produce");
    expect(() => diagnosticOutput("not JSON", "example")).toThrow();
    expect(() =>
      diagnosticOutput(
        `${diagnostic()}\n${JSON.stringify({ level: "error", message: "invalid source" })}`,
        "example",
      ),
    ).toThrow("invalid documentation example: invalid source");
  });

  test("keeps multiple diagnostics in emission order, including note severity", () => {
    expect(
      diagnosticOutput(
        [
          diagnostic("example", "first\n"),
          JSON.stringify({ level: "note", code: { code: "example" }, rendered: "second\n" }),
        ].join("\n"),
        "example",
      ),
    ).toBe("first\n\nsecond");
  });

  test("offline validation rejects unresolved produces without running Forge", () => {
    run();
    put(root, pagePath, read(pagePath).replace("\nUse instead:", "\n{{produces}}\n\nUse instead:"));
    expect(() => checkImportedDocs(root)).toThrow("unresolved {{produces}}");
  });

  test("failed example generation leaves all imported files untouched", () => {
    run();
    const original = read(pagePath);
    const manifest = read("scripts/lint-docs-manifest.json");
    put(
      foundry,
      "crates/lint/docs/example.md",
      canonical().replace("\nUse instead:", "\n{{produces}}\n\nUse instead:"),
    );
    commit();
    expect(() => run("--forge", join(temporary, "missing-forge"))).toThrow(
      "cannot lint documentation example",
    );
    expect(read(pagePath)).toBe(original);
    expect(read("scripts/lint-docs-manifest.json")).toBe(manifest);
  });

  test("imports source content, metadata, navigation and exact revision, then is idempotent", () => {
    run();
    expect(canonicalBody(read(pagePath))).toBe(canonical().trim());
    expect(read(pagePath).split("\n").slice(0, 6)).toEqual([
      "---",
      'description: "Example code: a lint"',
      "---",
      "",
      "{/* Generated by import:lints from Foundry. Do not edit directly. */}",
      "",
    ]);
    const manifest = JSON.parse(read("scripts/lint-docs-manifest.json"));
    expect(manifest.source.commit).toBe(git("rev-parse", "HEAD"));
    expect(Object.keys(manifest.pages)).toEqual(["example"]);
    expect(read("sidebar/forge.ts")).toContain('ruleGroup("Informational", ["example"])');
    expect(read("sidebar/forge.ts")).toMatch(/^\/\/ authored\n[\s\S]*\/\/ authored footer\n$/);
    expect(read("src/pages/forge/linting.mdx")).toContain(
      "- [`example`](/forge/linting/example) — Flags an example.",
    );
    const files = planImport(root, foundry);
    run();
    for (const [path, text] of files) expect(read(path)).toBe(text);
    expect(() => run("--check")).not.toThrow();
    expect(() => main(["--check"], root)).not.toThrow();
  });

  test.each([pagePath, "sidebar/forge.ts", "src/pages/forge/linting.mdx"])(
    "detects drift without writing: %s",
    (path) => {
      run();
      const changed = read(path).replace(/example/g, "changed");
      put(root, path, changed);
      expect(() => checkImportedDocs(root)).toThrow();
      expect(() => run("--check")).toThrow("lint import is stale");
      expect(read(path)).toBe(changed);
      run();
      expect(() => checkImportedDocs(root)).not.toThrow();
    },
  );

  test("uses What it does for the index when the page has no introductory summary", () => {
    const source = canonical()
      .replace("Flags an example.\n\n", "")
      .replace(
        "Reports an example.",
        "Reports an example\nacross two lines.\n\nAdditional detail.",
      );
    put(foundry, "crates/lint/docs/example.md", source);
    commit();
    run();
    expect(read("src/pages/forge/linting.mdx")).toContain(
      "- [`example`](/forge/linting/example) — Reports an example across two lines.\n",
    );
    expect(canonicalBody(read(pagePath))).toBe(source.trim());
    expect(() => run("--check")).not.toThrow();
    put(
      foundry,
      "crates/lint/docs/example.md",
      source.replace("Reports an example\nacross two lines.", "Reports the following:"),
    );
    commit();
    run();
    expect(read("src/pages/forge/linting.mdx")).toContain("— Example `code`: a lint\n");
  });

  test("permits authored guide edits outside generated regions", () => {
    run();
    put(
      root,
      "src/pages/forge/linting.mdx",
      read("src/pages/forge/linting.mdx").replace("Authored guide", "Updated guide"),
    );
    expect(() => run("--check")).not.toThrow();
    expect(() => checkImportedDocs(root)).not.toThrow();
  });

  test("imports new lints and changed severities without manual pages or navigation", () => {
    run();
    put(
      foundry,
      "crates/lint/src/sol/info/mod.rs",
      "register_lints!(example: (Example, late, (EXAMPLE, NEW_LINT)););\n",
    );
    put(
      foundry,
      "crates/lint/src/sol/info/example.rs",
      'declare_forge_lint!(EXAMPLE, Severity::High, "example", "example");\ndeclare_forge_lint!(NEW_LINT, Severity::Med, "new-lint", "new lint");\n',
    );
    put(foundry, "crates/lint/docs/example.md", canonical("example", "High"));
    put(foundry, "crates/lint/docs/new-lint.md", canonical("new-lint", "Med"));
    commit();
    expect(() => run("--check")).toThrow("lint import is stale");
    run();
    expect(read("sidebar/forge.ts")).toContain('ruleGroup("High severity", ["example"])');
    expect(read("sidebar/forge.ts")).toContain('ruleGroup("Medium severity", ["new-lint"])');
    expect(canonicalBody(read("src/pages/forge/linting/new-lint.mdx"))).toBe(
      canonical("new-lint", "Med").trim(),
    );
  });

  test("preserves removed lint URLs as legacy and can reactivate them", () => {
    run();
    const original = read(pagePath);
    put(root, "src/pages/forge/linting/removed.mdx", original.replace(/example/g, "removed"));
    expect(() => checkImportedDocs(root)).toThrow("unimported active page");
    run();
    const legacy = read("src/pages/forge/linting/removed.mdx");
    expect(legacy).toContain("status: legacy");
    expect(legacy).toContain(":::note[Legacy lint]");
    expect(() => run("--check")).not.toThrow();
    expect(() => checkImportedDocs(root)).not.toThrow();
    // A formerly legacy route now reappears in the registry.
    put(root, pagePath, original.replace("---\n", "---\nstatus: legacy\n"));
    run();
    expect(read(pagePath)).toBe(original);
    expect(read("src/pages/forge/linting/removed.mdx")).toBe(legacy);
  });

  test("rejects dirty source before changing output", () => {
    run();
    const original = read(pagePath);
    put(foundry, "crates/lint/docs/example.md", canonical() + "dirty\n");
    expect(() => run()).toThrow("commit changes under crates/lint");
    expect(read(pagePath)).toBe(original);
  });

  test("validates every input and marker before writing", () => {
    run();
    const original = read(pagePath);
    put(
      foundry,
      "crates/lint/docs/example.md",
      canonical().replace("Reports an example.", "Reports a new example."),
    );
    commit();
    put(root, "sidebar/forge.ts", "missing markers\n");
    expect(() => run()).toThrow("expected exactly one");
    expect(read(pagePath)).toBe(original);
  });

  test("rejects missing or mismatched canonical docs and an empty registry", () => {
    put(foundry, "crates/lint/docs/example.md", canonical("different"));
    expect(() => readLintDocs(foundry)).toThrow("invalid canonical title or metadata");
    rmSync(join(foundry, "crates/lint/docs/example.md"));
    expect(() => readLintDocs(foundry)).toThrow("ENOENT");
    put(foundry, "crates/lint/src/sol/info/mod.rs", "register_lints!();\n");
    expect(() => readLintDocs(foundry)).toThrow("no registered Foundry lints found");
  });

  test("requires explicit import source and rejects unknown options", () => {
    expect(() => main([], root)).toThrow("--foundry");
    expect(() => main(["--foundyr", foundry], root)).toThrow();
  });

  test("rejects invalid sections and examples before writing", () => {
    run();
    const original = read(pagePath);
    for (const invalid of [
      canonical().replace("## What it does", "## Other"),
      canonical().replace("## What it does", "## Example"),
      canonical().replace("## Why is this bad?", "## Why is this bad?\n\n## Why restrict this?"),
      canonical().replace("Reports an example.", ""),
      canonical().replace("It is an example.", ""),
      canonical().replace("Use instead:", "### Good"),
      canonical().replace("good();", ""),
      canonical().replace("Use instead:", "").replace("good();", "Use instead:\ngood();"),
      canonical() + "\n```solidity\nunclosed();\n",
    ]) {
      put(foundry, "crates/lint/docs/example.md", invalid);
      commit();
      expect(() => run()).toThrow("example:");
      expect(read(pagePath)).toBe(original);
    }
  });

  test("ignores example contents when validating headings and markers", () => {
    const source = canonical()
      .replace("Why is this bad?", "Why restrict this?")
      .replace("bad();", "## What it does\nUse instead:\nbad();")
      .replaceAll("```", "~~~~");
    put(foundry, "crates/lint/docs/example.md", source);
    commit();
    run();
    expect(() => main(["--check"], root)).not.toThrow();
    expect(canonicalBody(read(pagePath))).toBe(source.trim());
  });

  test("validates sections offline even when the manifest matches", () => {
    run();
    const invalid = read(pagePath).replace("### Example", "### Other");
    put(root, pagePath, invalid);
    const manifest = JSON.parse(read("scripts/lint-docs-manifest.json"));
    manifest.pages.example = createHash("sha256").update(invalid).digest("hex");
    put(root, "scripts/lint-docs-manifest.json", JSON.stringify(manifest));
    expect(() => main(["--check"], root)).toThrow("required sections missing or out of order");
  });

  test("validates legacy sections during import and offline checks", () => {
    run();
    put(
      root,
      "src/pages/forge/linting/removed.mdx",
      read(pagePath).replace("---\n", "---\nstatus: legacy\n").replace("### Example", "### Other"),
    );
    expect(() => run()).toThrow("removed: required sections missing or out of order");
    expect(() => main(["--check"], root)).toThrow(
      "removed: required sections missing or out of order",
    );
  });
});

test("heading conversion preserves fenced examples and round-trips canonical content", () => {
  const body =
    "# Title\n\n## Section\n\n````md\n# not a heading\n```\n## still code\n````\n\n~~~solidity\n# also code\n~~~\n\n### Detail";
  const shifted =
    "## Title\n\n### Section\n\n````md\n# not a heading\n```\n## still code\n````\n\n~~~solidity\n# also code\n~~~\n\n#### Detail";
  expect(shiftHeadings(body, 1)).toBe(shifted);
  expect(canonicalBody(renderPage({ id: "example", severity: "Info", title: "Title", body }))).toBe(
    body,
  );
});
