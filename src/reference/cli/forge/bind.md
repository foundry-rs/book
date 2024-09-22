# forge bind

Generate Rust bindings for smart contracts

```bash
$ forge bind --help
Usage: forge bind [OPTIONS]

Options:
  -b, --bindings-path <PATH>
          Path to where the contract artifacts are stored

      --select <SELECT>
          Create bindings only for contracts whose names match the specified filter(s)

      --select-all
          Explicitly generate bindings for all contracts
          
          By default all contracts ending with `Test` or `Script` are excluded.

      --crate-name <NAME>
          The name of the Rust crate to generate.
          
          This should be a valid crates.io crate name, however, this is not currently validated by
          this command.
          
          [default: foundry-contracts]

      --crate-version <VERSION>
          The version of the Rust crate to generate.
          
          This should be a standard semver version string, however, this is not currently validated
          by this command.
          
          [default: 0.1.0]

      --module
          Generate the bindings as a module instead of a crate

      --overwrite
          Overwrite existing generated bindings.
          
          By default, the command will check that the bindings are correct, and then exit. If
          --overwrite is passed, it will instead delete and overwrite the bindings.

      --single-file
          Generate bindings as a single file

      --skip-cargo-toml
          Skip Cargo.toml consistency checks

      --skip-build
          Skips running forge build before generating binding

      --skip-extra-derives
          Don't add any additional derives to generated bindings

      --alloy
          Generate bindings for the `alloy` library, instead of `ethers`

      --alloy-version <ALLOY_VERSION>
          Specify the alloy version

      --ethers
          Generate bindings for the `ethers` library, instead of `alloy` (default, deprecated)

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
          The number of runs specifies roughly how often each opcode of the deployed code will be
          executed across the life-time of the contract. This means it is a trade-off parameter
          between code size (deploy cost) and code execution cost (cost after deployment). An
          `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a
          larger `optimizer_runs` parameter will produce longer but more gas efficient code

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert
          strings) and "verboseDebug"

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
```