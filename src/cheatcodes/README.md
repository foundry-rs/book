## Cheatcodes Reference

Cheatcodes give you powerful assertions, the ability to alter the state of the EVM, mock data, and more.

Cheatcodes are made available through use of the cheatcode address (`0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`).

> ℹ️ **Note**
>
> If you encounter errors for this address when using fuzzed addresses in your tests, you may wish to
> exclude it from your fuzz tests by using the following line:
>
> ```solidity
> vm.assume(address_ != 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
> ```

You can also access cheatcodes easily via `vm` available in Forge Standard Library's [`Test`](../reference/forge-std/#forge-stds-test) contract.

### Forge Standard Library Cheatcodes

Forge Std implements wrappers around cheatcodes, which combine multiple standard cheatcodes to improve development experience. These are not technically cheatcodes, but rather compositions of Forge's cheatcodes.

You can view the list of Forge Standard Library's cheatcode wrappers [in the references section](../reference/forge-std/std-cheats.md). You can reference the [Forge Std source code](https://github.com/foundry-rs/forge-std/blob/master/src/Test.sol) to learn more about how the wrappers work under the hood.

### Cheatcode Types

Below are some subsections for the different Forge cheatcodes.

- [Environment](./environment.md): Cheatcodes that alter the state of the EVM.
- [Assertions](./assertions.md): Cheatcodes that are powerful assertions
- [Fuzzer](./fuzzer.md): Cheatcodes that configure the fuzzer
- [External](./external.md): Cheatcodes that interact with external state (files, commands, ...)
- [Signing](./signing.md): Cheatcodes for signing
- [Utilities](./utilities.md): Smaller utility cheatcodes
- [Forking](./forking.md): Forking mode cheatcodes
- [Snapshots](./snapshots.md): Snapshot cheatcodes
- [RPC](./rpc.md): RPC related cheatcodes
- [File](./fs.md): Cheatcodes for working with files

### Add a new cheatcode

If you need a new feature, consider [contributing to the Foundry's codebase](../contributing.md) to add the cheatcode.

### Cheatcodes Interface

This is a Solidity interface for all of the cheatcodes present in Forge.

```solidity
{{#include ../output/vm/Vm.sol:3:}}
```
