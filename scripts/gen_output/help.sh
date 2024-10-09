#!/usr/bin/env bash
set -eo pipefail

# use foundry-zksync binary path
export PATH=$PWD/bin:$PATH

gen_help() {
  bins=(forge cast)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
  done

  # Disable --root-summary until we wish to support adding CLI references
  cmd=(
    "$SCRIPTS/gen_output/help.rs"
    --root-dir "$ROOT/src/"
    --root-indentation 4
    --readme
    --verbose
    --out-dir "$ROOT/src/reference/cli/"
    "${bins[@]}"
  )
  echo "Running: $" "${cmd[*]}"
  "${cmd[@]}"
}
