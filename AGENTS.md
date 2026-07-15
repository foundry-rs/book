# AGENTS.md

Guidance for AI coding agents working in the Foundry documentation repository.

## Project overview

This repository builds the documentation at `https://getfoundry.sh` with Vocs.
The Foundry implementation lives in `foundry-rs/foundry`; use that repository and
the installed CLI as the source of truth for current behavior.

- `src/pages/`: authored MDX and Markdown pages.
- `src/snippets/projects/`: source files used by documentation examples.
- `src/snippets/output/`: captured Foundry command output.
- `sidebar/`: authored navigation plus generated CLI reference navigation.
- `scripts/gen_output/`: CLI reference and example-output generators.
- `public/`: static images and other public assets.
- `vocs.config.ts`: site metadata, top navigation, MCP, and Vocs configuration.
- `vercel.json`: redirects and hosting configuration.

## Commands

```bash
bun install              # Install pinned dependencies.
bun dev                  # Start the local Vocs server.
bunx vocs build          # Validate content without refreshing benchmark data.
bun run build            # Refresh benchmarks and run the production build.
./scripts/gen_output.sh  # Regenerate CLI references and captured output.
```

`bun run build` fetches remote benchmark data. Use the direct Vocs build for a
focused content change, then use the production build when the changed path or
release workflow requires it.

`gen_output.sh` requires current `forge`, `cast`, `anvil`, and `chisel` binaries,
plus the tools checked by its scripts. It runs networked examples, clones an
external project, and rewrites a broad generated surface. Do not run it for an
unrelated prose change.

## Content ownership

### Authored pages

Concepts, workflows, and guides belong under the matching section in
`src/pages/`. Add the page to `sidebar/sidebar.ts` when it should be visible in
the main documentation navigation.

Use a page-level `description` in frontmatter. Every page starts with an H2
title, followed by H3 sections and H4 subsections. Address the reader as “you”
and follow `CONTRIBUTING.md` for page types, voice, MDX components, and code
block conventions.

### Generated CLI reference

Files under these paths are generated from command help by
`scripts/gen_output/help.rs`:

- `src/pages/reference/{forge,cast,anvil,chisel}/`.
- `sidebar/forge-cli-reference.ts`, `cast-cli-reference.ts`,
  `anvil-cli-reference.ts`, and `chisel-cli-reference.ts`.

Fix CLI signatures, option text, and categories in Foundry first, then regenerate
the book. Do not hand-edit generated CLI help to disagree with the binary. A
separate authored guide may explain workflow, safety, or migration context that
does not belong in `--help` output.

Captured output in `src/snippets/output/` is also generator-owned. Regenerate it
with the matching installed Foundry version instead of manually normalizing a
stale snapshot.

### Source snippets

Put runnable Solidity examples under `src/snippets/projects/` and include them
from MDX:

```md
// [!include ~/snippets/projects/example/src/Example.sol]
```

Prefer physical snippets over duplicated inline Solidity. Keep a project small,
pin any behavior that affects the example, and test the exact command shown in
the page. Remove `out/`, `cache/`, broadcasts, generated bindings, and other
runtime artifacts before committing unless the page explicitly documents them.

## Validation

Match validation to the change:

1. Run `git diff --check` for every change.
2. Run the exact Foundry command used by a new or changed example.
3. Run `bunx vocs build` for pages, navigation, snippets, links, or Vocs config.
4. Inspect generated `dist/public/llms.txt` or page Markdown under
   `dist/public/assets/md/` when a change affects agent retrieval.
5. Run `bun run build` when changing benchmark integration or the full production
   build path.

The Vocs build checks internal links and resolves included snippets into the
rendered pages. It does not compile Solidity examples for you. Do not commit
`dist/` or `node_modules/`.

## Version-sensitive documentation

Foundry ships frequent nightly releases. When behavior may have changed:

1. Record `forge --version` and the equivalent version for the relevant tool.
2. Compare installed `--help` output with current Foundry source.
3. Prefer the version the page claims to document; state meaningful nightly or
   stable differences instead of silently combining them.
4. Link conceptual guidance to the exact generated reference page.

If the book, installed binary, and current source disagree, report the mismatch
in the pull request. Keep speculative future behavior out of user-facing docs.

## Repository hygiene

- Start each standalone documentation issue from `master` so reviewable pull
  requests do not depend on one another.
- Preserve unrelated worktree changes and submodule state.
- Do not add spelling-only or grammar-only pull requests.
- Keep redirects in `vercel.json` when moving or replacing a public route.
- Use Conventional Commit subjects such as `docs(forge): add ...` or
  `chore(output): update ...`.
- Follow the Foundry contribution policy for disclosing AI assistance.
