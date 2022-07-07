## forge test

### NAME

forge-test - Run the project's tests.

### SYNOPSIS

``forge test`` [*options*]

### DESCRIPTION

Run the project's tests.

#### Forking

It is possible to run the tests in a forked environment by passing `--fork-url <URL>`.

When the tests are running in a forked environment, you can access all the state of the forked chain as you would
if you had deployed the contracts. [Cheatcodes][cheatcodes] are still available.

You can also specify a block number to fork from by passing `--fork-block-number <BLOCK>`. When forking from a
specific block, the chain data is cached to `~/.foundry/cache`. If you do not want to cache the chain data,
pass `--no-storage-caching`.

Traces that cannot be decoded by local contracts when running in a forked environment (e.g. calls to
contracts that live on mainnet, like tokens) can optionally be decoded using Etherscan. To use Etherscan
for trace decoding, set `ETHERSCAN_API_KEY` or pass `--etherscan-api-key <KEY>`.

#### Debugging

It is possible to run a test in an interactive debugger. To start the debugger, pass `--debug <TEST>`.

If multiple tests match the specified pattern, you must use other test filters in order to reduce
the matching number of tests to exactly 1.

If the test is a unit test, it is immediately opened in the debugger.

If the test is a fuzz test, the fuzz test is run and the debugger is opened on the first failing scenario.
If there are no failing scenarios for the fuzz test, the debugger is opened on the last scenario.

More information on the debugger can be found in the [debugger chapter][debugger].

#### Gas reports

You can generate a gas report by passing `--gas-report`.

More information on gas reports can be found in the [gas reports chapter][gas-reports].

#### List

It is possible to list the tests without running them.
You can pass `--json` to make it easier for outside extensions to parse structured content.

### OPTIONS

{{#include test-options.md}}

{{#include evm-options.md}}

{{#include executor-options.md}}

{{#include core-build-options.md}}

{{#include watch-options.md}}

{{#include ../common/display-options.md}}

`--list`  
&nbsp;&nbsp;&nbsp;&nbsp;List tests instead of running them.

{{#include common-options.md}}

### EXAMPLES

1. Run the tests:
    ```sh
    forge test
    ```

2. Open a test in the debugger:
    ```sh
    forge test --debug testSomething
    ```

3. Generate a gas report:
    ```sh
    forge test --gas-report
    ```

4. Only run tests in `test/Contract.t.sol` in the `BigTest` contract that start with `testFail`:
    ```sh
    forge test --match-path test/Contract.t.sol --match-contract BigTest \
      --match-test "testFail*"
    ```

5. List tests in desired format
    ```sh
    forge test --list
    forge test --list --json
    forge test --list --json --match-test "testFail*" | tail -n 1 | json_pp
    ```

### SEE ALSO

[forge](./forge.md), [forge build](./forge-build.md), [forge snapshot](./forge-snapshot.md)

[debugger]: ../../forge/debugger.md
[cheatcodes]: ../../cheatcodes/
[gas-reports]: ../../forge/gas-reports.md
