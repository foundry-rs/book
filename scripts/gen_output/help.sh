#!/usr/bin/env bash
set -eo pipefail

gen_help() {
  bins=(forge cast anvil chisel)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
  done

  "$SCRIPTS/gen_output/help.py" --out-dir "$ROOT/src/reference/cli/" "${bins[@]}"
}
