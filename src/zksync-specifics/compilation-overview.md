## Compilation Overview

[zksolc](https://github.com/matter-labs/era-compiler-solidity/releases) is the compiler ZKsync uses to convert solidity code to zkEVM-compatible bytecode. It uses the same input format as solc but the output bytecodes and their respective hashes. Internally, it uses a custom-compiled [solc](https://github.com/matter-labs/era-solidity/releases)

### Dual Compilation

To allow switching back and forth between EVM and zkEVM as defined in the [Execution Overview](./execution-overview.md), we compile the same contract with `solc` and `zksolc`. This dual-compiled contract can then be freely translated between both environments as needed. As such, every contract in Foundry ZKsync always has two bytecodes attached - EVM bytecode and zkEVM bytecode, which are not equivalent.

> ℹ️ **Note**
>
> If you run the example listed in the [Getting Started](../getting-started/first-steps.md) section at the beginning of the book, you can check them out in the `out` and `zkout` folders

### Limitations

See [Compilation Limitations](./limitations/compilation.md).

### Compiler Support Policy

To provide clarity and a consistent user experience, Foundry-ZKsync follows a formal zksolc version support policy. This policy ensures compatibility, minimizes user confusion, and addresses issues related to deprecated or unsupported compiler versions.

#### Supported Versions

- Foundry officially supports zksolc starting from **v1.5.6**:
  - **v1.5.6**: Serves as a baseline with structural compatibility.
  - **v1.5.7 and later**: Includes support for post-compile-time linkage and subsequent improvements.
  - **Note:** `v1.5.9` is **not supported** due to a breaking change where `AssemblyCreate` was introduced as an `ErrorType` rather than a `WarningType`. Users should upgrade to `v1.5.10` or later to resolve this issue.

#### Deprecation Policy

- Backward compatibility will be maintained for supported versions (**v1.5.6 and later**) unless deprecated due to critical issues (e.g., security vulnerabilities or obsolete functionality).
- Versions earlier than **v1.5.6** and **v1.5.9** will not be supported. Compilation with these versions will fail.

#### Behavior for Unsupported Versions

- **Explicitly Specified Versions:** If an unsupported version (e.g., `zksolc = 1.5.5`) is specified, compilation will fail with a clear error message.
- **Hardcoded Paths:** If an unsupported version is used via a hardcoded path (e.g., `zksolc = "path/to/zksolc-v1.5.5"`), Foundry will emit a warning to inform users without halting compilation.
