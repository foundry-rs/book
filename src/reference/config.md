## Config Reference

Foundry's configuration system allows you to configure its tools.

### Profiles

Configuration can be arbitrarily namespaced into profiles. The default profile is named `default`, and all other profiles inherit values from this profile. Profiles are defined in the `profile` map.

To add a profile named `local`, you would add:

```toml
[profile.local]
```

You can select the profile to use by setting the `FOUNDRY_PROFILE` environment variable.

### Global configuration

You can create a `foundry.toml` file in your home folder to configure Foundry globally.

### Environment variables

Configuration can be overriden with `FOUNDRY_` and `DAPP_` prefixed environment variables.

### Configuration format

Configuration files are written in the [TOML format](https://toml.io), with simple key-value pairs inside of sections.

This page describes each configuration key in detail. To see the default values, either refer to the specific key in this document, or see the [default config](/static/config.default.toml).

### Configuration keys

This section documents all configuration keys. All configuration keys must live under a profile, such as `default`.

**Sections**

- [Project](#project)
- [Solidity compiler](#solidity-compiler)
  - [Solidity optimizer](#solidity-optimizer)
  - [Solidity model checker](#solidity-model-checker)
- [Tests](#tests)
- [Formatter](#formatter)
- [Etherscan](#etherscan)

#### Project

Configuration related to the project in general.

##### `src`

- Type: string
- Default: src
- Environment: `FOUNDRY_SRC` or `DAPP_SRC`

The path to the contract sources relative to the root of the project.

##### `test`

- Type: string
- Default: test
- Environment: `FOUNDRY_TEST` or `DAPP_TEST`

The path to the test contract sources relative to the root of the project.

##### `out`

- Type: string
- Default: out
- Environment: `FOUNDRY_OUT` or `DAPP_OUT`

The path to put contract artifacts in, relative to the root of the project.

##### `libs`

- Type: array of strings (paths)
- Default: lib
- Environment: `FOUNDRY_LIBS` or `DAPP_LIBS`

An array of paths that contain libraries, relative to the root of the project.

##### `cache`

- Type: boolean
- Default: true
- Environment: `FOUNDRY_CACHE` or `DAPP_CACHE`

Whether or not to enable caching. If enabled, the result of compiling sources, tests, and dependencies, are cached in `cache`.

##### `cache_path`

- Type: string
- Default: cache
- Environment: `FOUNDRY_CACHE_PATH` or `DAPP_CACHE_PATH`

The path to the cache, relative to the root of the project.

##### `broadcast`

- Type: string
- Default: broadcast

The path to the broadcast transaction logs, relative to the root of the project.

##### `force`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_FORCE` or `DAPP_FORCE`

Whether or not to perform a clean build, discarding the cache.

#### Solidity compiler

Configuration related to the behavior of the Solidity compiler.

##### `remappings`

- Type: array of strings (remappings)
- Default: none
- Environment: `FOUNDRY_REMAPPINGS` or `DAPP_REMAPPINGS`

An array of remappings in the following format: `<name>=<target>`.

A remapping _remaps_ Solidity imports to different directories. For example, the following remapping

```ignore
@openzeppelin/=node_modules/@openzeppelin/openzeppelin-contracts/
```

with an import like

```solidity
import "@openzeppelin/contracts/utils/Context.sol";
```

becomes

```solidity
import "node_modules/@openzeppelin/openzeppelin-contracts/contracts/utils/Context.sol";
```

##### `allow_paths`

- Type: array of strings (paths)
- Default: none
- Environment: `FOUNDRY_ALLOW_PATHS` or `DAPP_ALLOW_PATHS`

##### `libraries`

- Type: array of strings (libraries)
- Default: none
- Environment: `FOUNDRY_LIBRARIES` or `DAPP_LIBRARIES`

An array of libraries to link against in the following format: `<file>:<lib>:<address>`, for example: `src/MyLibrary.sol:MyLibrary:0xfD88CeE74f7D78697775aBDAE53f9Da1559728E4`.

##### `solc_version`

- Type: string (semver)
- Default: none
- Environment: `FOUNDRY_SOLC_VERSION` or `DAPP_SOLC_VERSION`

If specified, overrides the auto-detection system (more below) and uses a single Solidity compiler version for the project.

Only strict versions are supported (i.e. `0.8.11` is valid, but `^0.8.0` is not).

##### `auto_detect_solc`

- Type: boolean
- Default: true
- Environment: `FOUNDRY_AUTO_DETECT_SOLC` or `DAPP_AUTO_DETECT_SOLC`

If enabled, Foundry will automatically try to resolve appropriate Solidity compiler versions to compile your project.

This key is ignored if `solc_version` is set.

##### `offline`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_OFFLINE` or `DAPP_OFFLINE`

If enabled, Foundry will not attempt to download any missing solc versions.

If both `offline` and `auto-detect-solc` are set to `true`, the required version(s) of solc will be auto detected but any missing versions will _not_ be installed.

##### `ignored_error_codes`

- Type: array of integers
- Default: none for source, SPDX license identifiers and contract size for tests
- Environment: `FOUNDRY_IGNORED_ERROR_CODES` or `DAPP_IGNORED_ERROR_CODES`

An array of Solidity compiler error codes to ignore during build, such as warnings.

##### `evm_version`

- Type: string
- Default: london
- Environment: `FOUNDRY_EVM_VERSION` or `DAPP_EVM_VERSION`

The EVM version to use during tests. The value **must** be an EVM hardfork name, such as `london`, `byzantium`, etc.

##### `revert_strings`

- Type: string
- Default: default
- Environment: `FOUNDRY_REVERT_STRINGS` or `DAPP_REVERT_STRINGS`

Possible values are:

- `default` does not inject compiler-generated revert strings and keeps user-supplied ones.
- `strip` removes all revert strings (if possible, i.e. if literals are used) keeping side-effects.
- `debug` injects strings for compiler-generated internal reverts, implemented for ABI encoders V1 and V2 for now.
- `verboseDebug` even appends further information to user-supplied revert strings (not yet implemented).

##### `extra_output_files`

- Type: array of strings
- Default: none
- Environment: N/A

Extra output from the Solidity compiler that should be written to files in the artifacts directory.

Valid values are:

- `metadata`: Written as a `metadata.json` file in the artifacts directory
- `ir`: Written as a `.ir` file in the artifacts directory
- `irOptimized`: Written as a `.iropt` file in the artifacts directory
- `ewasm`: Written as a `.ewasm` file in the artifacts directory
- `evm.assembly`: Written as a `.asm` file in the artifacts directory

##### `extra_output`

- Type: array of strings
- Default: see below
- Environment: N/A

Extra output to include in the contract's artifact.

The following values are always set, since they're required by Forge:

```toml
extra_output = [
  "abi",
  "evm.bytecode",
  "evm.deployedBytecode",
  "evm.methodIdentifiers",
]
```

For a list of valid values, see the [Solidity docs][output-desc].

##### `bytecode_hash`

- Type: string
- Default: ipfs
- Environment: `FOUNDRY_BYTECODE_HASH` or `DAPP_BYTECODE_HASH`

Determines the hash method for the metadata hash that is appended to the bytecode.

Valid values are:

- ipfs (default)
- bzzr1
- none

##### `sparse_mode`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_SPARSE_MODE` or `DAPP_SPARSE_MODE`

Enables [sparse mode](./forge/forge-build.md#sparse-mode-experimental) for builds.

#### Solidity optimizer

Configuration related to the Solidity optimizer.

##### `optimizer`

- Type: boolean
- Default: true
- Environment: `FOUNDRY_OPTIMIZER` or `DAPP_OPTIMIZER`

Whether or not to enable the Solidity optimizer.

##### `optimizer_runs`

- Type: integer
- Default: 200
- Environment: `FOUNDRY_OPTIMIZER_RUNS` or `DAPP_OPTIMIZER_RUNS`

The amount of optimizer runs to perform.

##### `via_ir`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_VIA_IR` or `DAPP_VIA_IR`

If set to true, changes compilation pipeline to go through the new IR optimizer.

##### `[optimizer_details]`

The optimizer details section is used to tweak how the Solidity optimizer behaves. There are several configurable values in this section (each of them are booleans):

- `peephole`
- `inliner`
- `jumpdest_remover`
- `order_literals`
- `deduplicate`
- `cse`
- `constant_optimizer`
- `yul`

Refer to the Solidity [compiler input description](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) for the default values.

##### `[optimizer_details.yul_details]`

The Yul details subsection of the optimizer details section is used to tweak how the new IR optimizer behaves. There are two configuration values:

- `stack_allocation`: Tries to improve the allocation of stack slots by freeing them up earlier.
- `optimizer_steps`: Selects the optimizer steps to be applied.

Refer to the Solidity [compiler input description](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) for the default values.

> ℹ️ **Note**  
> If you encounter compiler errors when using `via_ir`, explicitly enable the legacy `optimizer` and leave `optimizer_steps` as an empty string

#### Solidity model checker

The Solidity model checker is a built-in opt-in module that is available in Solidity compilers for OSX and Linux. Learn more about the model checker in the [Solidity compiler documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#tutorial)

> ℹ️ **Note**  
> The model checker requires `z3` version 4.8.8 or 4.8.14 on Linux.

The model checker settings are configured in the `[model_checker]` section of the configuration.

The model checker will run when `forge build` is invoked, and any findings will show up as warnings.

These are the recommended settings when using the model checker:

```toml
[profile.default.model_checker]
contracts = {'/path/to/project/src/Contract.sol' = ['Contract']}
engine = 'chc'
timeout = 10000
targets = ['assert']
```

Setting which contract should be verified is extremely important, otherwise all available contracts will be verified which may take a long time.

The recommended engine is `chc`, but `bmc` and `all` (which runs both) are also accepted.

It is also important to set a proper timeout (given in milliseconds), since the default time given to the underlying solver may not be enough.

If no verification targets are given, only assertions will be checked.

##### `[model_checker]`

The following keys are available in the model checker section.

###### `model_checker.contracts`

- Type: table
- Default: all
- Environment: N/A

Specifies what contracts the model checker will analyze.

The key of the table is the path to a source file, and the value is an array of contract names to check.

For example:

```toml
[profile.default.model_checker]
contracts = { "src/MyContracts.sol" = ["ContractA", "ContractB"] }
```

###### `model_checker.engine`

- Type: string (see below)
- Default: all
- Environment: N/A

Specifies the model checker engine to run. Valid values are:

- `chc`: The constrained horn clauses engine
- `bmc`: The bounded model checker engine
- `all`: Runs both engines

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#model-checking-engines) for more information on the engines.

###### `model_checker.timeout`

- Type: number (milliseconds)
- Default: N/A
- Environment: N/A

Sets the timeout for the underlying model checker engines (in milliseconds).

###### `model_checker.targets`

- Type: array of strings
- Default: assert
- Environment: N/A

Sets the model checker targets. Valid values are:

- `assert`: Assertions
- `underflow`: Arithmetic underflow
- `overflow`: Arithmetic overflow
- `divByZero`: Division by zero
- `constantCondition`: Trivial conditions and unreachable code
- `popEmptyArray`: Popping an empty array
- `outOfBounds`: Out of bounds array/fixed bytes index access
- `default`: All of the above (note: not the default for Forge)

#### Tests

Configuration related to the behavior of `forge test`.

##### `verbosity`

- Type: integer
- Default: 0
- Environment: `FOUNDRY_VERBOSITY` or `DAPP_VERBOSITY`

The verbosity level to use during tests.

- **Level 2 (`-vv`)**: Logs emitted during tests are also displayed.
- **Level 3 (`-vvv`)**: Stack traces for failing tests are also displayed.
- **Level 4 (`-vvvv`)**: Stack traces for all tests are displayed, and setup traces for failing tests are displayed.
- **Level 5 (`-vvvvv`)**: Stack traces and setup traces are always displayed.

##### `fuzz_runs`

- Type: integer
- Default: 256
- Environment: `FOUNDRY_FUZZ_RUNS` or `DAPP_FUZZ_RUNS`

The amount of fuzz runs to perform for each fuzz test case. Higher values gives more confidence in results at the cost of testing speed.

##### `fuzz_max_local_rejects`

- Type: integer
- Default: 1024
- Environment: `FOUNDRY_FUZZ_MAX_LOCAL_REJECTS`

The maximum number of individual inputs that may be rejected before the test as a whole aborts.
"Local" filters apply to a single strategy. If a value is rejected, a new value is drawn from that strategy only.

##### `fuzz_max_global_rejects`

- Type: integer
- Default: 65536
- Environment: `FOUNDRY_FUZZ_MAX_GLOBAL_REJECTS`

The maximum number of combined inputs that may be rejected before the test as a whole aborts.
"Global" filters apply to the whole test case. If the test case is rejected, the whole thing is regenerated.

##### `ffi`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_FFI` or `DAPP_FFI`

Whether or not to enable the `ffi` cheatcode.

**Warning:** Enabling this cheatcode has security implications for your project, as it allows tests to execute arbitrary programs on your computer.

##### `sender`

- Type: string (address)
- Default: 0x00a329c0648769a73afac7f9381e08fb43dbea72
- Environment: `FOUNDRY_SENDER` or `DAPP_SENDER`

The value of `msg.sender` in tests.

##### `tx_origin`

- Type: string (address)
- Default: 0x00a329c0648769a73afac7f9381e08fb43dbea72
- Environment: `FOUNDRY_TX_ORIGIN` or `DAPP_TX_ORIGIN`

The value of `tx.origin` in tests.

##### `initial_balance`

- Type: string (hexadecimal)
- Default: 0xffffffffffffffffffffffff
- Environment: `FOUNDRY_INITIAL_BALANCE` or `DAPP_INITIAL_BALANCE`

The initial balance of the test contracts in wei, written in hexadecimal.

##### `block_number`

- Type: integer
- Default: 1
- Environment: `FOUNDRY_BLOCK_NUMBER` or `DAPP_BLOCK_NUMBER`

The value of `block.number` in tests.

##### `chain_id`

- Type: integer
- Default: 31337
- Environment: `FOUNDRY_CHAIN_ID` or `DAPP_CHAIN_ID`

The value of the `chainid` opcode in tests.

##### `gas_limit`

- Type: integer or string
- Default: 9223372036854775807
- Environment: `FOUNDRY_GAS_LIMIT` or `DAPP_GAS_LIMIT`

The gas limit for each test case.

Due to a bug in a dependency of Forge, you **cannot raise the gas limit** beyond the default without changing the value to a string.

##### `gas_price`

- Type: integer
- Default: 0
- Environment: `FOUNDRY_GAS_PRICE` or `DAPP_GAS_PRICE`

The price of gas (in wei) in tests.

##### `block_base_fee_per_gas`

- Type: integer
- Default: 0
- Environment: `FOUNDRY_BLOCK_BASE_FEE_PER_GAS` or `DAPP_BLOCK_BASE_FEE_PER_GAS`

The base fee per gas (in wei) in tests.

##### `block_coinbase`

- Type: string (address)
- Default: 0x0000000000000000000000000000000000000000
- Environment: `FOUNDRY_BLOCK_COINBASE` or `DAPP_BLOCK_COINBASE`

The value of `block.coinbase` in tests.

##### `block_timestamp`

- Type: integer
- Default: 1
- Environment: `FOUNDRY_BLOCK_TIMESTAMP` or `DAPP_BLOCK_TIMESTAMP`

The value of `block.timestamp` in tests.

##### `block_difficulty`

- Type: integer
- Default: 0
- Environment: `FOUNDRY_BLOCK_DIFFICULTY` or `DAPP_BLOCK_DIFFICULTY`

The value of `block.difficulty` in tests.

##### `gas_reports`

- Type: array of strings (contract names)
- Default: ["*"]
- Environment: `FOUNDRY_GAS_REPORTS` or `DAPP_GAS_REPORTS`

The contracts to print gas reports for.

##### `no_storage_caching`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_NO_STORAGE_CACHING` or `DAPP_NO_STORAGE_CACHING`

If set to `true`, then block data from RPC endpoints in tests will not be cached. Otherwise, the data is cached to `$HOME/.foundry/cache/<chain id>/<block number>`.

##### `[rpc_storage_caching]`

The `[rpc_storage_caching]` block determines what RPC endpoints are cached.

###### `rpc_storage_caching.chains`

- Type: string or array of strings (chain names)
- Default: all
- Environment: N/A

Determines what chains are cached. By default, all chains are cached.

Valid values are:

- "all"
- A list of chain names, e.g. `["optimism", "mainnet"]`

###### `rpc_storage_caching.endpoints`

- Type: string or array of regex patterns (to match URLs)
- Default: remote
- Environment: N/A

Determines what RPC endpoints are cached. By default, only remote endpoints are cached.

Valid values are:

- all
- remote (default)
- A list of regex patterns, e.g. `["localhost"]`

##### `eth_rpc_url`

- Type: string
- Default: none
- Environment: `FOUNDRY_ETH_RPC_URL` or `DAPP_ETH_RPC_URL`

The url of the rpc server that should be used for any rpc calls.

##### `etherscan_api_key`

- Type: string
- Default: none
- Environment: `FOUNDRY_ETHERSCAN_API_KEY` or `DAPP_ETHERSCAN_API_KEY`

The etherscan API key for RPC calls.

##### `test_pattern`

- Type: regex
- Default: none
- Environment: `FOUNDRY_TEST_PATTERN` or `DAPP_TEST_PATTERN`

Only run test methods matching regex.  
Equivalent to `forge test --match-test <TEST_PATTERN>`

##### `test_pattern_inverse`

- Type: regex
- Default: none
- Environment: `FOUNDRY_TEST_PATTERN_INVERSE` or `DAPP_TEST_PATTERN_INVERSE`

Only run test methods not matching regex.  
Equivalent to `forge test --no-match-test <TEST_PATTERN_INVERSE>`

##### `contract_pattern`

- Type: regex
- Default: none
- Environment: `FOUNDRY_CONTRACT_PATTERN` or `DAPP_CONTRACT_PATTERN`

Only run test methods in contracts matching regex.  
Equivalent to `forge test --match-contract <CONTRACT_PATTERN>`

##### `contract_pattern_inverse`

- Type: regex
- Default: none
- Environment: `FOUNDRY_CONTRACT_PATTERN_INVERSE` or `DAPP_CONTRACT_PATTERN_INVERSE`

Only run test methods in contracts not matching regex.  
Equivalent to `forge test --no-match-contract <CONTRACT_PATTERN_INVERSE>`

##### `path_pattern`

- Type: regex
- Default: none
- Environment: `FOUNDRY_PATH_PATTERN` or `DAPP_PATH_PATTERN`

Only runs test methods on files matching the path.

##### `path_pattern_inverse`

- Type: regex
- Default: none
- Environment: `FOUNDRY_PATH_PATTERN_INVERSE` or `DAPP_PATH_PATTERN_INVERSE`

Only runs test methods on files not matching the path.

##### `block_gas_limit`

- Type: integer
- Default: none
- Environment: `FOUNDRY_BLOCK_GAS_LIMIT` or `DAPP_BLOCK_GAS_LIMIT`

The block.gaslimit value during EVM execution.

##### `memory_limit`

- Type: integer
- Default: 33554432
- Environment: `FOUNDRY_MEMORY_LIMIT` or `DAPP_MEMORY_LIMIT`

The memory limit of the EVM in bytes.

##### `names`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_NAMES` or `DAPP_NAMES`

Print compiled contract names.

##### `sizes`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_SIZES` or `DAPP_SIZES`

Print compiled contract sizes.

##### `rpc_endpoints`

- Type: table of RPC endpoints
- Default: none
- Environment: none

This section lives outside of profiles and defines a table of RPC endpoints, where the key specifies the RPC endpoints's name and the value is the RPC endpoint itself.

The value can either be a valid RPC endpoint or a reference to an environment variable (wrapped with in `${}`).

These RPC endpoints can be used in tests and Solidity scripts (see [`vm.rpc`](./cheatcodes/rpc.md)).

The following example defines an endpoint named `optimism` and an endpoint named `mainnet` that references an environment variable `RPC_MAINNET`:

```toml
[rpc_endpoints]
optimism = "https://optimism.alchemyapi.io/v2/..."
mainnet = "${RPC_MAINNET}"
```

#### Formatter

Configuration related to the behavior of the Forge formatter. Each of these keys live under the `[fmt]` section.

##### `line_length`

- Type: number
- Default: 120
- Environment: `FOUNDRY_FMT_LINE_LENGTH` or `DAPP_FMT_LINE_LENGTH`

Specifies the maximum line length where the formatter will try to wrap the line.

##### `tab_width`

- Type: number
- Default: 4
- Environment: `FOUNDRY_FMT_TAB_WIDTH` or `DAPP_FMT_TAB_WIDTH`

Number of spaces per indentation level.

##### `bracket_spacing`

- Type: bool
- Default: false
- Environment: `FOUNDRY_FMT_BRACKET_SPACING` or `DAPP_FMT_BRACKET_SPACING`

Whether or not to print spaces between brackets.

##### `int_types`

- Type: string
- Default: long
- Environment: `FOUNDRY_FMT_INT_TYPES` or `DAPP_FMT_INT_TYPES`

Style of uint/int256 types. Valid values are:

- `long` (default): Use the explicit `uint256` or `int256`
- `short`: Use the implicit `uint` or `int`
- `preserve`: Use the type defined in the source code

##### `func_attrs_with_params_multiline`

- Type: bool
- Default: true
- Environment: `FOUNDRY_FMT_FUNC_ATTRS_WITH_PARAMS_MULTILINE` or `DAPP_FMT_FUNC_ATTRS_WITH_PARAMS_MULTILINE`

If function parameters are multiline then always put the function attributes on separate lines.

##### `quote_style`

- Type: string
- Default: double
- Environment: `FOUNDRY_FMT_QUOTE_STYLE` or `DAPP_FMT_QUOTE_STYLE`

Defines the quotation mark style. Valid values are:

- `double` (default): Use double quotes where possible (`"`)
- `single`: Use single quotes where possible (`'`)
- `preserve`: Use quotation mark defined in the source code

##### `number_underscore`

- Type: string
- Default: preserve
- Environment: `FOUNDRY_FMT_NUMBER_UNDERSCORE` or `DAPP_FMT_NUMBER_UNDERSCORE`

Style of underscores in number literals. Valid values are:

- `preserve` (default): Use the underscores defined in the source code
- `thousands`: Add an underscore every thousand, if greater than 9999. i.e. `1000` is formatted as `1000` and `10000` as `10_000`
- `remove`: Remove all underscores

#### Etherscan

Configuration related to Etherscan, such as API keys. This configuration is used in various places by Forge.

The `[etherscan]` section is a mapping of keys to Etherscan configuration tables. The Etherscan configuration tables hold the following keys:

- `key` (string) (**required**): The Etherscan API key for the given network. The value of this property can also point to an environment variable.
- `chain`: The chain name or ID of the chain this Etherscan configuration is for.
- `url`: The Etherscan API URL.

If the key of the configuration is a chain name, then `chain` is not required, otherwise it is. `url` can be used to explicitly set the Etherscan API URL for chains not natively supported by name.

Using TOML inline table syntax, all of these are valid:

```toml
[etherscan]
mainnet = { key = "${ETHERSCAN_MAINNET_KEY}" }
mainnet2 = { key = "ABCDEFG", chain = "mainnet" }
optimism = { key = "1234567" }
unknown_chain = { key = "ABCDEFG", url = "<etherscan api url for this chain>" }
```
