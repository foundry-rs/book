# https://raw.githubusercontent.com/foundry-rs/forge-std/refs/heads/master/src/Vm.sol

#!/usr/bin/env bash
set -eo pipefail

gen_vm() {
  need_cmd curl

  echo "Generating output (vm)..."
  mkdir -p "$OUTPUT_DIR/vm"

  curl https://raw.githubusercontent.com/foundry-rs/forge-std/refs/heads/master/src/Vm.sol > "$OUTPUT_DIR/vm/Vm.sol"

  echo OK.
}

gen_vm