#!/usr/bin/env bash
set -eo pipefail

gen_cast() {
  source "$(dirname "$0")/common"

  need_cmd cast

  echo "Generating output (cast)..."
  mkdir -p "$OUTPUT_DIR/cast"

  run_command "$OUTPUT_DIR/cast/cast-call" \
    cast call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url "$ETH_RPC_URL"

  run_command "$OUTPUT_DIR/cast/cast-4byte-decode" \
    cast 4byte-decode 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7 \

  echo OK.
}
