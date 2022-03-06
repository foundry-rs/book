## Off Topic Guides

### Using custom environment variables

You can keep your evironment variables in a file such as `.env`:

```ignore
export ETH_RPC_URL=https://mainnet...
export PK=0525...
```

You source them with `source .env`, or use in combination with `make` commands (see below).

### Making your own scripts with Makefile

Typing commands every time you want to run tests or deploy can become time-consuming. You can use a Makefile to create easy-to-call scripts and save time:

```makefile
# Automatically export envs if `.env` exists
-include .env

test-mycontract:
    make unit-test-mycontract
    make integration-test-mycontract

unit-test-mycontract :; forge test --match-contract MyContractUnitTest
integration-test-mycontract :; forge test --match-contract MyContractIntegrationTest --fork-url $(ETH_RPC_URL)
```

In the example above, running `make test-mycontract` would do the following for you:

```bash
$ export ETH_RPC_URL=https://mainnet...
$ export PK=0525...
$ forge test --match-contract MyContractUnitTest
Compiling...
Compiling 2 files with 0.8.11
Compilation finished successfully
Success

Running 1 tests for MyContractUnitTest.json:MyContractUnitTest
[PASS] testSomething() (gas: 98)
$ forge test --match-contract MyContractintegrationTest --fork-url $(ETH_RPC_URL)
Compiling...
No files changed, compilation skipped

Running 1 tests for MyContractintegrationTest.json:MyContractintegrationTest
[PASS] testSomethingElse() (gas: 98)
```

You can build your Makefile piece by piece, as you continue expanding your project.