## Tests

Forge can run your tests with the `forge test` command. All tests are written in Solidity.

Forge will look for the tests anywhere in your source directory. Any contract with a function that starts with `test` is considered to be a test. Usually, tests will be placed in `src/test` by convention and end with `.t.sol`.

Here's an example of running `forge test` in a freshly created project, that only has the default test:

```sh
$ forge test
[⠊] Compiling...
[⠒] Compiling 3 files with 0.8.10
[⠢] Solc finished in 57.34ms
Compiler run successful

Running 1 test for src/test/Contract.t.sol:ContractTest
[PASS] testExample() (gas: 120)
Test result: ok. 1 passed; 0 failed; finished in 147.61µs
```

You can also run specific tests by passing a filter:

```sh
$ forge test --match-contract ComplicatedContractTest --match-test testDeposit
[⠊] Compiling...
[⠒] Compiling 5 files with 0.8.10
[⠢] Solc finished in 63.12ms
Compiler run successful

Running 2 tests for src/test/ComplicatedContract.t.sol:ComplicatedContractTest
[PASS] testDepositERC20() (gas: 27502)
[PASS] testDepositETH() (gas: 12254)
Test result: ok. 2 passed; 0 failed; finished in 241.61µs
```

This will run the tests in the `ComplicatedContractTest` test contract with `testDeposit` in the name.
Inverse versions of these flags also exist (`--no-match-contract` and `--no-match-test`).

You can run tests in filenames that match a regex with `--match-path`. Note: an absolute file path must be provided.

```sh
$ forge test --match-path /path/to/hello_foundry/src/test/*
[⠊] Compiling...
[⠒] Compiling 5 files with 0.8.10
[⠢] Solc finished in 60.78ms
Compiler run successful

Running 1 test for src/test/ContractA.t.sol:ContractA
[PASS] testA() (gas: 120)
Test result: ok. 1 passed; 0 failed; finished in 49.29µs

Running 1 test for src/test/ContractB.t.sol:ContractB
[PASS] testB() (gas: 120)
Test result: ok. 1 passed; 0 failed; finished in 49.33µs

Running 1 test for src/test/ContractC.t.sol:ContractC
[PASS] testC() (gas: 142)
Test result: ok. 1 passed; 0 failed; finished in 52.61µs
```

The inverse of the `--match-path` flag is `--no-match-path`.

### Logs and traces

The default behavior for `forge test` is to only display a summary of passing and failing tests. You can control this behavior by increasing the verbosity (using the `-v` flag). Each level of verbosity adds more information:

- **Level 2 (`-vv`)**: Logs emitted during tests are also displayed.
- **Level 3 (`-vvv`)**: Stack traces for failing tests are also displayed.
- **Level 4 (`-vvvv`)**: Stack traces for all tests are displayed, and setup traces for failing tests are displayed.
- **Level 5 (`-vvvvv`)**: Stack traces and setup traces are always displayed.
