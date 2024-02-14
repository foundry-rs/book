#!/usr/bin/env bash
set -eo pipefail

gen_probe() {
  source "$(dirname "$0")/common"

  need_cmd probe

  echo "Generating output (probe)..."
  mkdir -p "$OUTPUT_DIR/probe"

  run_command "$OUTPUT_DIR/probe/probe-call" \
    probe call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url "$ETH_RPC_URL"

  run_command "$OUTPUT_DIR/probe/probe-4byte-decode" \
    probe 4byte-decode 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7 \

  echo OK.
}
