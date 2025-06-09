---
description: Forge is a command-line tool for building, testing, and deploying smart contracts with advanced features like fuzzing and gas tracking.
---

## Forge Overview

Forge is a command-line tool that ships with Foundry. Forge tests, builds, and deploys your smart contracts.

Forge is part of the Foundry suite and is installed alongside `cast`, `chisel`, and `anvil`. If you haven't installed Foundry
yet, see [Foundry installation](/introduction/installation).

### Getting started

The best way to understand Forge is to simply try it (in less than 30 seconds!).

First, let's initialize a new `counter` example repository:

```sh
forge init counter
```

Next `cd` into `counter` and build :

```sh
forge build
```

```console
[⠊] Compiling...
[⠔] Compiling 27 files with Solc 0.8.28
[⠒] Solc 0.8.28 finished in 452.13ms
Compiler run successful!
```

Let's [test](https://book.getfoundry.sh/forge/tests#tests) our contracts:

```sh
forge test
```

```console
[⠊] Compiling...
No files changed, compilation skipped

Ran 2 tests for test/Counter.t.sol:CounterTest
[PASS] testFuzz_SetNumber(uint256) (runs: 256, μ: 31121, ~: 31277)
[PASS] test_Increment() (gas: 31293)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 5.35ms (4.86ms CPU time)

Ran 1 test suite in 5.91ms (5.35ms CPU time): 2 tests passed, 0 failed, 0 skipped (2 total tests)
```

Finally, let's run our deployment script:

```sh
forge script script/Counter.s.sol
```

```
[⠊] Compiling...
No files changed, compilation skipped
Script ran successfully.
Gas used: 109037

If you wish to simulate on-chain transactions pass a RPC URL.
```

:::info
See the [`forge` Reference](/forge/reference/overview) for a complete overview of all the available subcommands.
:::
