import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { beforeEach, describe, expect, test } from "vite-plus/test";
import {
  assignSettings,
  defaultConfigPath,
  displayName,
  main,
  matchesKey,
  mdxSafe,
  parseRegions,
  renderDefaultConfig,
  renderSetting,
  run,
  snapshotPath,
  sourcePath,
  type Setting,
} from "./import-config-reference.ts";

const settings: Setting[] = [
  {
    key: "src",
    section: null,
    type: "string (path)",
    table: false,
    default: '"src"',
    env: ["FOUNDRY_SRC", "DAPP_SRC"],
    description: "Path of the sources directory.\n\nRelative to the project root.",
  },
  {
    key: "deny",
    section: null,
    type: "string",
    table: false,
    default: '"never"',
    values: ["never", "warnings"],
    env: ["FOUNDRY_DENY"],
    description: "Diagnostic level at which to fail.",
  },
  {
    key: "deny_warnings",
    section: null,
    type: "boolean",
    table: false,
    default: null,
    deprecated: "deny = warnings",
    description: "Whether to fail on warnings.",
  },
  { key: "fuzz", section: "fuzz", type: "table", table: true, description: "Fuzz settings." },
  {
    key: "fuzz.runs",
    section: "fuzz",
    type: "integer",
    table: false,
    default: "256",
    aliases: ["iterations"],
    env: ["FOUNDRY_FUZZ_RUNS"],
    description: "Number of runs.",
  },
  {
    key: "fuzz.seed",
    section: "fuzz",
    type: "integer",
    table: false,
    description: "Seed.",
  },
  { key: "lint", section: "lint", type: "table", table: true, description: "Lint settings." },
  {
    key: "lint.lint_specific",
    section: "lint",
    type: "table",
    table: true,
    description: "Per-lint settings.",
  },
  {
    key: "lint.lint_specific.mixed_case_exceptions",
    section: "lint",
    type: "array of string",
    table: false,
    default: '["ERC"]',
    description: "Accepted acronyms.",
  },
];

let root: string;
let foundry: string;
const put = (base: string, path: string, text: string) => {
  mkdirSync(dirname(join(base, path)), { recursive: true });
  writeFileSync(join(base, path), text);
};
const read = (path: string) => readFileSync(join(root, path), "utf8");
const git = (...args: string[]) =>
  execFileSync("git", ["-C", foundry, ...args], { encoding: "utf8" }).trim();
const commit = (list = settings) => {
  put(foundry, sourcePath, reference(list));
  git("add", sourcePath);
  git(
    "-c",
    "user.name=Importer test",
    "-c",
    "user.email=importer@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-q",
    "--allow-empty",
    "-m",
    "test: update fixture",
  );
};
const region = (attributes: string) =>
  `{/* config-reference:begin ${attributes} */}\n{/* config-reference:end */}`;
const reference = (list = settings) => JSON.stringify({ schemaVersion: 1, settings: list });
const page = (name: string, text: string) =>
  put(root, `src/pages/config/reference/${name}.mdx`, text);
const quiet = <T>(callback: () => T): T => {
  const { log, warn } = console;
  console.log = console.warn = () => {};
  try {
    return callback();
  } finally {
    Object.assign(console, { log, warn });
  }
};

beforeEach(() => {
  const temporary = mkdtempSync(join(tmpdir(), "book-config-import-"));
  root = join(temporary, "book");
  foundry = join(temporary, "foundry");
  mkdirSync(foundry);
  git("init", "-q");
  commit();
  page("project", `## Project\n\nIntro.\n\n${region('keys="src" level=3')}\n\nAuthored outro.\n`);
  page(
    "testing",
    `## Testing\n\n### Fuzz\n\n${region('keys="fuzz fuzz.runs"')}\n\n### Other\n\n${region('fallback title="Other settings"')}\n`,
  );
  page("linter", `## Linter\n\n${region('keys="lint lint.*" level=3')}\n`);
  page("default-config", "stale\n");
  mkdirSync(join(root, "scripts"));
  return () => rmSync(temporary, { recursive: true, force: true });
});
describe("region parsing", () => {
  test("reads keys, level, fallback and heading context", () => {
    const text = `## Page\n\n### Group\n\n${region('keys="a b.*" level=5')}\n${region('fallback title="Other settings"')}\n`;
    const [first, second] = parseRegions(text, "page.mdx");
    expect(first).toMatchObject({
      keys: ["a", "b.*"],
      level: 5,
      fallback: false,
      context: "Page - Group",
    });
    expect(second).toMatchObject({ keys: [], level: 4, fallback: true, title: "Other settings" });
    expect(text.slice(first.start, first.end)).toBe("\n");
  });

  test("rejects malformed regions", () => {
    expect(() => parseRegions('{/* config-reference:begin keys="a" */}\n', "p")).toThrow(
      "no end marker",
    );
    expect(() => parseRegions("{/* config-reference:end */}\n", "p")).toThrow("unmatched");
    expect(() =>
      parseRegions(`{/* config-reference:begin keys="a" */}\n${region('keys="b"')}`, "p"),
    ).toThrow("nested");
    expect(() => parseRegions(region('keys="a" level=7'), "p")).toThrow("level");
    expect(() => parseRegions(region('keys="a" colour="red"'), "p")).toThrow("unknown attribute");
    expect(() => parseRegions(region("level=3"), "p")).toThrow("either keys or fallback");
    expect(() => parseRegions(region('keys="a" fallback'), "p")).toThrow("either keys or fallback");
    for (const pattern of ["fuzz*", "fuzz.r*", "*.runs"])
      expect(() => parseRegions(region(`keys="${pattern}"`), "p")).toThrow("end with .*");
  });
});

describe("assignment", () => {
  const regions = (...texts: string[]) =>
    texts.flatMap((text, index) => parseRegions(text, `p${index}.mdx`));

  test("matches keys below a section and keeps pattern order", () => {
    expect(matchesKey("fuzz.*", "fuzz.runs")).toBe(true);
    expect(matchesKey("fuzz.*", "fuzz")).toBe(false);
    expect(matchesKey("fuzz.*", "fuzzer.runs")).toBe(false);
    expect(matchesKey("lint.*", "lint.lint_specific.mixed_case_exceptions")).toBe(true);
    expect(matchesKey("a.b", "aXb")).toBe(false);
    const result = assignSettings(
      settings,
      regions(
        region('keys="fuzz.seed deny src fuzz.* fuzz"'),
        region('keys="fuzz.runs deny_warnings lint lint.*"'),
      ),
    );
    expect(result.regions[0].settings.map(({ key }) => key)).toEqual([
      "fuzz.seed",
      "deny",
      "src",
      "fuzz",
    ]);
    expect(result.regions[1].settings.map(({ key }) => key)).toEqual([
      "fuzz.runs",
      "deny_warnings",
      "lint",
      "lint.lint_specific",
      "lint.lint_specific.mixed_case_exceptions",
    ]);
    expect(result.regions).toHaveLength(2);
  });

  test("lets an exact key claim a setting over a glob", () => {
    const result = assignSettings(
      settings,
      regions(region('keys="fuzz fuzz.*"'), region('keys="fuzz.seed"'), region("fallback")),
    );
    expect(result.regions[0].settings.map(({ key }) => key)).toEqual(["fuzz", "fuzz.runs"]);
    expect(result.regions[1].settings.map(({ key }) => key)).toEqual(["fuzz.seed"]);
  });

  test("rejects a key claimed twice with the same specificity", () => {
    expect(() =>
      assignSettings(
        settings,
        regions(region('keys="fuzz.*"'), region('keys="fuzz.*"'), region("fallback")),
      ),
    ).toThrow(/fuzz\.runs: p0\.mdx, p1\.mdx/);
    expect(() =>
      assignSettings(
        settings,
        regions(region('keys="src"'), region('keys="src"'), region("fallback")),
      ),
    ).toThrow("more than one region");
  });

  test("puts unclaimed keys in the single fallback region with a warning", () => {
    const result = assignSettings(
      settings,
      regions(region('keys="src fuzz fuzz.* missing.*"'), region('fallback title="Other"')),
    );
    expect(result.regions[1].settings.map(({ key }) => key)).toEqual([
      "deny",
      "deny_warnings",
      "lint",
      "lint.lint_specific",
      "lint.lint_specific.mixed_case_exceptions",
    ]);
    expect(result.warnings.join("\n")).toMatch(/missing\.\* matches no config key/);
    expect(result.warnings.join("\n")).toMatch(/fallback region \(p1\.mdx\).*deny, deny_warnings/);
    expect(() => assignSettings(settings, regions(region('keys="src"')))).toThrow(
      "no fallback region",
    );
    expect(() => assignSettings(settings, regions(region("fallback"), region("fallback")))).toThrow(
      "one fallback region",
    );
  });
});

describe("rendering", () => {
  test("renders metadata bullets only when present", () => {
    expect(renderSetting(settings[0], 3)).toBe(
      '### `src`\n\n- Type: string (path)\n- Default: `"src"`\n- Environment: `FOUNDRY_SRC` or `DAPP_SRC`\n\nPath of the sources directory.\n\nRelative to the project root.',
    );
    expect(renderSetting(settings[1], 4)).toContain("- Values: `never`, `warnings`");
    expect(
      renderSetting(
        { ...settings[1], values: ["ethereum", "base"], valueFeatures: { base: "base" } },
        4,
      ),
    ).toContain("- Values: `ethereum`, `base` (requires the `base` build feature)");
    expect(renderSetting(settings[2], 4)).toContain(
      "- Default: none\n- Deprecated: use `deny = warnings` instead",
    );
    expect(renderSetting(settings[4], 4)).toContain(
      "#### `runs`\n\n- Type: integer\n- Default: `256`\n- Environment: `FOUNDRY_FUZZ_RUNS`\n- Aliases: `iterations`",
    );
    expect(renderSetting(settings[3], 4)).toBe("#### `[fuzz]`\n\nFuzz settings.");
    expect(renderSetting({ ...settings[0], env: ["A", "B", "C"] }, 4)).toContain(
      "`A`, `B`, or `C`",
    );
  });

  test("preserves the previous test filter anchors", () => {
    for (const key of [
      "match_test",
      "no_match_test",
      "match_contract",
      "no_match_contract",
      "match_path",
      "no_match_path",
    ]) {
      expect(renderSetting({ ...settings[0], key }, 4)).toContain(
        `<span id="${key.replaceAll("_", "-")}" />\n\n#### \`${key}\``,
      );
    }
  });

  test("names keys relative to their section", () => {
    expect(settings.map(displayName)).toEqual([
      "src",
      "deny",
      "deny_warnings",
      "[fuzz]",
      "runs",
      "seed",
      "[lint]",
      "[lint_specific]",
      "lint_specific.mixed_case_exceptions",
    ]);
  });

  test("makes doc-comment Markdown safe for MDX", () => {
    expect(
      mdxSafe(
        "Use <name> or {x} and `<code>`, see <https://example.com>.\n# Example\n```toml\nx = { a = 1 }\n```\nSee [`Config`] and [link](https://a.b). Defaults to [BytecodeHash::Ipfs].",
      ),
    ).toBe(
      "Use \\<name> or \\{x\\} and `<code>`, see [https://example.com](https://example.com).\n**Example**\n```toml\nx = { a = 1 }\n```\nSee `Config` and [link](https://a.b). Defaults to `BytecodeHash::Ipfs`.",
    );
    expect(mdxSafe("import x first.\nimport inside.\n\nexport y.\n```\nimport z\n```")).toBe(
      "&#105;mport x first.\nimport inside.\n\n&#101;xport y.\n```\nimport z\n```",
    );
  });

  test("renders default-config.mdx from region order with summaries", () => {
    const regions = parseRegions(
      `## Testing\n\n### Fuzz\n\n${region('keys="fuzz fuzz.* lint lint.*"')}\n\n## Project\n\n${region('keys="src deny deny_warnings"')}`,
      "p.mdx",
    );
    const text = renderDefaultConfig(
      assignSettings(
        settings.map((setting) =>
          setting.key === "fuzz" ? { ...setting, default: "{}" } : setting,
        ),
        regions,
      ),
    );
    expect(text).toContain("```toml\n[profile.default]\n\n# ===");
    expect(text).toContain("# PROJECT\n");
    expect(text).toContain('# Path of the sources directory.\n# src = "src"');
    // Keys stay commented out, so copying the file does not mark them as configured.
    expect(text).not.toMatch(/^[a-z_][\w.]* = /m);
    expect(text).not.toContain("deny_warnings");
    expect(text).not.toContain("seed =");
    expect(text).toContain("[fuzz]\n\n# ===");
    expect(text).not.toContain("\n = ");
    expect(text).toContain("# TESTING - FUZZ\n");
    expect(text).toContain("# runs = 256");
    expect(text).toContain("[lint]");
    expect(text).toContain('# lint_specific.mixed_case_exceptions = ["ERC"]');
    expect(text.indexOf("[profile.default]")).toBeLessThan(text.indexOf("\n[fuzz]\n"));
  });
});

describe("import and check", () => {
  test("imports into regions only and records the source commit", () => {
    quiet(() => run(root, { foundry }));
    const project = read("src/pages/config/reference/project.mdx");
    expect(project).toMatch(
      /^## Project\n\nIntro\.\n\n\{\/\* config-reference:begin keys="src" level=3 \*\/\}\n\n### `src`\n/,
    );
    expect(project).toMatch(
      /Relative to the project root\.\n\n\{\/\* config-reference:end \*\/\}\n\nAuthored outro\.\n$/,
    );
    const testing = read("src/pages/config/reference/testing.mdx");
    expect(testing).toContain("#### `[fuzz]`\n\nFuzz settings.\n\n#### `runs`");
    expect(testing).toContain("### Other settings\n\n#### `deny`");
    expect(testing).toContain("#### `seed`");
    expect(read("src/pages/config/reference/linter.mdx")).toContain(
      "### `[lint_specific]`\n\nPer-lint settings.\n\n#### `lint_specific.mixed_case_exceptions`",
    );
    expect(read(defaultConfigPath)).toContain('# src = "src"');
    const snapshot = JSON.parse(read(snapshotPath));
    expect(snapshot.source).toEqual({
      repository: "foundry-rs/foundry",
      commit: git("rev-parse", "HEAD"),
      path: sourcePath,
    });
    expect(snapshot.settings).toEqual(settings);
    expect(quiet(() => run(root, { check: true }))).toEqual([]);
    expect(quiet(() => run(root, { foundry, check: true }))).toEqual([]);
    expect(quiet(() => run(root, { foundry }))).toEqual([]);

    // Without a Foundry checkout, the import re-renders the committed snapshot.
    page("project", project.replace("Path of the sources directory.", "Edited by hand."));
    expect(quiet(() => run(root, {}))).toEqual(["src/pages/config/reference/project.mdx"]);
    expect(read("src/pages/config/reference/project.mdx")).toBe(project);
  });

  test("check fails on stale pages, a stale snapshot or a duplicate, and warns for fallback keys", () => {
    quiet(() => run(root, { foundry }));
    const warnings: string[] = [];
    const { log, warn } = console;
    console.log = () => {};
    console.warn = (message: string) => warnings.push(message);
    try {
      main(["--", "--check"], root);
    } finally {
      Object.assign(console, { log, warn });
    }
    expect(warnings.join("\n")).toMatch(
      /warning: keys in the fallback region .*deny, deny_warnings, fuzz\.seed/,
    );

    const project = read("src/pages/config/reference/project.mdx");
    page("project", project.replace("Path of the sources directory.", "Edited by hand."));
    expect(() => quiet(() => run(root, { check: true }))).toThrow(/stale[^]*project\.mdx/);
    page("project", project.replace("Authored outro.", "Authored outro, edited."));
    expect(quiet(() => run(root, { check: true }))).toEqual([]);

    commit();
    expect(() => quiet(() => run(root, { foundry, check: true }))).toThrow(
      /stale[^]*scripts\/config-reference\.json/,
    );
    commit(
      settings.map((setting) =>
        setting.key === "src" ? { ...setting, description: "New." } : setting,
      ),
    );
    expect(() => quiet(() => run(root, { foundry, check: true }))).toThrow(
      /stale[^]*project\.mdx[^]*scripts\/config-reference\.json/,
    );

    page("linter", `## Linter\n\n${region('keys="lint lint.* src" level=3')}\n`);
    expect(() => quiet(() => run(root, { check: true }))).toThrow("more than one region");
  });

  test("rejects invalid or uncommitted input before writing", () => {
    commit([...settings, settings[0]]);
    expect(() => quiet(() => run(root, { foundry }))).toThrow("duplicate key src");
    put(foundry, sourcePath, JSON.stringify({ schemaVersion: 2, settings }));
    expect(() => quiet(() => run(root, { foundry }))).toThrow("schemaVersion");
    put(foundry, sourcePath, reference());
    expect(() => quiet(() => run(root, { foundry }))).toThrow(`commit ${sourcePath}`);
    expect(read(defaultConfigPath)).toBe("stale\n");
  });
});
