import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

type CheatcodeSpec = {
  cheatcodes: Array<{
    func: { signature: string };
    status: "internal" | "stable" | { deprecated: string };
  }>;
};

type Manifest = {
  schemaVersion: 1;
  source: {
    repository: "foundry-rs/foundry";
    commit: string;
    path: "crates/cheatcodes/assets/cheatcodes.json";
  };
  functions: string[];
  knownMissing: string[];
};

const root = resolve(import.meta.dir, "..");
const manifestPath = join(root, "scripts/cheatcode-coverage.json");
const docsDir = join(root, "src/pages/reference/cheatcodes");
const sidebarPath = join(root, "sidebar/cmd-reference.ts");

const args = new Set(process.argv.slice(2));
const valueAfter = (flag: string) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
};

if (args.has("--help")) {
  console.log(`Usage:
  bun scripts/check-cheatcode-coverage.ts
  bun scripts/check-cheatcode-coverage.ts --refresh --spec <path> --commit <sha>
  bun scripts/check-cheatcode-coverage.ts --accept-current

The default mode checks documentation against the committed manifest. Refresh
updates the canonical function list while preserving reviewed gaps. Only use
--accept-current when intentionally reviewing and accepting the current gaps.`);
  process.exit(0);
}

let manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;

if (args.has("--refresh")) {
  const specPath = valueAfter("--spec");
  const commit = valueAfter("--commit");
  if (!specPath || !commit) {
    throw new Error("--refresh requires --spec <path> and --commit <sha>");
  }

  const spec = JSON.parse(readFileSync(specPath, "utf8")) as CheatcodeSpec;
  const functions = [
    ...new Set(
      spec.cheatcodes
        .filter(({ status }) => status !== "internal")
        .map(({ func }) => func.signature.slice(0, func.signature.indexOf("("))),
    ),
  ].sort();

  manifest = {
    ...manifest,
    source: { ...manifest.source, commit },
    functions,
    knownMissing: manifest.knownMissing.filter((name) => functions.includes(name)),
  };
}

const docFiles = readdirSync(docsDir)
  .filter((file) => file.endsWith(".mdx"))
  .sort();
const docs = docFiles
  .map((file) => readFileSync(join(docsDir, file), "utf8"))
  .join("\n");

const isMentioned = (name: string) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b(?:function\\s+${escaped}|vm\\s*\\.\\s*${escaped})\\s*\\(`).test(
    docs,
  );
};

const missing = manifest.functions.filter((name) => !isMentioned(name));

if (args.has("--accept-current")) {
  manifest = { ...manifest, knownMissing: missing };
}

if (args.has("--refresh") || args.has("--accept-current")) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

const knownMissing = new Set(manifest.knownMissing);
const unexpectedMissing = missing.filter((name) => !knownMissing.has(name));
const resolved = manifest.knownMissing.filter((name) => !missing.includes(name));

const pageSlugs = new Set(docFiles.map((file) => file.slice(0, -4)));
const sidebar = readFileSync(sidebarPath, "utf8");
const sidebarSlugs = new Set(
  [...sidebar.matchAll(/\/reference\/cheatcodes\/([a-z0-9-]+)/g)].map(
    (match) => match[1],
  ),
);
const missingPages = [...sidebarSlugs].filter((slug) => !pageSlugs.has(slug));
const orphanPages = [...pageSlugs].filter((slug) => !sidebarSlugs.has(slug));

const documented = manifest.functions.length - missing.length;
console.log(
  `Cheatcode coverage: ${documented}/${manifest.functions.length} function names mentioned; ${missing.length} known gaps.`,
);
console.log(
  `Cheatcode navigation: ${pageSlugs.size} pages and ${sidebarSlugs.size} unique sidebar routes.`,
);

const failures: string[] = [];
if (unexpectedMissing.length > 0) {
  failures.push(`New undocumented cheatcodes:\n  ${unexpectedMissing.join("\n  ")}`);
}
if (resolved.length > 0) {
  failures.push(
    `Remove newly documented names from knownMissing:\n  ${resolved.join("\n  ")}`,
  );
}
if (missingPages.length > 0) {
  failures.push(`Sidebar routes without pages:\n  ${missingPages.join("\n  ")}`);
}
if (orphanPages.length > 0) {
  failures.push(`Cheatcode pages missing from the sidebar:\n  ${orphanPages.join("\n  ")}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.join("\n\n")}\n`);
  console.error(
    "Document the new surface, or run with --accept-current only when intentionally updating the reviewed baseline.",
  );
  process.exit(1);
}
