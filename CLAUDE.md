# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official documentation book for Foundry, an Ethereum development framework. The project generates comprehensive documentation covering Forge, Cast, Anvil, and Chisel tools.

## Architecture

The project uses a dual structure:
- **Root directory**: Project configuration, scripts, and meta files
- **vocs/ directory**: Documentation site built with Vocs (modern documentation framework)

### Key Components

1. **Documentation Content**: `/vocs/docs/pages/` - All markdown/MDX documentation files
2. **Sidebar Configuration**: `/vocs/sidebar/` - TypeScript files defining navigation structure
3. **Auto-generated Content**: `/vocs/docs/snippets/` - CLI output examples and code snippets
4. **Generation Scripts**: `/scripts/` - Bash scripts that generate CLI outputs for documentation

### Content Generation System

The project uses automated CLI output generation to ensure documentation stays synchronized with actual tool behavior:

- **Scripts Location**: `/scripts/gen_output/` contains individual generation scripts for each tool
- **Main Script**: `/scripts/gen_output.sh` orchestrates all generation
- **Output Location**: `/vocs/docs/snippets/output/` stores generated command outputs
- **Sample Projects**: `/vocs/docs/snippets/projects/` contains example Foundry projects for demonstrations

## Common Development Commands

### Documentation Development
```bash
cd vocs && bun dev          # Start development server with live reload
cd vocs && bun build        # Build static documentation site
cd vocs && bun preview      # Preview built site
cd vocs && bun check-links  # Validate all internal links
```

### Content Generation
```bash
./scripts/gen_output.sh     # Regenerate all CLI outputs and examples
```

## Content Management

### Adding New Documentation
1. Create new `.md` or `.mdx` files in appropriate `/vocs/docs/pages/` subdirectory
2. Update sidebar configuration in `/vocs/sidebar/sidebar.ts` to include new pages
3. Use auto-generated CLI outputs where possible via include syntax:
   ```markdown
   // [!include ~/snippets/output/abc/xyz:all]      # Command + output
   // [!include ~/snippets/output/abc/xyz:command]  # Command only  
   // [!include ~/snippets/output/abc/xyz:output]   # Output only
   ```

### Content Guidelines
- Use second-level headings (`## Title`) for main sections
- Include code examples from `/vocs/docs/snippets/projects/` rather than inline code
- Generate new CLI outputs via scripts rather than manual copying
- Follow existing navigation patterns in sidebar configuration

### CLI Output Generation
When adding new command examples:
1. Add sample projects to `/vocs/docs/snippets/projects/` if needed
2. Extend relevant generation scripts in `/scripts/gen_output/`
3. Run generation script to create output files
4. Reference outputs in documentation using include syntax

## Dependencies

- **Bun**: Package manager and runtime for the documentation site
- **Vocs**: Documentation framework powering the site
- **Foundry Tools**: forge, cast, anvil, chisel must be installed for content generation

## Project Structure Notes

- The `vocs/` subdirectory operates as an independent Node.js/Bun project
- Auto-generated content ensures CLI documentation accuracy
- Sidebar navigation is modular and split across multiple TypeScript files
- Public assets (images, etc.) live in `/vocs/docs/public/`
- Link checking is automated via TypeScript script to prevent broken internal links