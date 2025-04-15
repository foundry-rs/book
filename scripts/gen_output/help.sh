#!/usr/bin/env bash
set -eo pipefail

gen_help() {
  bins=(forge cast anvil chisel)
  for bin in "${bins[@]}"; do
    need_cmd "$bin"
    echo "Generating help output ($bin)..."
    cargo run --manifest-path ../foundry/Cargo.toml --bin $bin markdown-help > "$ROOT/src/reference/cli/$bin.md"
  done
}
