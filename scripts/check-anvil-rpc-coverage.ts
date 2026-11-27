import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

type Manifest = {
  schemaVersion: 1;
  source: {
    repository: "foundry-rs/foundry";
    commit: string;
    path: "crates/anvil/core/src/eth/mod.rs";
  };
  methods: string[];
  knownMissing: string[];
};

const root = resolve(import.meta.dirname, "..");
const manifestPath = join(root, "scripts/anvil-rpc-coverage.json");
const docsDir = join(root, "src/pages/anvil");

const args = new Set(process.argv.slice(2));
const valueAfter = (flag: string) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
};

if (args.has("--help")) {
  console.log(`Usage:
  pnpm exec tsx scripts/check-anvil-rpc-coverage.ts
  pnpm exec tsx scripts/check-anvil-rpc-coverage.ts --refresh --source <path to anvil core eth/mod.rs> --commit <sha>
  pnpm exec tsx scripts/check-anvil-rpc-coverage.ts --accept-current

The default mode checks the anvil documentation against the committed manifest.
Refresh updates the canonical method list while preserving reviewed gaps. Only
use --accept-current when intentionally reviewing and accepting the current
gaps.`);
  process.exit(0);
}

let manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;

if (args.has("--refresh")) {
  const sourcePath = valueAfter("--source");
  const commit = valueAfter("--commit");
  if (!sourcePath || !commit) {
    throw new Error("--refresh requires --source <path> and --commit <sha>");
  }

  // Every custom method is declared as a serde rename on the EthRequest enum;
  // hardhat_/evm_ compatibility aliases resolve to the same handlers.
  const source = readFileSync(sourcePath, "utf8");
  const methods = [
    ...new Set([...source.matchAll(/rename = "((?:anvil|evm)_\w+)"/g)].map((match) => match[1])),
  ].sort();

  manifest = {
    ...manifest,
    source: { ...manifest.source, commit },
    methods,
    knownMissing: manifest.knownMissing.filter((name) => methods.includes(name)),
  };
}

const mdxFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? mdxFiles(join(dir, entry.name))
        : entry.name.endsWith(".mdx")
          ? [join(dir, entry.name)]
          : [],
    )
    .sort();

const docs = mdxFiles(docsDir)
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

// Whole-word matching so a method is not satisfied by a longer name that
// contains it, such as anvil_mine by anvil_mine_detailed.
const isMentioned = (name: string) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`).test(docs);
};

const missing = manifest.methods.filter((name) => !isMentioned(name));

if (args.has("--accept-current")) {
  manifest = { ...manifest, knownMissing: missing };
}

if (args.has("--refresh") || args.has("--accept-current")) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

// Methods documented by docs PRs must be removed from knownMissing; run with
// --accept-current to refresh the reviewed gaps after such a change.
const knownMissing = new Set(manifest.knownMissing);
const unexpectedMissing = missing.filter((name) => !knownMissing.has(name));
const resolved = manifest.knownMissing.filter((name) => !missing.includes(name));

const documented = manifest.methods.length - missing.length;
console.log(
  `Anvil RPC coverage: ${documented}/${manifest.methods.length} method names mentioned; ${missing.length - unexpectedMissing.length} reviewed gaps; ${unexpectedMissing.length} new.`,
);

const failures: string[] = [];
if (unexpectedMissing.length > 0) {
  failures.push(`New undocumented anvil RPC methods:\n  ${unexpectedMissing.join("\n  ")}`);
}
if (resolved.length > 0) {
  failures.push(`Remove newly documented methods from knownMissing:\n  ${resolved.join("\n  ")}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.join("\n\n")}\n`);
  console.error(
    "Document the new surface, or run with --accept-current only when intentionally updating the reviewed baseline.",
  );
  process.exit(1);
}
