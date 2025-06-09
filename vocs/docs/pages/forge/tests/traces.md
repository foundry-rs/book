---
description: Debug test execution with detailed call traces showing gas usage, contract interactions, and return values.
---

## Understanding Traces

Forge can produce traces either for failing tests (`-vvv`) or all tests (`-vvvv`).

Traces follow the same general format:

```
  [<Gas Usage>] <Contract>::<Function>(<Parameters>)
    ├─ [<Gas Usage>] <Contract>::<Function>(<Parameters>)
    │   └─ ← <Return Value>
    └─ ← <Return Value>
```

Each trace can have many more subtraces, each denoting a call to a contract and a return value.

If your terminal supports color, the traces will also come with a variety of colors:

- **Green**: For calls that do not revert
- **Red**: For reverting calls
- **Blue**: For calls to cheat codes
- **Cyan**: For emitted logs
- **Yellow**: For contract deployments

The gas usage (marked in square brackets) is for the entirety of the function call. You may notice, however, that sometimes the gas usage of one trace does not exactly match the gas usage of all its subtraces:

```
  [24661] OwnerUpOnlyTest::testIncrementAsOwner()
    ├─ [2262] OwnerUpOnly::count()
    │   └─ ← 0
    ├─ [20398] OwnerUpOnly::increment()
    │   └─ ← ()
    ├─ [262] OwnerUpOnly::count()
    │   └─ ← 1
    └─ ← ()
```

The gas unaccounted for is due to some extra operations happening between calls, such as arithmetic and store reads/writes.

Forge will try to decode as many signatures and values as possible, but sometimes this is not possible. In these cases, the traces will appear like so:

```
  [<Gas Usage>] <Address>::<Calldata>
    └─ ← <Return Data>
```

Some traces might be harder to grasp at first glance. These include:

- The `OOG` shorthand stands for "Out Of Gas".
- The acronym `EOF` stands for "Ethereum Object Format", which introduces an extensible and versioned container format for EVM bytecode. For more information, read [here](https://evmobjectformat.org/).
- `NotActivated` means the feature or opcode is not activated. Some versions of the EVM only support certain opcodes. You may need to use a more recent version using the `--evm_version` flag. For example, the `PUSH0` opcode is only available since the [Shanghai](https://www.evm.codes/?fork=shanghai) hardfork.
- `InvalidFEOpcode` means that an undefined bytecode value has been encountered during execution. The EVM catches the unknown bytecode and returns the `INVALID` opcode instead, of value `0xFE`. You can find out more [here](https://www.evm.codes/#fe).

For a deeper insight into the various traces, you can explore the [revm source code](https://github.com/bluealloy/revm/blob/main/crates/interpreter/src/instruction_result.rs).
