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

This will run the tests starting with `testDeposit` in the `ComplicatedContractTest` test contract.
Inverse versions of these flags also exist (`--no-match-contract` and `--no-match-test`).

### Logs and traces

The default behavior for `forge test` is to only display a summary of passing and failing tests. You can control this behavior by increasing the verbosity (using the `-v` flag). Each level of verbosity adds more information:

- **Level 2 (`-vv`)**: Logs emitted during tests are also displayed.
- **Level 3 (`-vvv`)**: Stack traces for failing tests are also displayed.
- **Level 4 (`-vvvv`)**: Stack traces for all tests are displayed, and setup traces for failing tests are displayed.
- **Level 5 (`-vvvvv`)**: Stack traces and setup traces are always displayed.
