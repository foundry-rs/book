#!/usr/bin/env bash
set -eo pipefail

gen_chisel() {
  need_cmd chisel

  echo "Generating output (chisel)..."

  mkdir -p "$OUTPUT_DIR/chisel"

  print_anchored \
    "echo '!help' | chisel" \
    "$(echo '!help' | chisel)" \
    > "$OUTPUT_DIR/chisel/help"

  echo OK.
}
