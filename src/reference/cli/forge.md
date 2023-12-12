# forge

Build, test, fuzz, debug and deploy Solidity contracts.

```bash
$ forge --help
Usage: forge <COMMAND>

Commands:
  bind               Generate Rust bindings for smart contracts
  build              Build the project's smart contracts [aliases: b, compile]
  cache              Manage the Foundry cache
  clean              Remove the build artifacts and cache directories [aliases:
                         cl]
  completions        Generate shell completions script [aliases: com]
  config             Display the current config [aliases: co]
  coverage           Generate coverage reports
  create             Deploy a smart contract [aliases: c]
  debug              Debugs a single smart contract as a script [aliases: d]
  doc                Generate documentation for the project
  flatten            Flatten a source file and all of its imports into one file
                         [aliases: f]
  fmt                Format Solidity source files
  geiger             Detects usage of unsafe cheat codes in a project and its
                         dependencies
  generate           Generate scaffold files
  generate-fig-spec  Generate Fig autocompletion spec [aliases: fig]
  help               Print this message or the help of the given subcommand(s)
  init               Create a new Forge project
  inspect            Get specialized information about a smart contract [aliases:
                         in]
  install            Install one or multiple dependencies [aliases: i]
  remappings         Get the automatically inferred remappings for the project
                         [aliases: re]
  remove             Remove one or multiple dependencies [aliases: rm]
  script             Run a smart contract as a script, building transactions that
                         can be sent onchain
  selectors          Function selector utilities [aliases: se]
  snapshot           Create a snapshot of each test's gas usage [aliases: s]
  test               Run the project's tests [aliases: t]
  tree               Display a tree visualization of the project's dependency
                         graph [aliases: tr]
  update             Update one or multiple dependencies [aliases: u]
  verify-check       Check verification status on Etherscan [aliases: vc]
  verify-contract    Verify smart contracts on Etherscan [aliases: v]

Options:
  -h, --help     Print help
  -V, --version  Print version

Find more information in the book:
http://book.getfoundry.sh/reference/forge/forge.html
```

## forge bind

Generate Rust bindings for smart contracts

```bash
$ forge bind --help
Usage: forge bind [OPTIONS]

Options:
  -b, --bindings-path <PATH>
          Path to where the contract artifacts are stored

      --select <SELECT>
          Create bindings only for contracts whose names match the specified
          filter(s)

      --skip <SKIP>
          Create bindings only for contracts whose names do not match the specified
          filter(s)

      --select-all
          Explicitly generate bindings for all contracts
          
          By default all contracts ending with `Test` or `Script` are excluded.

      --crate-name <NAME>
          The name of the Rust crate to generate.
          
          This should be a valid crates.io crate name, however, this is not currently
          validated by this command.
          
          [default: foundry-contracts]

      --crate-version <VERSION>
          The version of the Rust crate to generate.
          
          This should be a standard semver version string, however, this is not
          currently validated by this command.
          
          [default: 0.1.0]

      --module
          Generate the bindings as a module instead of a crate

      --overwrite
          Overwrite existing generated bindings.
          
          By default, the command will check that the bindings are correct, and then
          exit. If --overwrite is passed, it will instead delete and overwrite the
          bindings.

      --single-file
          Generate bindings as a single file

      --skip-cargo-toml
          Skip Cargo.toml consistency checks

      --skip-build
          Skips running forge build before generating binding

  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge build

Build the project's smart contracts

```bash
$ forge build --help
Usage: forge build [OPTIONS]

Options:
  -h, --help
          Print help (see a summary with '-h')

Build options:
      --names
          Print compiled contract names

      --sizes
          Print compiled contract sizes

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project
          are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the
          delay has passed, is an action taken. Note that this does not mean a
          command will be started: if --no-restart is given and a command is already
          running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading
          disk I/O.

      --format-json
          Output the compilation errors in the json format. This is useful when you
          want to use the output in other tools
```

## forge cache

Manage the Foundry cache

```bash
$ forge cache --help
Usage: forge cache <COMMAND>

Commands:
  clean  Cleans cached data from the global foundry directory
  ls     Shows cached data from the global foundry directory
  help   Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

### forge cache clean

Cleans cached data from the global foundry directory

```bash
$ forge cache clean --help
Usage: forge cache clean [OPTIONS] [CHAINS]...

Arguments:
  [CHAINS]...
          The chains to clean the cache for.
          
          Can also be "all" to clean all chains.
          
          [env: CHAIN=]
          [default: all]

Options:
  -b, --blocks <BLOCKS>...
          The blocks to clean the cache for

      --etherscan
          Whether to clean the Etherscan cache

  -h, --help
          Print help (see a summary with '-h')
```

### forge cache ls

Shows cached data from the global foundry directory

```bash
$ forge cache ls --help
Usage: forge cache ls [CHAINS]...

Arguments:
  [CHAINS]...
          The chains to list the cache for.
          
          Can also be "all" to list all chains.
          
          [env: CHAIN=]
          [default: all]

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## forge clean

Remove the build artifacts and cache directories

```bash
$ forge clean --help
Usage: forge clean [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

  -h, --help
          Print help (see a summary with '-h')
```

## forge completions

Generate shell completions script

```bash
$ forge completions --help
Usage: forge completions <SHELL>

Arguments:
  <SHELL>  [possible values: bash, elvish, fish, powershell, zsh]

Options:
  -h, --help  Print help
```

## forge config

Display the current config

```bash
$ forge config --help
Usage: forge config [OPTIONS]

Options:
      --basic
          Print only a basic set of the currently set config values

      --json
          Print currently set config values as JSON

      --fix
          Attempt to fix any configuration warnings

  -h, --help
          Print help (see a summary with '-h')

Build options:
      --names
          Print compiled contract names

      --sizes
          Print compiled contract sizes

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project
          are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the
          delay has passed, is an action taken. Note that this does not mean a
          command will be started: if --no-restart is given and a command is already
          running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading
          disk I/O.

      --format-json
          Output the compilation errors in the json format. This is useful when you
          want to use the output in other tools

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.
```

## forge coverage

Generate coverage reports

```bash
$ forge coverage --help
Usage: forge coverage [OPTIONS]

Options:
      --report <REPORT>
          The report type to use for coverage.
          
          This flag can be used multiple times.
          
          [default: summary]
          [possible values: summary, lcov, debug]

      --ir-minimum
          Enable viaIR with minimum optimization
          
          This can fix most of the "stack too deep" errors while resulting a
          relatively accurate source map.

  -r, --report-file <PATH>
          The path to output the report.
          
          If not specified, the report will be stored in the root of the project.

  -h, --help
          Print help (see a summary with '-h')

Test filtering:
      --match-test <REGEX>
          Only run test functions matching the specified regex pattern
          
          [aliases: mt]

      --no-match-test <REGEX>
          Only run test functions that do not match the specified regex pattern
          
          [aliases: nmt]

      --match-contract <REGEX>
          Only run tests in contracts matching the specified regex pattern
          
          [aliases: mc]

      --no-match-contract <REGEX>
          Only run tests in contracts that do not match the specified regex pattern
          
          [aliases: nmc]

      --match-path <GLOB>
          Only run tests in source files matching the specified glob pattern
          
          [aliases: mp]

      --no-match-path <GLOB>
          Only run tests in source files that do not match the specified glob pattern
          
          [aliases: nmp]

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge create

Deploy a smart contract

```bash
$ forge create --help
Usage: forge create [OPTIONS] <CONTRACT>

Arguments:
  <CONTRACT>
          The contract identifier in the form `<path>:<contractname>`

Options:
      --constructor-args <ARGS>...
          The constructor arguments

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

      --verify
          Verify contract after creation

      --unlocked
          Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM`
          as sender

      --show-standard-json-input
          Prints the standard json compiler input if `--verify` is provided.
          
          The standard json compiler input can be used to manually submit contract
          verification in the browser.

  -h, --help
          Print help (see a summary with '-h')

Display options:
      --json
          Print the deployment information as JSON

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559
          transactions
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string
          with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```

## forge debug

Debugs a single smart contract as a script

```bash
$ forge debug --help
Usage: forge debug [OPTIONS] <PATH> [ARGS]...

Arguments:
  <PATH>
          The contract you want to run. Either the file path or contract name.
          
          If multiple contracts exist in the same file you must specify the target
          contract with --target-contract.

  [ARGS]...
          Arguments to pass to the script function

Options:
      --target-contract <CONTRACT_NAME>
          The name of the contract you want to run
          
          [aliases: tc]

  -s, --sig <SIGNATURE>
          The signature of the function you want to call in the contract, or raw
          calldata
          
          [default: run()]

      --debug
          Open the script in the debugger

  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.
```

## forge doc

Generate documentation for the project

```bash
$ forge doc --help
Usage: forge doc [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

  -o, --out <PATH>
          The doc's output path.
          
          By default, it is the `docs/` in project root.

  -b, --build
          Build the `mdbook` from generated files

  -s, --serve
          Serve the documentation

      --open
          Open the documentation in a browser after serving

      --hostname <HOSTNAME>
          Hostname for serving documentation

  -p, --port <PORT>
          Port for serving documentation

      --deployments [<DEPLOYMENTS>]
          The relative path to the `hardhat-deploy` or `forge-deploy` artifact
          directory. Leave blank for default

  -i, --include-libraries
          Whether to create docs for external libraries

  -h, --help
          Print help (see a summary with '-h')
```

## forge flatten

Flatten a source file and all of its imports into one file

```bash
$ forge flatten --help
Usage: forge flatten [OPTIONS] <PATH>

Arguments:
  <PATH>
          The path to the contract to flatten

Options:
  -o, --output <PATH>
          The path to output the flattened contract.
          
          If not specified, the flattened contract will be output to stdout.

  -h, --help
          Print help (see a summary with '-h')

Project options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge fmt

Format Solidity source files

```bash
$ forge fmt --help
Usage: forge fmt [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Path to the file, directory or '-' to read from stdin

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

      --check
          Run in 'check' mode.
          
          Exits with 0 if input is formatted correctly. Exits with 1 if formatting is
          required.

  -r, --raw
          In 'check' and stdin modes, outputs raw formatted code instead of the diff

  -h, --help
          Print help (see a summary with '-h')
```

## forge geiger

Detects usage of unsafe cheat codes in a project and its dependencies

```bash
$ forge geiger --help
Usage: forge geiger [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Paths to files or directories to detect

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

      --check
          Run in "check" mode.
          
          The exit code of the program will be the number of unsafe cheatcodes found.

      --ignore <PATH>...
          Globs to ignore

      --full
          Print a report of all files, even if no unsafe functions are found

  -h, --help
          Print help (see a summary with '-h')
```

## forge generate

Generate scaffold files

```bash
$ forge generate --help
Usage: forge generate <COMMAND>

Commands:
  test  Scaffolds test file for given contract
  help  Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

### forge generate test

Scaffolds test file for given contract

```bash
$ forge generate test --help
Usage: forge generate test --contract-name <CONTRACT_NAME>

Options:
  -c, --contract-name <CONTRACT_NAME>  Contract name for test generation
  -h, --help                           Print help
```

## forge generate-fig-spec

Generate Fig autocompletion spec

```bash
$ forge generate-fig-spec --help
Usage: forge generate-fig-spec

Options:
  -h, --help  Print help
```

## forge init

Create a new Forge project

```bash
$ forge init --help
Usage: forge init [OPTIONS] [PATH]

Arguments:
  [PATH]
          The root directory of the new project
          
          [default: .]

Options:
  -t, --template <TEMPLATE>
          The template to start from

  -b, --branch <BRANCH>
          Branch argument that can only be used with template option. If not
          specified, the default branch is used

      --offline
          Do not install dependencies from the network
          
          [aliases: no-deps]

      --force
          Create the project even if the specified root directory is not empty

      --vscode
          Create a .vscode/settings.json file with Solidity settings, and generate a
          remappings.txt file

      --shallow
          Perform shallow clones instead of deep ones.
          
          Improves performance and reduces disk usage, but prevents switching
          branches or tags.

      --no-git
          Install without adding the dependency as a submodule

      --no-commit
          Do not create a commit

  -q, --quiet
          Do not print any messages

  -h, --help
          Print help (see a summary with '-h')
```

## forge inspect

Get specialized information about a smart contract

```bash
$ forge inspect --help
Usage: forge inspect [OPTIONS] <CONTRACT> <FIELD>

Arguments:
  <CONTRACT>
          The identifier of the contract to inspect in the form
          `(<path>:)?<contractname>`

  <FIELD>
          The contract artifact field to inspect
          
          [possible values: abi, bytecode, deployedBytecode, assembly,
          assemblyOptimized, methodIdentifiers, gasEstimates, storageLayout, devdoc,
          ir, irOptimized, metadata, userdoc, ewasm, errors, events]

Options:
      --pretty
          Pretty print the selected field, if supported

  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge install

Install one or multiple dependencies.

```bash
$ forge install --help
Usage: forge install [OPTIONS] [DEPENDENCIES]...
    forge install [OPTIONS] <github username>/<github project>@<tag>...
    forge install [OPTIONS] <alias>=<github username>/<github project>@<tag>...
    forge install [OPTIONS] <https:// git url>...

Arguments:
  [DEPENDENCIES]...
          The dependencies to install.
          
          A dependency can be a raw URL, or the path to a GitHub repository.
          
          Additionally, a ref can be provided by adding @ to the dependency path.
          
          A ref can be: - A branch: master - A tag: v1.2.3 - A commit: 8e8128
          
          Target installation directory can be added via `<alias>=` suffix. The
          dependency will installed to `lib/<alias>`.

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

      --shallow
          Perform shallow clones instead of deep ones.
          
          Improves performance and reduces disk usage, but prevents switching
          branches or tags.

      --no-git
          Install without adding the dependency as a submodule

      --no-commit
          Do not create a commit

  -q, --quiet
          Do not print any messages

  -h, --help
          Print help (see a summary with '-h')
```

## forge remappings

Get the automatically inferred remappings for the project

```bash
$ forge remappings --help
Usage: forge remappings [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

      --pretty
          Pretty-print the remappings, grouping each of them by context

  -h, --help
          Print help (see a summary with '-h')
```

## forge remove

Remove one or multiple dependencies

```bash
$ forge remove --help
Usage: forge remove [OPTIONS] [DEPENDENCIES]...

Arguments:
  [DEPENDENCIES]...
          The dependencies you want to remove

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

  -f, --force
          Override the up-to-date check

  -h, --help
          Print help (see a summary with '-h')
```

## forge script

Run a smart contract as a script, building transactions that can be sent onchain

```bash
$ forge script --help
Usage: forge script [OPTIONS] <PATH> [ARGS]...

Arguments:
  <PATH>
          The contract you want to run. Either the file path or contract name.
          
          If multiple contracts exist in the same file you must specify the target
          contract with --target-contract.

  [ARGS]...
          Arguments to pass to the script function

Options:
      --target-contract <CONTRACT_NAME>
          The name of the contract you want to run
          
          [aliases: tc]

  -s, --sig <SIG>
          The signature of the function you want to call in the contract, or raw
          calldata
          
          [default: run()]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --legacy
          Use legacy transactions instead of EIP1559 ones.
          
          This is auto-enabled for common networks without EIP1559.

      --broadcast
          Broadcasts the transactions

      --skip-simulation
          Skips on-chain simulation

  -g, --gas-estimate-multiplier <GAS_ESTIMATE_MULTIPLIER>
          Relative percentage to multiply gas estimates by
          
          [default: 130]

      --unlocked
          Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM`
          as sender

      --resume
          Resumes submitting transactions that failed or timed-out previously.
          
          It DOES NOT simulate the script again and it expects nonces to have
          remained the same.
          
          Example: If transaction N has a nonce of 22, then the account should have a
          nonce of 22, otherwise it fails.

      --multi
          If present, --resume or --verify will be assumed to be a multi chain
          deployment

      --debug
          Open the script in the debugger.
          
          Takes precedence over broadcast.

      --slow
          Makes sure a transaction is sent, only after its previous one has been
          confirmed and succeeded

      --non-interactive
          Disables interactive prompts that might appear when deploying big
          contracts.
          
          For more info on the contract size limit, see EIP-170:
          <https://eips.ethereum.org/EIPS/eip-170>

      --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

      --verify
          Verifies all the contracts found in the receipts of a script, if any

      --json
          Output results in JSON format

      --with-gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559
          transactions
          
          [env: ETH_GAS_PRICE=]

  -h, --help
          Print help (see a summary with '-h')

Build options:
      --names
          Print compiled contract names

      --sizes
          Print compiled contract sizes

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project
          are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the
          delay has passed, is an action taken. Note that this does not mean a
          command will be started: if --no-restart is given and a command is already
          running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading
          disk I/O.

      --format-json
          Output the compilation errors in the json format. This is useful when you
          want to use the output in other tools

Wallet options - raw:
  -a, --froms [<ADDRESSES>...]
          The sender accounts
          
          [env: ETH_FROM=]

  -i, --interactives <NUM>
          Open an interactive prompt to enter your private key.
          
          Takes a value for the number of keys to enter.
          
          [default: 0]

      --private-keys <RAW_PRIVATE_KEYS>
          Use the provided private keys

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonics <MNEMONICS>
          Use the mnemonic phrases of mnemonic files at the specified paths

      --mnemonic-passphrases <PASSPHRASE>
          Use a BIP39 passphrases for the mnemonic

      --mnemonic-derivation-paths <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-indexes <INDEXES>
          Use the private key from the given mnemonic index.
          
          Can be used with --mnemonics, --ledger, --aws and --trezor.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATHS>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]
          [aliases: keystores]

      --account <ACCOUNT_NAMES>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]
          [aliases: accounts]

      --password <PASSWORDS>
          The keystore password.
          
          Used with --keystore.

      --password-file <PATHS>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - remote:
      --aws
          Use AWS Key Management Service

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```

## forge selectors

Function selector utilities

```bash
$ forge selectors --help
Usage: forge selectors <COMMAND>

Commands:
  collision  Check for selector collisions between contracts [aliases: co]
  upload     Upload selectors to registry [aliases: up]
  list       List selectors from current workspace [aliases: ls]
  help       Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

### forge selectors collision

Check for selector collisions between contracts

```bash
$ forge selectors collision --help
Usage: forge selectors collision [OPTIONS] <FIRST_CONTRACT> <SECOND_CONTRACT>

Arguments:
  <FIRST_CONTRACT>
          The first of the two contracts for which to look selector collisions for,
          in the form `(<path>:)?<contractname>`

  <SECOND_CONTRACT>
          The second of the two contracts for which to look selector collisions for,
          in the form `(<path>:)?<contractname>`

Options:
  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

### forge selectors upload

Upload selectors to registry

```bash
$ forge selectors upload --help
Usage: forge selectors upload [OPTIONS] [CONTRACT]

Arguments:
  [CONTRACT]
          The name of the contract to upload selectors for

Options:
      --all
          Upload selectors for all contracts in the project

  -h, --help
          Print help (see a summary with '-h')

Project options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

### forge selectors list

List selectors from current workspace

```bash
$ forge selectors list --help
Usage: forge selectors list [OPTIONS] [CONTRACT]

Arguments:
  [CONTRACT]
          The name of the contract to list selectors for.

Options:
  -h, --help
          Print help (see a summary with '-h')

Project options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge snapshot

Create a snapshot of each test's gas usage

```bash
$ forge snapshot --help
Usage: forge snapshot [OPTIONS]

Options:
      --diff [<SNAPSHOT_FILE>]
          Output a diff against a pre-existing snapshot.
          
          By default, the comparison is done with .gas-snapshot.

      --check [<SNAPSHOT_FILE>]
          Compare against a pre-existing snapshot, exiting with code 1 if they do not
          match.
          
          Outputs a diff if the snapshots do not match.
          
          By default, the comparison is done with .gas-snapshot.

      --snap <FILE>
          Output file for the snapshot
          
          [default: .gas-snapshot]

      --tolerance <SNAPSHOT_THRESHOLD>
          Tolerates gas deviations up to the specified percentage

  -h, --help
          Print help (see a summary with '-h')

Test options:
      --debug <TEST_FUNCTION>
          Run a test in the debugger.
          
          The argument passed to this flag is the name of the test function you want
          to run, and it works the same as --match-test.
          
          If more than one test matches your specified criteria, you must add
          additional filters until only one test is found (see --match-contract and
          --match-path).
          
          The matching test will be opened in the debugger regardless of the outcome
          of the test.
          
          If the matching test is a fuzz test, then it will open the debugger on the
          first failure case. If the fuzz test does not fail, it will open the
          debugger on the last fuzz case.
          
          For more fine-grained control of which fuzz case is run, see forge run.

      --gas-report
          Print a gas report
          
          [env: FORGE_GAS_REPORT=]

      --allow-failure
          Exit with code 0 even if a test fails
          
          [env: FORGE_ALLOW_FAILURE=]

      --fail-fast
          Stop running tests after the first failure

      --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

      --fuzz-seed <FUZZ_SEED>
          Set seed used to generate randomness during your fuzz runs

      --fuzz-runs <RUNS>
          [env: FOUNDRY_FUZZ_RUNS=]

Display options:
  -j, --json
          Output test results in JSON format

  -l, --list
          List tests instead of running them

      --summary
          Print test summary table

      --detailed
          Print detailed test summary table

Test filtering:
      --match-test <REGEX>
          Only run test functions matching the specified regex pattern
          
          [aliases: mt]

      --no-match-test <REGEX>
          Only run test functions that do not match the specified regex pattern
          
          [aliases: nmt]

      --match-contract <REGEX>
          Only run tests in contracts matching the specified regex pattern
          
          [aliases: mc]

      --no-match-contract <REGEX>
          Only run tests in contracts that do not match the specified regex pattern
          
          [aliases: nmc]

      --match-path <GLOB>
          Only run tests in source files matching the specified glob pattern
          
          [aliases: mp]

      --no-match-path <GLOB>
          Only run tests in source files that do not match the specified glob pattern
          
          [aliases: nmp]

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project
          are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the
          delay has passed, is an action taken. Note that this does not mean a
          command will be started: if --no-restart is given and a command is already
          running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading
          disk I/O.

      --asc
          Sort results by gas used (ascending)

      --desc
          Sort results by gas used (descending)

      --min <MIN_GAS>
          Only include tests that used more gas that the given amount

      --max <MAX_GAS>
          Only include tests that used less gas that the given amount
```

## forge test

Run the project's tests

```bash
$ forge test --help
Usage: forge test [OPTIONS]

Options:
  -h, --help
          Print help (see a summary with '-h')

Test options:
      --debug <TEST_FUNCTION>
          Run a test in the debugger.
          
          The argument passed to this flag is the name of the test function you want
          to run, and it works the same as --match-test.
          
          If more than one test matches your specified criteria, you must add
          additional filters until only one test is found (see --match-contract and
          --match-path).
          
          The matching test will be opened in the debugger regardless of the outcome
          of the test.
          
          If the matching test is a fuzz test, then it will open the debugger on the
          first failure case. If the fuzz test does not fail, it will open the
          debugger on the last fuzz case.
          
          For more fine-grained control of which fuzz case is run, see forge run.

      --gas-report
          Print a gas report
          
          [env: FORGE_GAS_REPORT=]

      --allow-failure
          Exit with code 0 even if a test fails
          
          [env: FORGE_ALLOW_FAILURE=]

      --fail-fast
          Stop running tests after the first failure

      --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

      --fuzz-seed <FUZZ_SEED>
          Set seed used to generate randomness during your fuzz runs

      --fuzz-runs <RUNS>
          [env: FOUNDRY_FUZZ_RUNS=]

Display options:
  -j, --json
          Output test results in JSON format

  -l, --list
          List tests instead of running them

      --summary
          Print test summary table

      --detailed
          Print detailed test summary table

Test filtering:
      --match-test <REGEX>
          Only run test functions matching the specified regex pattern
          
          [aliases: mt]

      --no-match-test <REGEX>
          Only run test functions that do not match the specified regex pattern
          
          [aliases: nmt]

      --match-contract <REGEX>
          Only run tests in contracts matching the specified regex pattern
          
          [aliases: mc]

      --no-match-contract <REGEX>
          Only run tests in contracts that do not match the specified regex pattern
          
          [aliases: nmc]

      --match-path <GLOB>
          Only run tests in source files matching the specified glob pattern
          
          [aliases: mp]

      --no-match-path <GLOB>
          Only run tests in source files that do not match the specified glob pattern
          
          [aliases: nmp]

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see
          --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing
          tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because
          of tests. By default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a
          `MemoryLimitOOG` result is thrown.
          
          The default is 128MiB.

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

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

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the project
          are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once the
          delay has passed, is an action taken. Note that this does not mean a
          command will be started: if --no-restart is given and a command is already
          running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk overloading
          disk I/O.
```

## forge tree

Display a tree visualization of the project's dependency graph

```bash
$ forge tree --help
Usage: forge tree [OPTIONS]

Options:
      --no-dedupe
          Do not de-duplicate (repeats all shared dependencies)

      --charset <CHARSET>
          Character set to use in output.
          
          [possible values: utf8, ascii]
          
          [default: utf8]

  -h, --help
          Print help (see a summary with '-h')

Project options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

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
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## forge update

Update one or multiple dependencies.

```bash
$ forge update --help
Usage: forge update [OPTIONS] [DEPENDENCIES]...

Arguments:
  [DEPENDENCIES]...
          The dependencies you want to update

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

  -f, --force
          Override the up-to-date check

  -r, --recursive
          Recursively update submodules

  -h, --help
          Print help (see a summary with '-h')
```

## forge verify-check

Check verification status on Etherscan

```bash
$ forge verify-check --help
Usage: forge verify-check [OPTIONS] <ID>

Arguments:
  <ID>
          The verification ID.
          
          For Etherscan - Submission GUID.
          
          For Sourcify - Contract Address.

Options:
      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```

## forge verify-contract

Verify smart contracts on Etherscan

```bash
$ forge verify-contract --help
Usage: forge verify-contract [OPTIONS] <ADDRESS> <CONTRACT>

Arguments:
  <ADDRESS>
          The address of the contract to verify

  <CONTRACT>
          The contract identifier in the form `<path>:<contractname>`

Options:
      --constructor-args <ARGS>
          The ABI-encoded constructor arguments

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

      --compiler-version <VERSION>
          The `solc` version to use to build the smart contract

      --num-of-optimizations <NUM>
          The number of optimization runs used to build the smart contract
          
          [aliases: optimizer-runs]

      --flatten
          Flatten the source code before verifying

  -f, --force
          Do not compile the flattened smart contract before verifying (if --flatten
          is passed)

      --skip-is-verified-check
          Do not check if the contract is already verified before verifying

      --watch
          Wait for verification result after submission

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

      --show-standard-json-input
          Prints the standard json compiler input.
          
          The standard json compiler input can be used to manually submit contract
          verification in the browser.

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

  -h, --help
          Print help (see a summary with '-h')

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```

