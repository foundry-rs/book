# forge build

Build the project's smart contracts

```bash
$ forge build --help
Usage: forge build [OPTIONS] [PATHS]...

Options:
  -h, --help
          Print help (see a summary with '-h')

Build options:
      --names
          Print compiled contract names

      --sizes
          Print compiled contract sizes

      --no-cache
          Disable the cache

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

  [PATHS]...
          Build source files from specified paths

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

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

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the delay has
          passed, is an action taken. Note that this does not mean a command will be started: if
          --no-restart is given and a command is already running, the outcome of the action will be
          to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms`
          suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.

      --format-json
          Output the compilation errors in the json format. This is useful when you want to use the
          output in other tools
```