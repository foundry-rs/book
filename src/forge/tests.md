## Tests

Forge can run your tests with the `forge test` command. All tests are written in Solidity.

Forge will look for the tests anywhere in your source directory. Any contract with a function that starts with `test` is considered to be a test. Usually, tests will be placed in `src/test` by convention and end with `.t.sol`.

Here's an example of running `forge test` in a freshly created project, that only has the default test:

```sh
$ forge test
compiling...
success.
Running 1 test for ContractTest.json:ContractTest
[PASS] testExample() (gas: 120)
```

You can also run specific tests by passing a filter:

```sh
$ forge test --match-contract ComplicatedContractTest --match-test testDeposit
compiling...
success.
Running 2 tests for ComplicatedContractTest.json:ComplicatedContractTest
[PASS] testDepositERC20() (gas: 27502)
[PASS] testDepositETH() (gas: 12254)
```

This will run the tests in the `ComplicatedContractTest` test contract with `testDeposit` in the name.
Inverse versions of these flags also exist (`--no-match-contract` and `--no-match-test`).

You can run tests in filenames that match a regex with `--match-path`. Note: an absolute file path must be provided.

```sh
$ forge test --match-path /path/to/hello_foundry/src/test/*
compiling...
no files changed, compilation skipped.
Running 1 test for ContractA.json:ContractA
[PASS] testA() (gas: 120)

Running 1 test for ContractB.json:ContractB
[PASS] testB() (gas: 120)

Running 1 test for ContractC.json:ContractC
[PASS] testC() (gas: 142)
```

The inverse of the `--match-path` flag is `--no-match-path`.

You can run tests on a forked chain - such as the Ethereum mainnet - by passing a RPC URL via the `--fork-url` flag:

```bash
$ forge test --fork-url <your_rpc_url>
```

### Logs and traces

The default behavior for `forge test` is to only display a summary of passing and failing tests. You can control this behavior by increasing the verbosity (using the `-v` flag). Each level of verbosity adds more information:

- **Level 2 (`-vv`)**: Logs emitted during tests are also displayed.
- **Level 3 (`-vvv`)**: Stack traces for failing tests are also displayed.
- **Level 4 (`-vvvv`)**: Stack traces for all tests are displayed, and setup traces for failing tests are displayed.
- **Level 5 (`-vvvvv`)**: Stack traces and setup traces are always displayed.
