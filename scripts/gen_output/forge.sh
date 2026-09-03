#!/usr/bin/env bash
set -eo pipefail

gen_forge() {
  need_cmd git
  need_cmd forge
  need_cmd tree
  need_cmd npm

  echo "Generating output (forge)..."

  in_temp hello_foundry
  run_command "$OUTPUT_DIR/hello_foundry/forge-init" \
    forge init hello_foundry
  cd hello_foundry
 run_command "$OUTPUT_DIR/hello_foundry/forge-build" \
    forge build --color always
  run_command "$OUTPUT_DIR/hello_foundry/forge-test" \
    forge test --color always
  run_command "$OUTPUT_DIR/hello_foundry/forge-install" \
    forge install vectorized/solady
  run_command "$OUTPUT_DIR/hello_foundry/forge-remappings" \
    forge remappings

  in_project test_filters
  run_command "$OUTPUT_DIR/test_filters/forge-test-match-test" \
    forge test --match-test test_DepositETH --color always
  run_command "$OUTPUT_DIR/test_filters/forge-test-match-contract" \
    forge test --match-contract ComplicatedContractTest --color always
  run_command "$OUTPUT_DIR/test_filters/forge-test-match-contract-and-test" \
    forge test --match-contract ComplicatedContractTest --match-test test_Deposit --color always
  run_command "$OUTPUT_DIR/test_filters/forge-test-match-path" \
    forge test --match-path test/ContractB.t.sol --color always

  in_project cheatcodes
  run_command "$OUTPUT_DIR/cheatcodes/forge-test-cheatcodes-expectrevert" \
    forge test --match-test "test_IncrementAsOwner|test_RevertWhen_CallerIsNotOwner" --match-path test/OwnerUpOnly.t.sol --color always
  run_command "$OUTPUT_DIR/cheatcodes/forge-test-vvv" \
    forge test --match-test test_IncrementAsOwner --match-path test/OwnerUpOnly.t.sol -vvv --color always
  run_command "$OUTPUT_DIR/cheatcodes/forge-test-vvvv" \
    forge test --match-test test_IncrementAsOwner --match-path test/OwnerUpOnly.t.sol -vvvv --color always
  run_command "$OUTPUT_DIR/cheatcodes/forge-test-fail-vvv" \
    forge test --match-test test_WithdrawAsNotOwner --match-path test/FailingTest.t.sol -vvv --allow-failure --color always

  in_project fuzz_testing
  step test/Safe.t.sol 1
  run_command "$OUTPUT_DIR/fuzz_testing/forge-test-no-fuzz" \
    forge test --color always
  step test/Safe.t.sol 2
  run_command "$OUTPUT_DIR/fuzz_testing/forge-test-fail-fuzz" \
    forge test --allow-failure --color always
  step test/Safe.t.sol 3
  run_command "$OUTPUT_DIR/fuzz_testing/forge-test-success-fuzz" \
    forge test --color always

  in_temp forge_tree
  git clone https://github.com/morpho-org/morpho-blue
  cd morpho-blue
  forge install
  run_command "$OUTPUT_DIR/forge_tree/forge-tree" \
    forge tree --color always
  run_command "$OUTPUT_DIR/forge_tree/forge-tree-no-dedupe" \
    forge tree --no-dedupe --color always

  echo OK.
}
