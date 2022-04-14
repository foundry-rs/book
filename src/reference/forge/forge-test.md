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

### OPTIONS

#### Test Options

`-m` *regex*  
`--match` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run test functions matching the specified regex pattern.  
&nbsp;&nbsp;&nbsp;&nbsp;**Deprecated: See `--match-test`.**

`--match-test` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run test functions matching the specified regex pattern.

`--no-match-test` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run test functions that do not match the specified regex pattern.

`--match-contract` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run tests in contracts matching the specified regex pattern.

`--no-match-contract` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run tests in contracts that do not match the specified regex pattern.

`--match-path` *glob*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run tests in source files matching the specified glob pattern.

`--no-match-path` *glob*  
&nbsp;&nbsp;&nbsp;&nbsp;Only run tests in source files that do not match the specified glob pattern.

`--debug` *regex*  
&nbsp;&nbsp;&nbsp;&nbsp;Run a test in the debugger.

&nbsp;&nbsp;&nbsp;&nbsp;The argument passed to this flag is the name of the test function you want to run, and it works the same as `--match-test`.

&nbsp;&nbsp;&nbsp;&nbsp;If more than one test matches your specified criteria, you must add additional filters until only one test is found (see `--match-contract` and `--match-path`).

&nbsp;&nbsp;&nbsp;&nbsp;The matching test will be opened in the debugger regardless of the outcome of the test.

&nbsp;&nbsp;&nbsp;&nbsp;If the matching test is a fuzz test, then it will open the debugger on the first failure case. If the fuzz test does not fail, it will open the debugger on the last fuzz case.

&nbsp;&nbsp;&nbsp;&nbsp;For more fine-grained control of which fuzz case is run, see [`forge run`](./forge-run.md).

`--gas-report`  
&nbsp;&nbsp;&nbsp;&nbsp;Print a gas report.

`--allow-failure`  
&nbsp;&nbsp;&nbsp;&nbsp;Exit with code 0 even if a test fails.

{{#include evm-options.md}}

{{#include executor-options.md}}

{{#include core-build-options.md}}

{{#include ../common/display-options.md}}

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

### SEE ALSO

[forge](./forge.md), [forge clean](./forge-clean.md), [forge inspect](./forge-inspect.md)

[debugger]: ../../forge/debugger.md
[cheatcodes]: ../../cheatcodes/
[gas-reports]: ../../forge/gas-reports.md
