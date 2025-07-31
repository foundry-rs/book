---
description: Compilation-specific limitations when using zksolc compiler in foundry-zksync.
---

# Compilation Limitations

These limitations are specific to the compilation process when using the zksolc compiler.

## Solidity Version Support

- zksolc supports specific versions of Solidity
- Not all EVM opcodes are supported in zkEVM
- Some Solidity features may compile differently or not at all

## Library Linking

- Library linking works differently in zkEVM
- Factory dependencies must be resolved at compile time
- Some linking patterns may not be supported

## Optimization Differences

- zksolc optimizations differ from solc optimizations
- Gas costs are calculated differently
- Some optimization flags may not apply or have different effects

## Bytecode Differences

- zkEVM bytecode is fundamentally different from EVM bytecode
- Contract size limits may differ
- Deployment patterns may need adjustment