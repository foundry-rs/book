#!/usr/bin/env bash
set -eo pipefail

gen_help() {
  bins=(forge cast anvil chisel)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
  done

  echo "ROOT: $ROOT"
  echo "SCRIPTS: $SCRIPTS"

  # Generate documentation for each tool separately
  for bin in "${bins[@]}"; do
    echo "Generating CLI reference for $bin..."
    
    # Set output directory based on the tool
    out_dir="$ROOT/src/pages/reference/$bin"
    
    # Create output directory if it doesn't exist
    mkdir -p "$out_dir"
    
    cmd=(
      "$SCRIPTS/gen_output/help.rs"
      --root-dir "$ROOT/src/pages/reference/$bin"
      --verbose
      --out-dir "$out_dir"
      --sidebar-file "$ROOT/sidebar/${bin}-cli-reference.ts"
      "$bin"
    )
    echo "Running: ${cmd[*]}"
    "${cmd[@]}"
  done

  versions_file="$ROOT/src/pages/reference/versions.mdx"
  {
    cat <<'EOF'
---
description: Exact Foundry binary versions used to generate the CLI command reference.
---

## CLI reference versions

The CLI pages under `/reference` are generated from the following installed binaries. Use this page to distinguish documentation drift from behavior in a different stable or nightly release.

EOF
    for bin in "${bins[@]}"; do
      if [[ "$bin" != "${bins[0]}" ]]; then
        printf '\n'
      fi
      printf '### `%s`\n\n```text\n' "$bin"
      "$bin" --version
      printf '```\n'
    done
  } > "$versions_file"
}
