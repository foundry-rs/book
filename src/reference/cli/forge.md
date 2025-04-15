# Command-Line Help for `forge`

This document contains the help content for the `forge` command-line program.

**Command Overview:**

* [`forge`↴](#forge)
* [`forge test`↴](#forge-test)
* [`forge script`↴](#forge-script)
* [`forge coverage`↴](#forge-coverage)
* [`forge bind`↴](#forge-bind)
* [`forge build`↴](#forge-build)
* [`forge clone`↴](#forge-clone)
* [`forge update`↴](#forge-update)
* [`forge install`↴](#forge-install)
* [`forge remove`↴](#forge-remove)
* [`forge remappings`↴](#forge-remappings)
* [`forge verify-contract`↴](#forge-verify-contract)
* [`forge verify-check`↴](#forge-verify-check)
* [`forge verify-bytecode`↴](#forge-verify-bytecode)
* [`forge create`↴](#forge-create)
* [`forge init`↴](#forge-init)
* [`forge completions`↴](#forge-completions)
* [`forge generate-fig-spec`↴](#forge-generate-fig-spec)
* [`forge clean`↴](#forge-clean)
* [`forge cache`↴](#forge-cache)
* [`forge cache clean`↴](#forge-cache-clean)
* [`forge cache ls`↴](#forge-cache-ls)
* [`forge snapshot`↴](#forge-snapshot)
* [`forge config`↴](#forge-config)
* [`forge flatten`↴](#forge-flatten)
* [`forge fmt`↴](#forge-fmt)
* [`forge inspect`↴](#forge-inspect)
* [`forge tree`↴](#forge-tree)
* [`forge geiger`↴](#forge-geiger)
* [`forge doc`↴](#forge-doc)
* [`forge selectors`↴](#forge-selectors)
* [`forge selectors collision`↴](#forge-selectors-collision)
* [`forge selectors upload`↴](#forge-selectors-upload)
* [`forge selectors list`↴](#forge-selectors-list)
* [`forge selectors find`↴](#forge-selectors-find)
* [`forge selectors cache`↴](#forge-selectors-cache)
* [`forge generate`↴](#forge-generate)
* [`forge generate test`↴](#forge-generate-test)
* [`forge compiler`↴](#forge-compiler)
* [`forge compiler resolve`↴](#forge-compiler-resolve)
* [`forge soldeer`↴](#forge-soldeer)
* [`forge soldeer init`↴](#forge-soldeer-init)
* [`forge soldeer install`↴](#forge-soldeer-install)
* [`forge soldeer update`↴](#forge-soldeer-update)
* [`forge soldeer login`↴](#forge-soldeer-login)
* [`forge soldeer push`↴](#forge-soldeer-push)
* [`forge soldeer uninstall`↴](#forge-soldeer-uninstall)
* [`forge soldeer version`↴](#forge-soldeer-version)
* [`forge eip712`↴](#forge-eip712)
* [`forge bind-json`↴](#forge-bind-json)

## `forge`

Build, test, fuzz, debug and deploy Solidity contracts

**Usage:** `forge [OPTIONS] <COMMAND>`

Find more information in the book: http://book.getfoundry.sh/reference/forge/forge.html

###### **Subcommands:**

* `test` — Run the project's tests
* `script` — Run a smart contract as a script, building transactions that can be sent onchain
* `coverage` — Generate coverage reports
* `bind` — Generate Rust bindings for smart contracts
* `build` — Build the project's smart contracts
* `clone` — Clone a contract from Etherscan
* `update` — Update one or multiple dependencies
* `install` — Install one or multiple dependencies
* `remove` — Remove one or multiple dependencies
* `remappings` — Get the automatically inferred remappings for the project
* `verify-contract` — Verify smart contracts on Etherscan
* `verify-check` — Check verification status on Etherscan
* `verify-bytecode` — Verify the deployed bytecode against its source on Etherscan
* `create` — Deploy a smart contract
* `init` — Create a new Forge project
* `completions` — Generate shell completions script
* `generate-fig-spec` — Generate Fig autocompletion spec
* `clean` — Remove the build artifacts and cache directories
* `cache` — Manage the Foundry cache
* `snapshot` — Create a gas snapshot of each test's gas usage
* `config` — Display the current config
* `flatten` — Flatten a source file and all of its imports into one file
* `fmt` — Format Solidity source files
* `inspect` — Get specialized information about a smart contract
* `tree` — Display a tree visualization of the project's dependency graph
* `geiger` — Detects usage of unsafe cheat codes in a project and its dependencies
* `doc` — Generate documentation for the project
* `selectors` — Function selector utilities
* `generate` — Generate scaffold files
* `compiler` — Compiler utilities
* `soldeer` — Soldeer dependency manager
* `eip712` — Generate EIP-712 struct encodings for structs from a given file
* `bind-json` — Generate bindings for serialization/deserialization of project structs via JSON cheatcodes

###### **Options:**

* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores



## `forge test`

Run the project's tests

**Usage:** `forge test [OPTIONS] [PATH]`

###### **Arguments:**

* `<PATH>` — The contract file you want to test, it's a shortcut for --match-path

###### **Options:**

* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores
* `--debug` — Run a single test in the debugger.

   The matching test will be opened in the debugger regardless of the outcome of the test.

   If the matching test is a fuzz test, then it will open the debugger on the first failure case. If the fuzz test does not fail, it will open the debugger on the last fuzz case.
* `--flamegraph` — Generate a flamegraph for a single test. Implies `--decode-internal`.

   A flame graph is used to visualize which functions or operations within the smart contract are consuming the most gas overall in a sorted manner.
* `--flamechart` — Generate a flamechart for a single test. Implies `--decode-internal`.

   A flame chart shows the gas usage over time, illustrating when each function is called (execution order) and how much gas it consumes at each point in the timeline.
* `--decode-internal` — Identify internal functions in traces.

   This will trace internal functions and decode stack parameters.

   Parameters stored in memory (such as bytes or arrays) are currently decoded only when a single function is matched, similarly to `--debug`, for performance reasons.
* `--dump <PATH>` — Dumps all debugger steps to file
* `--gas-report` — Print a gas report
* `--gas-snapshot-check <GAS_SNAPSHOT_CHECK>` — Check gas snapshots against previous runs

  Possible values: `true`, `false`

* `--gas-snapshot-emit <GAS_SNAPSHOT_EMIT>` — Enable/disable recording of gas snapshot results

  Possible values: `true`, `false`

* `--allow-failure` — Exit with code 0 even if a test fails
* `-s`, `--suppress-successful-traces` — Suppress successful test traces and show only traces for failures
* `--junit` — Output test results as JUnit XML report
* `--fail-fast` — Stop running tests after the first failure
* `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-l`, `--list` — List tests instead of running them
* `--fuzz-seed <FUZZ_SEED>` — Set seed used to generate randomness during your fuzz runs
* `--fuzz-runs <RUNS>`
* `--fuzz-timeout <TIMEOUT>` — Timeout for each fuzz run in seconds
* `--fuzz-input-file <FUZZ_INPUT_FILE>` — File to rerun fuzz failures from
* `--show-progress` — Show test execution progress
* `--rerun` — Re-run recorded test failures from last run. If no failure recorded then regular test run is performed
* `--summary` — Print test summary table
* `--detailed` — Print detailed test summary table
* `--match-test <REGEX>` — Only run test functions matching the specified regex pattern
* `--no-match-test <REGEX>` — Only run test functions that do not match the specified regex pattern
* `--match-contract <REGEX>` — Only run tests in contracts matching the specified regex pattern
* `--no-match-contract <REGEX>` — Only run tests in contracts that do not match the specified regex pattern
* `--match-path <GLOB>` — Only run tests in source files matching the specified glob pattern
* `--no-match-path <GLOB>` — Only run tests in source files that do not match the specified glob pattern
* `--no-match-coverage <REGEX>` — Only show coverage for files that do not match the specified regex pattern
* `-f`, `--fork-url <URL>` — Fetch state over a remote endpoint instead of starting from an empty state.

   If you want to fetch state from a specific block number, see --fork-block-number.
* `--fork-block-number <BLOCK>` — Fetch state from a specific block number over a remote endpoint.

   See --fork-url.
* `--fork-retries <RETRIES>` — Number of retries.

   See --fork-url.
* `--fork-retry-backoff <BACKOFF>` — Initial retry backoff on encountering errors.

   See --fork-url.
* `--no-storage-caching` — Explicitly disables the use of RPC caching.

   All storage slots are read entirely from the endpoint.

   This flag overrides the project's configuration file.

   See --fork-url.
* `--initial-balance <BALANCE>` — The initial balance of deployed test contracts
* `--sender <ADDRESS>` — The address which will be executing tests/scripts
* `--ffi` — Enable the FFI cheatcode
* `--always-use-create-2-factory` — Use the create 2 factory in all cases including tests and non-broadcasting scripts
* `--create2-deployer <ADDRESS>` — The CREATE2 deployer address to use, this will override the one in the config
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rpc-rate-limit` — Disables rate limiting for this node's provider.

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--code-size-limit <CODE_SIZE>` — EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By default, it is 0x6000 (~25kb)
* `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--gas-price <GAS_PRICE>` — The gas price
* `--block-base-fee-per-gas <FEE>` — The base fee in a block
* `--tx-origin <ADDRESS>` — The transaction origin
* `--block-coinbase <ADDRESS>` — The coinbase of the block
* `--block-timestamp <TIMESTAMP>` — The timestamp of the block
* `--block-number <BLOCK>` — The block number
* `--block-difficulty <DIFFICULTY>` — The block difficulty
* `--block-prevrandao <PREVRANDAO>` — The block prevrandao value. NOTE: Before merge this field was mix_hash
* `--block-gas-limit <GAS_LIMIT>` — The block gas limit
* `--memory-limit <MEMORY_LIMIT>` — The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG` result is thrown.

   The default is 128MiB.
* `--disable-block-gas-limit` — Whether to disable the block gas limit checks
* `--isolate` — Whether to enable isolation of calls. In isolation mode all top-level calls are executed as a separate transaction in a separate EVM context, enabling more precise gas accounting and transaction state changes
* `--odyssey` — Whether to enable Odyssey features
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.



## `forge script`

Run a smart contract as a script, building transactions that can be sent onchain

**Usage:** `forge script [OPTIONS] <PATH> [ARGS]...`

###### **Arguments:**

* `<PATH>` — The contract you want to run. Either the file path or contract name.

   If multiple contracts exist in the same file you must specify the target contract with --target-contract.
* `<ARGS>` — Arguments to pass to the script function

###### **Options:**

* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores
* `--target-contract <CONTRACT_NAME>` — The name of the contract you want to run
* `-s`, `--sig <SIG>` — The signature of the function you want to call in the contract, or raw calldata

  Default value: `run()`
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--legacy` — Use legacy transactions instead of EIP1559 ones.

   This is auto-enabled for common networks without EIP1559.
* `--broadcast` — Broadcasts the transactions
* `--batch-size <BATCH_SIZE>` — Batch size of transactions.

   This is ignored and set to 1 if batching is not available or `--slow` is enabled.

  Default value: `100`
* `--skip-simulation` — Skips on-chain simulation
* `-g`, `--gas-estimate-multiplier <GAS_ESTIMATE_MULTIPLIER>` — Relative percentage to multiply gas estimates by

  Default value: `130`
* `--unlocked` — Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender
* `--resume` — Resumes submitting transactions that failed or timed-out previously.

   It DOES NOT simulate the script again and it expects nonces to have remained the same.

   Example: If transaction N has a nonce of 22, then the account should have a nonce of 22, otherwise it fails.
* `--multi` — If present, --resume or --verify will be assumed to be a multi chain deployment
* `--debug` — Open the script in the debugger.

   Takes precedence over broadcast.
* `--dump <PATH>` — Dumps all debugger steps to file
* `--slow` — Makes sure a transaction is sent, only after its previous one has been confirmed and succeeded
* `--non-interactive` — Disables interactive prompts that might appear when deploying big contracts.

   For more info on the contract size limit, see EIP-170: <https://eips.ethereum.org/EIPS/eip-170>
* `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `--verify` — Verifies all the contracts found in the receipts of a script, if any
* `--with-gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--timeout <TIMEOUT>` — Timeout to use for broadcasting transactions
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-a`, `--froms <ADDRESSES>` — The sender accounts
* `-i`, `--interactives <NUM>` — Open an interactive prompt to enter your private key.

   Takes a value for the number of keys to enter.

  Default value: `0`
* `--private-keys <RAW_PRIVATE_KEYS>` — Use the provided private keys
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonics <MNEMONICS>` — Use the mnemonic phrases of mnemonic files at the specified paths
* `--mnemonic-passphrases <PASSPHRASE>` — Use a BIP39 passphrases for the mnemonic
* `--mnemonic-derivation-paths <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-indexes <INDEXES>` — Use the private key from the given mnemonic index.

   Can be used with --mnemonics, --ledger, --aws and --trezor.

  Default value: `0`
* `--keystore <PATHS>` — Use the keystore by its filename in the given folder
* `--account <ACCOUNT_NAMES>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORDS>` — The keystore password.

   Used with --keystore.
* `--password-file <PATHS>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet
* `-f`, `--fork-url <URL>` — Fetch state over a remote endpoint instead of starting from an empty state.

   If you want to fetch state from a specific block number, see --fork-block-number.
* `--fork-block-number <BLOCK>` — Fetch state from a specific block number over a remote endpoint.

   See --fork-url.
* `--fork-retries <RETRIES>` — Number of retries.

   See --fork-url.
* `--fork-retry-backoff <BACKOFF>` — Initial retry backoff on encountering errors.

   See --fork-url.
* `--no-storage-caching` — Explicitly disables the use of RPC caching.

   All storage slots are read entirely from the endpoint.

   This flag overrides the project's configuration file.

   See --fork-url.
* `--initial-balance <BALANCE>` — The initial balance of deployed test contracts
* `--sender <ADDRESS>` — The address which will be executing tests/scripts
* `--ffi` — Enable the FFI cheatcode
* `--always-use-create-2-factory` — Use the create 2 factory in all cases including tests and non-broadcasting scripts
* `--create2-deployer <ADDRESS>` — The CREATE2 deployer address to use, this will override the one in the config
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rpc-rate-limit` — Disables rate limiting for this node's provider.

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--code-size-limit <CODE_SIZE>` — EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By default, it is 0x6000 (~25kb)
* `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--gas-price <GAS_PRICE>` — The gas price
* `--block-base-fee-per-gas <FEE>` — The base fee in a block
* `--tx-origin <ADDRESS>` — The transaction origin
* `--block-coinbase <ADDRESS>` — The coinbase of the block
* `--block-timestamp <TIMESTAMP>` — The timestamp of the block
* `--block-number <BLOCK>` — The block number
* `--block-difficulty <DIFFICULTY>` — The block difficulty
* `--block-prevrandao <PREVRANDAO>` — The block prevrandao value. NOTE: Before merge this field was mix_hash
* `--block-gas-limit <GAS_LIMIT>` — The block gas limit
* `--memory-limit <MEMORY_LIMIT>` — The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG` result is thrown.

   The default is 128MiB.
* `--disable-block-gas-limit` — Whether to disable the block gas limit checks
* `--isolate` — Whether to enable isolation of calls. In isolation mode all top-level calls are executed as a separate transaction in a separate EVM context, enabling more precise gas accounting and transaction state changes
* `--odyssey` — Whether to enable Odyssey features
* `--verifier <VERIFIER>` — The contract verification provider to use

  Default value: `sourcify`

  Possible values:
  - `etherscan`
  - `sourcify`
  - `blockscout`
  - `oklink`
  - `custom`:
    Custom verification provider, requires compatibility with the Etherscan API

* `--verifier-api-key <VERIFIER_API_KEY>` — The verifier API KEY, if using a custom provider
* `--verifier-url <VERIFIER_URL>` — The verifier URL, if using a custom provider
* `--retries <RETRIES>` — Number of attempts for retrying verification

  Default value: `5`
* `--delay <DELAY>` — Optional delay to apply in between verification attempts, in seconds

  Default value: `5`



## `forge coverage`

Generate coverage reports

**Usage:** `forge coverage [OPTIONS] [PATH]`

###### **Arguments:**

* `<PATH>` — The contract file you want to test, it's a shortcut for --match-path

###### **Options:**

* `--report <REPORT>` — The report type to use for coverage.

   This flag can be used multiple times.

  Default value: `summary`

  Possible values: `summary`, `lcov`, `debug`, `bytecode`

* `--lcov-version <LCOV_VERSION>` — The version of the LCOV "tracefile" format to use.

   Format: `MAJOR[.MINOR]`.

   Main differences: - `1.x`: The original v1 format. - `2.0`: Adds support for "line end" numbers for functions. - `2.2`: Changes the format of functions.

  Default value: `1`
* `--ir-minimum` — Enable viaIR with minimum optimization

   This can fix most of the "stack too deep" errors while resulting a relatively accurate source map.
* `-r`, `--report-file <PATH>` — The path to output the report.

   If not specified, the report will be stored in the root of the project.
* `--include-libs` — Whether to include libraries in the coverage report
* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores
* `--debug` — Run a single test in the debugger.

   The matching test will be opened in the debugger regardless of the outcome of the test.

   If the matching test is a fuzz test, then it will open the debugger on the first failure case. If the fuzz test does not fail, it will open the debugger on the last fuzz case.
* `--flamegraph` — Generate a flamegraph for a single test. Implies `--decode-internal`.

   A flame graph is used to visualize which functions or operations within the smart contract are consuming the most gas overall in a sorted manner.
* `--flamechart` — Generate a flamechart for a single test. Implies `--decode-internal`.

   A flame chart shows the gas usage over time, illustrating when each function is called (execution order) and how much gas it consumes at each point in the timeline.
* `--decode-internal` — Identify internal functions in traces.

   This will trace internal functions and decode stack parameters.

   Parameters stored in memory (such as bytes or arrays) are currently decoded only when a single function is matched, similarly to `--debug`, for performance reasons.
* `--dump <PATH>` — Dumps all debugger steps to file
* `--gas-report` — Print a gas report
* `--gas-snapshot-check <GAS_SNAPSHOT_CHECK>` — Check gas snapshots against previous runs

  Possible values: `true`, `false`

* `--gas-snapshot-emit <GAS_SNAPSHOT_EMIT>` — Enable/disable recording of gas snapshot results

  Possible values: `true`, `false`

* `--allow-failure` — Exit with code 0 even if a test fails
* `-s`, `--suppress-successful-traces` — Suppress successful test traces and show only traces for failures
* `--junit` — Output test results as JUnit XML report
* `--fail-fast` — Stop running tests after the first failure
* `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-l`, `--list` — List tests instead of running them
* `--fuzz-seed <FUZZ_SEED>` — Set seed used to generate randomness during your fuzz runs
* `--fuzz-runs <RUNS>`
* `--fuzz-timeout <TIMEOUT>` — Timeout for each fuzz run in seconds
* `--fuzz-input-file <FUZZ_INPUT_FILE>` — File to rerun fuzz failures from
* `--show-progress` — Show test execution progress
* `--rerun` — Re-run recorded test failures from last run. If no failure recorded then regular test run is performed
* `--summary` — Print test summary table
* `--detailed` — Print detailed test summary table
* `--match-test <REGEX>` — Only run test functions matching the specified regex pattern
* `--no-match-test <REGEX>` — Only run test functions that do not match the specified regex pattern
* `--match-contract <REGEX>` — Only run tests in contracts matching the specified regex pattern
* `--no-match-contract <REGEX>` — Only run tests in contracts that do not match the specified regex pattern
* `--match-path <GLOB>` — Only run tests in source files matching the specified glob pattern
* `--no-match-path <GLOB>` — Only run tests in source files that do not match the specified glob pattern
* `--no-match-coverage <REGEX>` — Only show coverage for files that do not match the specified regex pattern
* `-f`, `--fork-url <URL>` — Fetch state over a remote endpoint instead of starting from an empty state.

   If you want to fetch state from a specific block number, see --fork-block-number.
* `--fork-block-number <BLOCK>` — Fetch state from a specific block number over a remote endpoint.

   See --fork-url.
* `--fork-retries <RETRIES>` — Number of retries.

   See --fork-url.
* `--fork-retry-backoff <BACKOFF>` — Initial retry backoff on encountering errors.

   See --fork-url.
* `--no-storage-caching` — Explicitly disables the use of RPC caching.

   All storage slots are read entirely from the endpoint.

   This flag overrides the project's configuration file.

   See --fork-url.
* `--initial-balance <BALANCE>` — The initial balance of deployed test contracts
* `--sender <ADDRESS>` — The address which will be executing tests/scripts
* `--ffi` — Enable the FFI cheatcode
* `--always-use-create-2-factory` — Use the create 2 factory in all cases including tests and non-broadcasting scripts
* `--create2-deployer <ADDRESS>` — The CREATE2 deployer address to use, this will override the one in the config
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rpc-rate-limit` — Disables rate limiting for this node's provider.

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--code-size-limit <CODE_SIZE>` — EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By default, it is 0x6000 (~25kb)
* `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--gas-price <GAS_PRICE>` — The gas price
* `--block-base-fee-per-gas <FEE>` — The base fee in a block
* `--tx-origin <ADDRESS>` — The transaction origin
* `--block-coinbase <ADDRESS>` — The coinbase of the block
* `--block-timestamp <TIMESTAMP>` — The timestamp of the block
* `--block-number <BLOCK>` — The block number
* `--block-difficulty <DIFFICULTY>` — The block difficulty
* `--block-prevrandao <PREVRANDAO>` — The block prevrandao value. NOTE: Before merge this field was mix_hash
* `--block-gas-limit <GAS_LIMIT>` — The block gas limit
* `--memory-limit <MEMORY_LIMIT>` — The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG` result is thrown.

   The default is 128MiB.
* `--disable-block-gas-limit` — Whether to disable the block gas limit checks
* `--isolate` — Whether to enable isolation of calls. In isolation mode all top-level calls are executed as a separate transaction in a separate EVM context, enabling more precise gas accounting and transaction state changes
* `--odyssey` — Whether to enable Odyssey features
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.



## `forge bind`

Generate Rust bindings for smart contracts

**Usage:** `forge bind [OPTIONS]`

###### **Options:**

* `-b`, `--bindings-path <PATH>` — Path to where the contract artifacts are stored
* `--select <SELECT>` — Create bindings only for contracts whose names match the specified filter(s)
* `--select-all` — Explicitly generate bindings for all contracts

   By default all contracts ending with `Test` or `Script` are excluded.
* `--crate-name <NAME>` — The name of the Rust crate to generate.

   This should be a valid crates.io crate name, however, this is not currently validated by this command.

  Default value: `foundry-contracts`
* `--crate-version <VERSION>` — The version of the Rust crate to generate.

   This should be a standard semver version string, however, this is not currently validated by this command.

  Default value: `0.1.0`
* `--crate-description <DESCRIPTION>` — The description of the Rust crate to generate.

   This will be added to the package.description field in Cargo.toml.

  Default value: ``
* `--crate-license <LICENSE>` — The license of the Rust crate to generate.

   This will be added to the package.license field in Cargo.toml.

  Default value: ``
* `--module` — Generate the bindings as a module instead of a crate
* `--overwrite` — Overwrite existing generated bindings.

   By default, the command will check that the bindings are correct, and then exit. If --overwrite is passed, it will instead delete and overwrite the bindings.
* `--single-file` — Generate bindings as a single file
* `--skip-cargo-toml` — Skip Cargo.toml consistency checks
* `--skip-build` — Skips running forge build before generating binding
* `--skip-extra-derives` — Don't add any additional derives to generated bindings
* `--alloy-version <ALLOY_VERSION>` — Specify the `alloy` version on Crates
* `--alloy-rev <ALLOY_REV>` — Specify the `alloy` revision on GitHub
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge build`

Build the project's smart contracts

**Usage:** `forge build [OPTIONS] [PATHS]...`

###### **Arguments:**

* `<PATHS>` — Build source files from specified paths

###### **Options:**

* `--names` — Print compiled contract names
* `--sizes` — Print compiled contract sizes. Constructor argument length is not included in the calculation of initcode size
* `--ignore-eip-3860` — Ignore initcode contract bytecode size limit introduced by EIP-3860
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.



## `forge clone`

Clone a contract from Etherscan

**Usage:** `forge clone [OPTIONS] <ADDRESS> [PATH]`

###### **Arguments:**

* `<ADDRESS>` — The contract address to clone
* `<PATH>` — The root directory of the cloned project

  Default value: `.`

###### **Options:**

* `--no-remappings-txt` — Do not generate the remappings.txt file. Instead, keep the remappings in the configuration
* `--keep-directory-structure` — Keep the original directory structure collected from Etherscan.

   If this flag is set, the directory structure of the cloned project will be kept as is. By default, the directory structure is re-orgnized to increase the readability, but may risk some compilation failures.
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--shallow` — Perform shallow clones instead of deep ones.

   Improves performance and reduces disk usage, but prevents switching branches or tags.
* `--no-git` — Install without adding the dependency as a submodule
* `--commit` — Create a commit after installing the dependencies



## `forge update`

Update one or multiple dependencies.

If no arguments are provided, then all dependencies are updated.

**Usage:** `forge update [OPTIONS] [DEPENDENCIES]...`

###### **Arguments:**

* `<DEPENDENCIES>` — The dependencies you want to update

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-f`, `--force` — Override the up-to-date check
* `-r`, `--recursive` — Recursively update submodules



## `forge install`

Install one or multiple dependencies.

If no arguments are provided, then existing dependencies will be installed.

**Usage:** `forge forge install [OPTIONS] [DEPENDENCIES]...
    forge install [OPTIONS] <github username>/<github project>@<tag>...
    forge install [OPTIONS] <alias>=<github username>/<github project>@<tag>...
    forge install [OPTIONS] <https://<github token>@git url>...)]
    forge install [OPTIONS] <https:// git url>...`

###### **Arguments:**

* `<DEPENDENCIES>` — The dependencies to install.

   A dependency can be a raw URL, or the path to a GitHub repository.

   Additionally, a ref can be provided by adding @ to the dependency path.

   A ref can be: - A branch: master - A tag: v1.2.3 - A commit: 8e8128

   For exact match, a ref can be provided with `@tag=`, `@branch=` or `@rev=` prefix.

   Target installation directory can be added via `<alias>=` suffix. The dependency will installed to `lib/<alias>`.

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--shallow` — Perform shallow clones instead of deep ones.

   Improves performance and reduces disk usage, but prevents switching branches or tags.
* `--no-git` — Install without adding the dependency as a submodule
* `--commit` — Create a commit after installing the dependencies



## `forge remove`

Remove one or multiple dependencies

**Usage:** `forge remove [OPTIONS] <DEPENDENCIES>...`

###### **Arguments:**

* `<DEPENDENCIES>` — The dependencies you want to remove

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-f`, `--force` — Override the up-to-date check



## `forge remappings`

Get the automatically inferred remappings for the project

**Usage:** `forge remappings [OPTIONS]`

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--pretty` — Pretty-print the remappings, grouping each of them by context



## `forge verify-contract`

Verify smart contracts on Etherscan

**Usage:** `forge verify-contract [OPTIONS] <ADDRESS> [CONTRACT]`

###### **Arguments:**

* `<ADDRESS>` — The address of the contract to verify
* `<CONTRACT>` — The contract identifier in the form `<path>:<contractname>`

###### **Options:**

* `--constructor-args <ARGS>` — The ABI-encoded constructor arguments
* `--constructor-args-path <PATH>` — The path to a file containing the constructor arguments
* `--guess-constructor-args` — Try to extract constructor arguments from on-chain creation code
* `--compiler-version <VERSION>` — The `solc` version to use to build the smart contract
* `--compilation-profile <PROFILE_NAME>` — The compilation profile to use to build the smart contract
* `--num-of-optimizations <NUM>` — The number of optimization runs used to build the smart contract
* `--flatten` — Flatten the source code before verifying
* `-f`, `--force` — Do not compile the flattened smart contract before verifying (if --flatten is passed)
* `--skip-is-verified-check` — Do not check if the contract is already verified before verifying
* `--watch` — Wait for verification result after submission
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--show-standard-json-input` — Prints the standard json compiler input.

   The standard json compiler input can be used to manually submit contract verification in the browser.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--evm-version <EVM_VERSION>` — The EVM version to use.

   Overrides the version specified in the config.
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `--retries <RETRIES>` — Number of attempts for retrying verification

  Default value: `5`
* `--delay <DELAY>` — Optional delay to apply in between verification attempts, in seconds

  Default value: `5`
* `--verifier <VERIFIER>` — The contract verification provider to use

  Default value: `sourcify`

  Possible values:
  - `etherscan`
  - `sourcify`
  - `blockscout`
  - `oklink`
  - `custom`:
    Custom verification provider, requires compatibility with the Etherscan API

* `--verifier-api-key <VERIFIER_API_KEY>` — The verifier API KEY, if using a custom provider
* `--verifier-url <VERIFIER_URL>` — The verifier URL, if using a custom provider



## `forge verify-check`

Check verification status on Etherscan

**Usage:** `forge verify-check [OPTIONS] <ID>`

###### **Arguments:**

* `<ID>` — The verification ID.

   For Etherscan - Submission GUID.

   For Sourcify - Contract Address.

###### **Options:**

* `--retries <RETRIES>` — Number of attempts for retrying verification

  Default value: `5`
* `--delay <DELAY>` — Optional delay to apply in between verification attempts, in seconds

  Default value: `5`
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--verifier <VERIFIER>` — The contract verification provider to use

  Default value: `sourcify`

  Possible values:
  - `etherscan`
  - `sourcify`
  - `blockscout`
  - `oklink`
  - `custom`:
    Custom verification provider, requires compatibility with the Etherscan API

* `--verifier-api-key <VERIFIER_API_KEY>` — The verifier API KEY, if using a custom provider
* `--verifier-url <VERIFIER_URL>` — The verifier URL, if using a custom provider



## `forge verify-bytecode`

Verify the deployed bytecode against its source on Etherscan

**Usage:** `forge verify-bytecode [OPTIONS] <ADDRESS> <CONTRACT>`

###### **Arguments:**

* `<ADDRESS>` — The address of the contract to verify
* `<CONTRACT>` — The contract identifier in the form `<path>:<contractname>`

###### **Options:**

* `--block <BLOCK>` — The block at which the bytecode should be verified
* `--constructor-args <ARGS>` — The constructor args to generate the creation code
* `--encoded-constructor-args <HEX>` — The ABI-encoded constructor arguments
* `--constructor-args-path <PATH>` — The path to a file containing the constructor arguments
* `-r`, `--rpc-url <RPC_URL>` — The rpc url to use for verification
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--verifier <VERIFIER>` — The contract verification provider to use

  Default value: `sourcify`

  Possible values:
  - `etherscan`
  - `sourcify`
  - `blockscout`
  - `oklink`
  - `custom`:
    Custom verification provider, requires compatibility with the Etherscan API

* `--verifier-api-key <VERIFIER_API_KEY>` — The verifier API KEY, if using a custom provider
* `--verifier-url <VERIFIER_URL>` — The verifier URL, if using a custom provider
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--ignore <BYTECODE_TYPE>` — Ignore verification for creation or runtime bytecode

  Possible values: `creation`, `runtime`




## `forge create`

Deploy a smart contract

**Usage:** `forge create [OPTIONS] <CONTRACT>`

###### **Arguments:**

* `<CONTRACT>` — The contract identifier in the form `<path>:<contractname>`

###### **Options:**

* `--constructor-args <ARGS>` — The constructor arguments
* `--constructor-args-path <PATH>` — The path to a file containing the constructor arguments
* `--broadcast` — Broadcast the transaction
* `--verify` — Verify contract after creation
* `--unlocked` — Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender
* `--show-standard-json-input` — Prints the standard json compiler input if `--verify` is provided.

   The standard json compiler input can be used to manually submit contract verification in the browser.
* `--timeout <TIMEOUT>` — Timeout to use for broadcasting transactions
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet
* `--verifier <VERIFIER>` — The contract verification provider to use

  Default value: `sourcify`

  Possible values:
  - `etherscan`
  - `sourcify`
  - `blockscout`
  - `oklink`
  - `custom`:
    Custom verification provider, requires compatibility with the Etherscan API

* `--verifier-api-key <VERIFIER_API_KEY>` — The verifier API KEY, if using a custom provider
* `--verifier-url <VERIFIER_URL>` — The verifier URL, if using a custom provider
* `--retries <RETRIES>` — Number of attempts for retrying verification

  Default value: `5`
* `--delay <DELAY>` — Optional delay to apply in between verification attempts, in seconds

  Default value: `5`



## `forge init`

Create a new Forge project

**Usage:** `forge init [OPTIONS] [PATH]`

###### **Arguments:**

* `<PATH>` — The root directory of the new project

  Default value: `.`

###### **Options:**

* `-t`, `--template <TEMPLATE>` — The template to start from
* `-b`, `--branch <BRANCH>` — Branch argument that can only be used with template option. If not specified, the default branch is used
* `--offline` — Do not install dependencies from the network
* `--force` — Create the project even if the specified root directory is not empty
* `--vscode` — Create a .vscode/settings.json file with Solidity settings, and generate a remappings.txt file
* `--shallow` — Perform shallow clones instead of deep ones.

   Improves performance and reduces disk usage, but prevents switching branches or tags.
* `--no-git` — Install without adding the dependency as a submodule
* `--commit` — Create a commit after installing the dependencies



## `forge completions`

Generate shell completions script

**Usage:** `forge completions <SHELL>`

###### **Arguments:**

* `<SHELL>`

  Possible values: `bash`, `elvish`, `fish`, `powershell`, `zsh`




## `forge generate-fig-spec`

Generate Fig autocompletion spec

**Usage:** `forge generate-fig-spec`



## `forge clean`

Remove the build artifacts and cache directories

**Usage:** `forge clean [OPTIONS]`

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.



## `forge cache`

Manage the Foundry cache

**Usage:** `forge cache <COMMAND>`

###### **Subcommands:**

* `clean` — Cleans cached data from the global foundry directory
* `ls` — Shows cached data from the global foundry directory



## `forge cache clean`

Cleans cached data from the global foundry directory

**Usage:** `forge cache clean [OPTIONS] [CHAINS]...`

###### **Arguments:**

* `<CHAINS>` — The chains to clean the cache for.

   Can also be "all" to clean all chains.

  Default value: `all`

###### **Options:**

* `-b`, `--blocks <BLOCKS>` — The blocks to clean the cache for
* `--etherscan` — Whether to clean the Etherscan cache



## `forge cache ls`

Shows cached data from the global foundry directory

**Usage:** `forge cache ls [CHAINS]...`

###### **Arguments:**

* `<CHAINS>` — The chains to list the cache for.

   Can also be "all" to list all chains.

  Default value: `all`



## `forge snapshot`

Create a gas snapshot of each test's gas usage

**Usage:** `forge snapshot [OPTIONS] [PATH]`

###### **Arguments:**

* `<PATH>` — The contract file you want to test, it's a shortcut for --match-path

###### **Options:**

* `--diff <SNAPSHOT_FILE>` — Output a diff against a pre-existing gas snapshot.

   By default, the comparison is done with .gas-snapshot.
* `--check <SNAPSHOT_FILE>` — Compare against a pre-existing gas snapshot, exiting with code 1 if they do not match.

   Outputs a diff if the gas snapshots do not match.

   By default, the comparison is done with .gas-snapshot.
* `--snap <FILE>` — Output file for the gas snapshot

  Default value: `.gas-snapshot`
* `--tolerance <SNAPSHOT_THRESHOLD>` — Tolerates gas deviations up to the specified percentage
* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores
* `--debug` — Run a single test in the debugger.

   The matching test will be opened in the debugger regardless of the outcome of the test.

   If the matching test is a fuzz test, then it will open the debugger on the first failure case. If the fuzz test does not fail, it will open the debugger on the last fuzz case.
* `--flamegraph` — Generate a flamegraph for a single test. Implies `--decode-internal`.

   A flame graph is used to visualize which functions or operations within the smart contract are consuming the most gas overall in a sorted manner.
* `--flamechart` — Generate a flamechart for a single test. Implies `--decode-internal`.

   A flame chart shows the gas usage over time, illustrating when each function is called (execution order) and how much gas it consumes at each point in the timeline.
* `--decode-internal` — Identify internal functions in traces.

   This will trace internal functions and decode stack parameters.

   Parameters stored in memory (such as bytes or arrays) are currently decoded only when a single function is matched, similarly to `--debug`, for performance reasons.
* `--dump <PATH>` — Dumps all debugger steps to file
* `--gas-report` — Print a gas report
* `--gas-snapshot-check <GAS_SNAPSHOT_CHECK>` — Check gas snapshots against previous runs

  Possible values: `true`, `false`

* `--gas-snapshot-emit <GAS_SNAPSHOT_EMIT>` — Enable/disable recording of gas snapshot results

  Possible values: `true`, `false`

* `--allow-failure` — Exit with code 0 even if a test fails
* `-s`, `--suppress-successful-traces` — Suppress successful test traces and show only traces for failures
* `--junit` — Output test results as JUnit XML report
* `--fail-fast` — Stop running tests after the first failure
* `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-l`, `--list` — List tests instead of running them
* `--fuzz-seed <FUZZ_SEED>` — Set seed used to generate randomness during your fuzz runs
* `--fuzz-runs <RUNS>`
* `--fuzz-timeout <TIMEOUT>` — Timeout for each fuzz run in seconds
* `--fuzz-input-file <FUZZ_INPUT_FILE>` — File to rerun fuzz failures from
* `--show-progress` — Show test execution progress
* `--rerun` — Re-run recorded test failures from last run. If no failure recorded then regular test run is performed
* `--summary` — Print test summary table
* `--detailed` — Print detailed test summary table
* `--match-test <REGEX>` — Only run test functions matching the specified regex pattern
* `--no-match-test <REGEX>` — Only run test functions that do not match the specified regex pattern
* `--match-contract <REGEX>` — Only run tests in contracts matching the specified regex pattern
* `--no-match-contract <REGEX>` — Only run tests in contracts that do not match the specified regex pattern
* `--match-path <GLOB>` — Only run tests in source files matching the specified glob pattern
* `--no-match-path <GLOB>` — Only run tests in source files that do not match the specified glob pattern
* `--no-match-coverage <REGEX>` — Only show coverage for files that do not match the specified regex pattern
* `-f`, `--fork-url <URL>` — Fetch state over a remote endpoint instead of starting from an empty state.

   If you want to fetch state from a specific block number, see --fork-block-number.
* `--fork-block-number <BLOCK>` — Fetch state from a specific block number over a remote endpoint.

   See --fork-url.
* `--fork-retries <RETRIES>` — Number of retries.

   See --fork-url.
* `--fork-retry-backoff <BACKOFF>` — Initial retry backoff on encountering errors.

   See --fork-url.
* `--no-storage-caching` — Explicitly disables the use of RPC caching.

   All storage slots are read entirely from the endpoint.

   This flag overrides the project's configuration file.

   See --fork-url.
* `--initial-balance <BALANCE>` — The initial balance of deployed test contracts
* `--sender <ADDRESS>` — The address which will be executing tests/scripts
* `--ffi` — Enable the FFI cheatcode
* `--always-use-create-2-factory` — Use the create 2 factory in all cases including tests and non-broadcasting scripts
* `--create2-deployer <ADDRESS>` — The CREATE2 deployer address to use, this will override the one in the config
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rpc-rate-limit` — Disables rate limiting for this node's provider.

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--code-size-limit <CODE_SIZE>` — EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By default, it is 0x6000 (~25kb)
* `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--gas-price <GAS_PRICE>` — The gas price
* `--block-base-fee-per-gas <FEE>` — The base fee in a block
* `--tx-origin <ADDRESS>` — The transaction origin
* `--block-coinbase <ADDRESS>` — The coinbase of the block
* `--block-timestamp <TIMESTAMP>` — The timestamp of the block
* `--block-number <BLOCK>` — The block number
* `--block-difficulty <DIFFICULTY>` — The block difficulty
* `--block-prevrandao <PREVRANDAO>` — The block prevrandao value. NOTE: Before merge this field was mix_hash
* `--block-gas-limit <GAS_LIMIT>` — The block gas limit
* `--memory-limit <MEMORY_LIMIT>` — The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG` result is thrown.

   The default is 128MiB.
* `--disable-block-gas-limit` — Whether to disable the block gas limit checks
* `--isolate` — Whether to enable isolation of calls. In isolation mode all top-level calls are executed as a separate transaction in a separate EVM context, enabling more precise gas accounting and transaction state changes
* `--odyssey` — Whether to enable Odyssey features
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.
* `--asc` — Sort results by gas used (ascending)
* `--desc` — Sort results by gas used (descending)
* `--min <MIN_GAS>` — Only include tests that used more gas that the given amount
* `--max <MAX_GAS>` — Only include tests that used less gas that the given amount



## `forge config`

Display the current config

**Usage:** `forge config [OPTIONS] [PATHS]...`

###### **Arguments:**

* `<PATHS>` — Build source files from specified paths

###### **Options:**

* `--basic` — Print only a basic set of the currently set config values
* `--fix` — Attempt to fix any configuration warnings
* `--names` — Print compiled contract names
* `--sizes` — Print compiled contract sizes. Constructor argument length is not included in the calculation of initcode size
* `--ignore-eip-3860` — Ignore initcode contract bytecode size limit introduced by EIP-3860
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.
* `-f`, `--fork-url <URL>` — Fetch state over a remote endpoint instead of starting from an empty state.

   If you want to fetch state from a specific block number, see --fork-block-number.
* `--fork-block-number <BLOCK>` — Fetch state from a specific block number over a remote endpoint.

   See --fork-url.
* `--fork-retries <RETRIES>` — Number of retries.

   See --fork-url.
* `--fork-retry-backoff <BACKOFF>` — Initial retry backoff on encountering errors.

   See --fork-url.
* `--no-storage-caching` — Explicitly disables the use of RPC caching.

   All storage slots are read entirely from the endpoint.

   This flag overrides the project's configuration file.

   See --fork-url.
* `--initial-balance <BALANCE>` — The initial balance of deployed test contracts
* `--sender <ADDRESS>` — The address which will be executing tests/scripts
* `--ffi` — Enable the FFI cheatcode
* `--always-use-create-2-factory` — Use the create 2 factory in all cases including tests and non-broadcasting scripts
* `--create2-deployer <ADDRESS>` — The CREATE2 deployer address to use, this will override the one in the config
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rpc-rate-limit` — Disables rate limiting for this node's provider.

   See also --fork-url and <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--code-size-limit <CODE_SIZE>` — EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By default, it is 0x6000 (~25kb)
* `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--gas-price <GAS_PRICE>` — The gas price
* `--block-base-fee-per-gas <FEE>` — The base fee in a block
* `--tx-origin <ADDRESS>` — The transaction origin
* `--block-coinbase <ADDRESS>` — The coinbase of the block
* `--block-timestamp <TIMESTAMP>` — The timestamp of the block
* `--block-number <BLOCK>` — The block number
* `--block-difficulty <DIFFICULTY>` — The block difficulty
* `--block-prevrandao <PREVRANDAO>` — The block prevrandao value. NOTE: Before merge this field was mix_hash
* `--block-gas-limit <GAS_LIMIT>` — The block gas limit
* `--memory-limit <MEMORY_LIMIT>` — The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG` result is thrown.

   The default is 128MiB.
* `--disable-block-gas-limit` — Whether to disable the block gas limit checks
* `--isolate` — Whether to enable isolation of calls. In isolation mode all top-level calls are executed as a separate transaction in a separate EVM context, enabling more precise gas accounting and transaction state changes
* `--odyssey` — Whether to enable Odyssey features



## `forge flatten`

Flatten a source file and all of its imports into one file

**Usage:** `forge flatten [OPTIONS] <PATH>`

###### **Arguments:**

* `<PATH>` — The path to the contract to flatten

###### **Options:**

* `-o`, `--output <PATH>` — The path to output the flattened contract.

   If not specified, the flattened contract will be output to stdout.
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge fmt`

Format Solidity source files

**Usage:** `forge fmt [OPTIONS] [PATH]...`

###### **Arguments:**

* `<PATH>` — Path to the file, directory or '-' to read from stdin

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--check` — Run in 'check' mode.

   Exits with 0 if input is formatted correctly. Exits with 1 if formatting is required.
* `-r`, `--raw` — In 'check' and stdin modes, outputs raw formatted code instead of the diff
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.



## `forge inspect`

Get specialized information about a smart contract

**Usage:** `forge inspect [OPTIONS] <CONTRACT> <FIELD>`

###### **Arguments:**

* `<CONTRACT>` — The identifier of the contract to inspect in the form `(<path>:)?<contractname>`
* `<FIELD>` — The contract artifact field to inspect

  Possible values: `abi`, `bytecode`, `deployedBytecode`, `assembly`, `legacyAssembly`, `assemblyOptimized`, `methodIdentifiers`, `gasEstimates`, `storageLayout`, `devdoc`, `ir`, `irOptimized`, `metadata`, `userdoc`, `ewasm`, `errors`, `events`, `eof`, `eof-init`


###### **Options:**

* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file
* `-s`, `--strip-yul-comments` — Whether to remove comments when inspecting `ir` and `irOptimized` artifact fields



## `forge tree`

Display a tree visualization of the project's dependency graph

**Usage:** `forge tree [OPTIONS]`

###### **Options:**

* `--no-dedupe` — Do not de-duplicate (repeats all shared dependencies)
* `--charset <CHARSET>` — Character set to use in output.

   [possible values: utf8, ascii]

  Default value: `utf8`
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge geiger`

Detects usage of unsafe cheat codes in a project and its dependencies

**Usage:** `forge geiger [OPTIONS] [PATH]...`

###### **Arguments:**

* `<PATH>` — Paths to files or directories to detect

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `--ignore <PATH>` — Globs to ignore



## `forge doc`

Generate documentation for the project

**Usage:** `forge doc [OPTIONS]`

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-o`, `--out <PATH>` — The doc's output path.

   By default, it is the `docs/` in project root.
* `-b`, `--build` — Build the `mdbook` from generated files
* `-s`, `--serve` — Serve the documentation
* `--open` — Open the documentation in a browser after serving
* `--hostname <HOSTNAME>` — Hostname for serving documentation
* `-w`, `--watch <PATH>` — Watch the given files or directories for changes.

   If no paths are provided, the source and test directories of the project are watched.
* `--no-restart` — Do not restart the command while it's still running
* `--run-all` — Explicitly re-run all tests when a change is made.

   By default, only the tests of the last modified test file are executed.
* `--watch-delay <DELAY>` — File update debounce delay.

   During the delay, incoming change events are accumulated and only once the delay has passed, is an action taken. Note that this does not mean a command will be started: if --no-restart is given and a command is already running, the outcome of the action will be to do nothing.

   Defaults to 50ms. Parses as decimal seconds by default, but using an integer with the `ms` suffix may be more convenient.

   When using --poll mode, you'll want a larger duration, or risk overloading disk I/O.
* `-p`, `--port <PORT>` — Port for serving documentation
* `--deployments <DEPLOYMENTS>` — The relative path to the `hardhat-deploy` or `forge-deploy` artifact directory. Leave blank for default
* `-i`, `--include-libraries` — Whether to create docs for external libraries



## `forge selectors`

Function selector utilities

**Usage:** `forge selectors <COMMAND>`

###### **Subcommands:**

* `collision` — Check for selector collisions between contracts
* `upload` — Upload selectors to registry
* `list` — List selectors from current workspace
* `find` — Find if a selector is present in the project
* `cache` — Cache project selectors (enables trace with local contracts functions and events)



## `forge selectors collision`

Check for selector collisions between contracts

**Usage:** `forge selectors collision [OPTIONS] <FIRST_CONTRACT> <SECOND_CONTRACT>`

###### **Arguments:**

* `<FIRST_CONTRACT>` — The first of the two contracts for which to look selector collisions for, in the form `(<path>:)?<contractname>`
* `<SECOND_CONTRACT>` — The second of the two contracts for which to look selector collisions for, in the form `(<path>:)?<contractname>`

###### **Options:**

* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge selectors upload`

Upload selectors to registry

**Usage:** `forge selectors upload [OPTIONS] [CONTRACT]`

###### **Arguments:**

* `<CONTRACT>` — The name of the contract to upload selectors for. Can also be in form of `path:contract name`

###### **Options:**

* `--all` — Upload selectors for all contracts in the project
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge selectors list`

List selectors from current workspace

**Usage:** `forge selectors list [OPTIONS] [CONTRACT]`

###### **Arguments:**

* `<CONTRACT>` — The name of the contract to list selectors for.

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge selectors find`

Find if a selector is present in the project

**Usage:** `forge selectors find [OPTIONS] <SELECTOR>`

###### **Arguments:**

* `<SELECTOR>` — The selector to search for (with or without 0x prefix)

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge selectors cache`

Cache project selectors (enables trace with local contracts functions and events)

**Usage:** `forge selectors cache [OPTIONS]`

###### **Options:**

* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge generate`

Generate scaffold files

**Usage:** `forge generate <COMMAND>`

###### **Subcommands:**

* `test` — Scaffolds test file for given contract



## `forge generate test`

Scaffolds test file for given contract

**Usage:** `forge generate test --contract-name <CONTRACT_NAME>`

###### **Options:**

* `-c`, `--contract-name <CONTRACT_NAME>` — Contract name for test generation



## `forge compiler`

Compiler utilities

**Usage:** `forge compiler <COMMAND>`

###### **Subcommands:**

* `resolve` — Retrieves the resolved version(s) of the compiler within the project



## `forge compiler resolve`

Retrieves the resolved version(s) of the compiler within the project

**Usage:** `forge compiler resolve [OPTIONS]`

###### **Options:**

* `-r`, `--root <PATH>` — The root directory
* `-s`, `--skip <REGEX>` — Skip files that match the given regex pattern



## `forge soldeer`

Soldeer dependency manager

**Usage:** `forge Native Solidity Package Manager, `run forge soldeer [COMMAND] --help` for more details`

###### **Subcommands:**

* `init` — Convert a Foundry project to use Soldeer
* `install` — Install a dependency
* `update` — Update dependencies by reading the config file
* `login` — Log into the central repository to push packages
* `push` — Push a dependency to the repository
* `uninstall` — Uninstall a dependency
* `version` — Display the version of Soldeer



## `forge soldeer init`

Convert a Foundry project to use Soldeer

**Usage:** `forge soldeer init [OPTIONS]`

For more information, read the README.md

###### **Options:**

* `--clean` — Clean the Foundry project by removing .gitmodules and the lib directory

  Default value: `false`
* `--config-location <CONFIG_LOCATION>` — Specify the config location.

   This prevents prompting the user if the automatic detection can't determine the config location.

  Possible values: `foundry`, `soldeer`




## `forge soldeer install`

Install a dependency

If used with arguments, a dependency will be added to the configuration. When used without argument, installs all dependencies that are missing.

Examples:
- Install all: soldeer install
- Add from registry: soldeer install lib_name~2.3.0
- Add with custom URL: soldeer install lib_name~2.3.0 --url https://foo.bar/lib.zip
- Add with git: soldeer install lib_name~2.3.0 --git git@github.com:foo/bar.git
- Add with git (commit): soldeer install lib_name~2.3.0 --git git@github.com:foo/bar.git --rev 05f218fb6617932e56bf5388c3b389c3028a7b73
- Add with git (tag): soldeer install lib_name~2.3.0 --git git@github.com:foo/bar.git --tag v2.3.0
- Add with git (branch): soldeer install lib_name~2.3.0 --git git@github.com:foo/bar.git --branch feature/baz

**Usage:** `forge soldeer install [OPTIONS] [DEPENDENCY~VERSION]`

For more information, read the README.md

###### **Arguments:**

* `<DEPENDENCY~VERSION>` — The dependency name and version, separated by a tilde. The version is always required.

   If not present, this command will install all dependencies which are missing.

###### **Options:**

* `--url <ZIP_URL>` — The URL to the dependency zip file.

   Example: https://my-domain/dep.zip
* `--git <GIT_URL>` — The URL to the dependency repository.

   Example: git@github.com:foo/bar.git
* `--rev <REV>` — A Git commit hash
* `--tag <TAG>` — A Git tag
* `--branch <BRANCH>` — A Git branch
* `-g`, `--regenerate-remappings` — If set, this command will delete the existing remappings and re-create them

  Default value: `false`
* `-d`, `--recursive-deps` — If set, this command will install dependencies recursively (via git submodules or via soldeer)

  Default value: `false`
* `--clean` — Perform a clean install by re-installing all dependencies

  Default value: `false`
* `--config-location <CONFIG_LOCATION>` — Specify the config location without prompting.

   This prevents prompting the user if the automatic detection can't determine the config location.

  Possible values: `foundry`, `soldeer`




## `forge soldeer update`

Update dependencies by reading the config file

**Usage:** `forge soldeer update [OPTIONS]`

For more information, read the README.md

###### **Options:**

* `-g`, `--regenerate-remappings` — If set, this command will delete the existing remappings and re-create them

  Default value: `false`
* `-d`, `--recursive-deps` — If set, this command will install the dependencies recursively (via submodules or via soldeer)

  Default value: `false`
* `--config-location <CONFIG_LOCATION>` — Specify the config location without prompting.

   This prevents prompting the user if the automatic detection can't determine the config location.

  Possible values: `foundry`, `soldeer`




## `forge soldeer login`

Log into the central repository to push packages

The credentials are saved by default into ~/.soldeer. If you want to overwrite that location, use the SOLDEER_LOGIN_FILE env var.

**Usage:** `forge soldeer login [OPTIONS]`

For more information, read the README.md

###### **Options:**

* `--email <EMAIL>` — Specify the email without prompting
* `--password <PASSWORD>` — Specify the password without prompting



## `forge soldeer push`

Push a Dependency to the Repository

Examples:
- Current directory: soldeer push mypkg~0.1.0
- Custom directory: soldeer push mypkg~0.1.0 /path/to/dep
- Dry run: soldeer push mypkg~0.1.0 --dry-run

To ignore certain files, create a `.soldeerignore` file in the root of the project and add the files you want to ignore. The `.soldeerignore` uses the same syntax as `.gitignore`.

**Usage:** `forge soldeer push [OPTIONS] <DEPENDENCY>~<VERSION> [PATH]`

For more information, read the README.md

###### **Arguments:**

* `<DEPENDENCY>~<VERSION>` — The dependency name and version, separated by a tilde.

   This should always be used when you want to push a dependency to the central repository: `<https://soldeer.xyz>`.
* `<PATH>` — Use this if the package you want to push is not in the current directory.

   Example: `soldeer push mypkg~0.1.0 /path/to/dep`.

###### **Options:**

* `-d`, `--dry-run` — If set, does not publish the package but generates a zip file that can be inspected

  Default value: `false`
* `--skip-warnings` — Use this if you want to skip the warnings that can be triggered when trying to push dotfiles like .env

  Default value: `false`



## `forge soldeer uninstall`

Uninstall a dependency

**Usage:** `forge soldeer uninstall <DEPENDENCY>`

For more information, read the README.md

###### **Arguments:**

* `<DEPENDENCY>` — The dependency name. Specifying a version is not necessary



## `forge soldeer version`

Display the version of Soldeer

**Usage:** `forge soldeer version`



## `forge eip712`

Generate EIP-712 struct encodings for structs from a given file

**Usage:** `forge eip712 [OPTIONS] <PATH>`

###### **Arguments:**

* `<PATH>` — The path to the file from which to read struct definitions

###### **Options:**

* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `forge bind-json`

Generate bindings for serialization/deserialization of project structs via JSON cheatcodes

**Usage:** `forge bind-json [OPTIONS] [PATH]`

###### **Arguments:**

* `<PATH>` — The path to write bindings to

###### **Options:**

* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



<hr/>

<small><i>
    This document was generated automatically by
    <a href="https://crates.io/crates/clap-markdown"><code>clap-markdown</code></a>.
</i></small>

