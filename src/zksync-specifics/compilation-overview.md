## Compilation Overview

[zksolc](https://github.com/matter-labs/era-compiler-solidity/releases) is the compiler ZKsync uses to convert solidity code to zkEVM-compatible bytecode. It uses the same input format as solc but the output bytecodes and their respective hashes. Internally, it uses a custom-compiled [solc](https://github.com/matter-labs/era-solidity/releases)

### Dual Compilation

To allow switching back and forth between EVM and zkEVM as defined in the [Execution Overview](./execution-overview.md), we compile the same contract with `solc` and `zksolc`. This dual-compiled contract can then be freely translated between both environments as needed. As such, every contract in Foundry ZKsync always has two bytecodes attached - EVM bytecode and zkEVM bytecode, which are not equivalent.

### Limitations

See [Compilation Limitations](./limitations/compilation.md).
