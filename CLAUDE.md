# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official documentation website for Foundry, a smart contract development toolchain for Ethereum. The documentation is built using Vocs (a React-based documentation framework) and deployed to Cloudflare Pages.

## Essential Commands

### Development
```bash
bun install          # Install dependencies
bun dev             # Start development server (default: http://localhost:5173)
bun build           # Build documentation for production
bun preview         # Preview production build locally

```

### Generating CLI Output
```bash
# From project root - generates auto-generated CLI command outputs
./scripts/gen_output.sh    # Requires Foundry tools (forge, cast, anvil, chisel) installed
```

## Architecture & Structure

### Key Directories
- `/src/pages/` - All documentation content in MDX format, organized by tool:
  - `/forge/` - Smart contract compilation and testing documentation
  - `/cast/` - Ethereum RPC client documentation
  - `/anvil/` - Local Ethereum node documentation
  - `/chisel/` - Solidity REPL documentation
- `/public/` - Static assets (images, diagrams)
- `/sidebar/` - Navigation configuration (sidebar.ts and modular sections)
- `/src/snippets/` - Code examples and auto-generated outputs

### Configuration Files
- `vocs.config.ts` - Main Vocs configuration (theme, navigation, sponsors)
- `sidebar/sidebar.ts` - Main sidebar navigation structure
- `package.json` - Dependencies and scripts

### Documentation Patterns
- MDX files support frontmatter for metadata
- Code snippets are pulled from `/src/snippets/projects/` test projects
- Auto-generated CLI outputs stored in `/src/snippets/output/`
- Images and assets organized by topic in `/public/`

## Contributing Guidelines

When adding or modifying documentation:
1. Chapters start with second-level headings (`##`)
2. Use "we" not "I" in documentation
3. Use auto-generated CLI output where possible (run `./scripts/gen_output.sh`)
4. Include source files from the projects folder rather than inline code


## Deployment

The documentation automatically deploys to Cloudflare Pages via GitHub Actions on push to the main branch. The deployment workflow handles building and publishing to the "foundry-book" Cloudflare Pages project.
