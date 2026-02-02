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
  echo "VOCS_DIR: $ROOT/vocs"

  # Generate documentation for each tool separately
  for bin in "${bins[@]}"; do
    echo "Generating CLI reference for $bin..."
    
    # Set output directory based on the tool
    out_dir="$ROOT/vocs/src/pages/reference/$bin"
    
    # Create output directory if it doesn't exist
    mkdir -p "$out_dir"
    
    cmd=(
      "$SCRIPTS/gen_output/help.rs"
      --root-dir "$ROOT/vocs/src/pages/reference/$bin"
      --verbose
      --out-dir "$out_dir"
      --sidebar-file "$ROOT/vocs/sidebar/${bin}-cli-reference.ts"
      "$bin"
    )
    echo "Running: ${cmd[*]}"
    "${cmd[@]}"
  done
}
