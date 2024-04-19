# forge test

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
          
          The argument passed to this flag is the name of the test function you want to run, and it
          works the same as --match-test.
          
          If more than one test matches your specified criteria, you must add additional filters
          until only one test is found (see --match-contract and --match-path).
          
          The matching test will be opened in the debugger regardless of the outcome of the test.
          
          If the matching test is a fuzz test, then it will open the debugger on the first failure
          case. If the fuzz test does not fail, it will open the debugger on the last fuzz case.
          
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

      --fuzz-input-file <FUZZ_INPUT_FILE>
          File to rerun fuzz failures from

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
          
          If you want to fetch state from a specific block number, see --fork-block-number.
          
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

      --always-use-create-2-factory
          Use the create 2 factory in all cases including tests and non-broadcasting scripts

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this provider
          
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
          EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By
          default, it is 0x6000 (~25kb)

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
          The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG`
          result is thrown.
          
          The default is 128MiB.

      --disable-block-gas-limit
          Whether to disable the block gas limit checks
          
          [aliases: no-gas-limit]

      --isolate
          Whether to enable isolation of calls. In isolation mode all top-level calls are executed
          as a separate transaction in a separate EVM context, enabling more precise gas accounting
          and transaction state changes

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
```