#!/usr/bin/env bash
set -eo pipefail

gen_help() {
  bins=(spark probe shuttle pilot)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
  done

  cmd=(
    "$SCRIPTS/gen_output/help.py"
    --root-dir "$ROOT/src/"
    --root-summary
    --root-indentation 4
    --readme
    --out-dir "$ROOT/src/reference/cli/"
    "${bins[@]}"
  )
  echo "Running: $" "${cmd[*]}"
  "${cmd[@]}"
}
