#!/usr/bin/env bash
set -eo pipefail

gen_pilot() {
  need_cmd pilot

  echo "Generating output (pilot)..."

  print_anchored \
    "echo '!help' | pilot" \
    "$(echo '!help' | pilot | escape_colors)" \
    > "$OUTPUT_DIR/pilot/help"

  echo OK.
}
