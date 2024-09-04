# forge selectors collision

Check for selector collisions between contracts

```bash
$ forge selectors collision --help
Usage: forge selectors collision [OPTIONS] <FIRST_CONTRACT> <SECOND_CONTRACT>

Arguments:
  <FIRST_CONTRACT>
          The first of the two contracts for which to look selector collisions for, in the form `(<path>:)?<contractname>`

  <SECOND_CONTRACT>
          The second of the two contracts for which to look selector collisions for, in the form `(<path>:)?<contractname>`

Options:
  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Compiler options:
      --ignored-error-codes <ERROR_CODES>
          Ignore solc warnings by error code

      --deny-warnings
          Warnings will trigger a compiler error

      --no-auto-detect
          Do not auto-detect the `solc` version

      --use <SOLC_VERSION>
          Specify the solc version, or a path to a local solc, to build with.
          
          Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.

      --offline
          Do not access the network.
          
          Missing solc versions will not be installed.

      --via-ir
          Use the Yul intermediate representation compilation pipeline

      --no-metadata
          Do not append any metadata to the bytecode.
          
          This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.

      --silent
          Don't print anything on startup

      --ast
          Includes the AST as JSON in the compiler output

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

  -C, --contracts <PATH>
          The contracts source directory

  -R, --remappings <REMAPPINGS>
          The project's remappings

      --remappings-env <ENV>
          The project's remappings from the environment

      --cache-path <PATH>
          The path to the compiler cache

      --lib-paths <PATH>
          The path to the library folder

      --hardhat
          Use the Hardhat-style project layout.
          
          This is the same as using: `--contracts contracts --lib-paths node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

ZKSync configuration:
      --zk-startup[=<ENABLE_ZKVM_AT_STARTUP>]
          Enable zkVM at startup
          
          [aliases: zksync]
          [possible values: true, false]

      --zk-compile[=<COMPILE_FOR_ZKVM>]
          Compile for zkVM
          
          [possible values: true, false]

      --zk-solc-path <ZK_SOLC_PATH>
          Solc compiler path to use when compiling with zksolc

      --zk-enable-eravm-extensions[=<ENABLE_ERAVM_EXTENSIONS>]
          Enable the system contract compilation mode.
          
          [aliases: enable-eravm-extensions, system-mode]
          [possible values: true, false]

      --zk-force-evmla[=<FORCE_EVMLA>]
          Forcibly switch to the EVM legacy assembly pipeline.
          
          [aliases: force-evmla]
          [possible values: true, false]

      --zk-llvm-options <LLVM_OPTIONS>
          ZkSolc extra LLVM options

      --zk-fallback-oz[=<FALLBACK_OZ>]
          Try to recompile with -Oz if the bytecode is too large
          
          [aliases: fallback-oz]
          [possible values: true, false]

      --zk-detect-missing-libraries
          Detect missing libraries, instead of erroring
          
          Currently unused

  -O, --zk-optimizer-mode <LEVEL>
          Set the LLVM optimization parameter `-O[0 | 1 | 2 | 3 | s | z]`. Use `3` for best performance and `z` for minimal size
          
          [aliases: zk-optimization]

      --zk-optimizer
          Enables optimizations

      --zk-avoid-contracts <AVOID_CONTRACTS>
          Contracts to avoid compiling on zkSync
          
          [aliases: avoid-contracts]
```