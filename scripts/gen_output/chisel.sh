#!/usr/bin/env bash
set -eo pipefail

gen_chisel() {
  need_cmd chisel

  echo "Generating output (chisel)..."

  print_anchored \
    "echo '!help' | chisel" \
    "$(echo '!help' | chisel | escape_colors)" \
    > "$OUTPUT_DIR/chisel/help"

  echo OK.
}
