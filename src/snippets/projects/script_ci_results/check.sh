#!/usr/bin/env bash
set -uo pipefail

status=0
forge script script/CheckBalances.s.sol --rpc-url "$RPC_URL" \
  --sig run "$CHECKS" --json > result.json 2> error.txt || status=$?

if [ "$status" -ne 0 ]; then
  returned=$(jq -r '.returned // empty' result.json 2>/dev/null)
  if [ "$returned" = "$(cast sig 'NoChecks()')" ]; then
    echo "::error::no accounts to check"
  elif ! jq -er '.errors[]?.message' result.json >&2; then
    cat error.txt >&2
  fi
  exit 2
fi

if ! low=$(jq -er '.returns.low.value | strings | select(test("^[0-9]+$"))' result.json); then
  echo "::error::missing balance count in Forge output" >&2
  exit 2
fi
if [ "$low" != "0" ]; then
  echo "::error::$low account(s) below minimum balance"
  jq -r '.logs[]' result.json
  exit 1
fi
echo "all balances above minimum"
