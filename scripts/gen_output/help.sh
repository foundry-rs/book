#!/usr/bin/env bash
set -eo pipefail

gen_help() {
  bins=(forge cast anvil chisel)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
  done

  cmd=(
    "$SCRIPTS/gen_output/help.rs"
    --root-dir "$ROOT/src/"
    --root-summary
    --root-indentation 4
    --readme
    --verbose
    --out-dir "$ROOT/src/reference/cli/"
    "${bins[@]}"
  )
  echo "Running: $" "${cmd[*]}"
  "${cmd[@]}"
}
