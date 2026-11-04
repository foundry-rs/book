#!/usr/bin/env bash
set -uo pipefail

status=0
forge script script/CheckBalances.s.sol --rpc-url "$RPC_URL" \
  --sig run "$CHECKS" --json > result.json 2> error.txt || status=$?

if [ "$status" -ne 0 ]; then
  returned=$(jq -r '.returned // empty' result.json 2>/dev/null)
  if [ "$returned" = "$(cast sig 'NoChecks()')" ]; then
    echo "::error::no accounts to check"
  else
    cat error.txt
  fi
  exit 2
fi

low=$(head -n 1 result.json | jq -r '.returns.low.value')
if [ "$low" != "0" ]; then
  echo "::error::$low account(s) below minimum balance"
  jq -r '.logs[]' result.json
  exit 1
fi
echo "all balances above minimum"
