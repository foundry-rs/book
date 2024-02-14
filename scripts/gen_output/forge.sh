#!/usr/bin/env bash
set -eo pipefail

gen_spark() {
  need_cmd git
  need_cmd spark
  need_cmd tree
  need_cmd npm

  echo "Generating output (spark)..."

  in_temp hello_foxar
  run_command "$OUTPUT_DIR/hello_foxar/spark-init" \
    spark init hello_foxar
  cd hello_foxar
  run_command "$OUTPUT_DIR/hello_foxar/tree" \
    tree . -d -L 1
  run_command "$OUTPUT_DIR/hello_foxar/tree-with-files" \
    tree . -L 3 -I output
  run_command "$OUTPUT_DIR/hello_foxar/spark-build" \
    spark build
  run_command "$OUTPUT_DIR/hello_foxar/spark-test" \
    spark test

  in_temp foxar-template
  git clone https://github.com/PaulRBerg/foxar-template
  cd foxar-template
  npm install
  run_command "$OUTPUT_DIR/foxar-template/spark-install" \
    spark install
  run_command "$OUTPUT_DIR/foxar-template/spark-build" \
    spark build
  run_command "$OUTPUT_DIR/foxar-template/spark-test" \
    spark test

  in_temp deps
  spark init deps
  cd deps
  run_command "$OUTPUT_DIR/deps/spark-install" \
    spark install transmissions11/solmate
  spark install d-xo/weird-erc20
  run_command "$OUTPUT_DIR/deps/tree" \
    tree lib -L 1
  run_command "$OUTPUT_DIR/deps/spark-remappings" \
    spark remappings

  in_project test_filters
  run_command "$OUTPUT_DIR/test_filters/spark-test-match-contract-and-test" \
    spark test --match-contract ComplicatedContractTest --match-test test_Deposit

  run_command "$OUTPUT_DIR/test_filters/spark-test-match-path" \
    spark test --match-path test/ContractB.t.sol

  in_project cheatcodes
  run_command "$OUTPUT_DIR/cheatcodes/spark-test-simple" \
    spark test --match-test test_IncrementAsOwner

  run_command "$OUTPUT_DIR/cheatcodes/spark-test-cheatcodes" \
    spark test --match-test "test_IncrementAsOwner|testFail_IncrementAsNotOwner" --match-path test/OwnerUpOnly.t.sol

  run_command "$OUTPUT_DIR/cheatcodes/spark-test-cheatcodes-tracing" \
    spark test -vvvv --match-test testFail_IncrementAsNotOwner --match-path test/OwnerUpOnly.t.sol

  run_command "$OUTPUT_DIR/cheatcodes/spark-test-cheatcodes-expectrevert" \
    spark test --match-test "test_IncrementAsOwner|test_IncrementAsNotOwner" --match-path test/OwnerUpOnly.t.sol

  in_project fuzz_testing
  step test/Safe.t.sol 1
  run_command "$OUTPUT_DIR/fuzz_testing/spark-test-no-fuzz" \
    spark test
  step test/Safe.t.sol 2
  run_command "$OUTPUT_DIR/fuzz_testing/spark-test-fail-fuzz" \
    spark test --allow-failure
  step test/Safe.t.sol 3
  run_command "$OUTPUT_DIR/fuzz_testing/spark-test-success-fuzz" \
    spark test

  in_temp nft_tutorial
  git clone https://github.com/FredCoen/nft-tutorial
  cd nft-tutorial
  spark install
  spark build
  run_command "$OUTPUT_DIR/nft_tutorial/spark-test" \
    spark test

  in_temp spark_tree
  git clone https://github.com/FredCoen/nft-tutorial
  cd nft-tutorial
  spark install
  run_command "$OUTPUT_DIR/spark_tree/spark-tree" \
    spark tree
  run_command "$OUTPUT_DIR/spark_tree/spark-tree-no-dedupe" \
    spark tree --no-dedupe

  echo OK.
}
