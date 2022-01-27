## `foundry.toml` Reference

Foundry's configuration system allows you to configure its tools.

### Profiles

Configuration can be arbitrarily namespaced into profiles. The default profile is named `default`, and all other profiles inherit values from this profile.

You can select the profile to use by setting the `FOUNDRY_PROFILE` environment variable.

### Global configuration

You can create a `foundry.toml` file in your home folder to configure Foundry globally.

### Environment variables

Configuration can be overriden with `FOUNDRY_` and `DAPP_` prefixed environment variables.

### Configuration format

Configuration files are written in the [TOML format](https://toml.io), with simple key-value pairs inside of sections. The following gives a quick overview of all settings (and their default values), with detailed descriptions found below.

```toml
[default]
src = 'src'                                                   # the source directory
test = 'test'                                                 # the test directory
out = 'out'                                                   # the output directory (for artifacts)
libs = ['lib']                                                # a list of library directories
remappings = []                                               # a list of remappings
libraries = []                                                # a list of deployed libraries to link against
cache = true                                                  # whether to cache builds or not
force = false                                                 # whether to ignore the cache (clean build)
evm_version = 'london'                                        # the evm version (by hardfork name)
#solc_version = '0.8.10'                                      # override for the solc version (setting this ignores `auto_detect_solc`)
auto_detect_solc = true                                       # enable auto-detection of the appropriate solc version to use
optimizer = true                                              # enable or disable the solc optimizer
optimizer_runs = 200                                          # the number of optimizer runs
verbosity = 0                                                 # the verbosity of tests
ignored_error_codes = []                                      # a list of ignored solc error codes
fuzz_runs = 256                                               # the number of fuzz runs for tests
ffi = false                                                   # whether to enable ffi or not
sender = '0x00a329c0648769a73afac7f9381e08fb43dbea72'         # the address of `msg.sender` in tests
tx_origin = '0x00a329c0648769a73afac7f9381e08fb43dbea72'      # the address of `tx.origin` in tests
initial_balance = '0xffffffffffffffffffffffff'                # the initial balance of the test contract
block_number = 0                                              # the block number we are at in tests
chain_id = 99                                                 # the chain id we are on in tests
gas_limit = 9223372036854775807                               # the gas limit in tests
gas_price = 0                                                 # the gas price (in wei) in tests
block_base_fee_per_gas = 0                                    # the base fee (in wei) in tests
block_coinbase = '0x0000000000000000000000000000000000000000' # the address of `block.coinbase` in tests
block_timestamp = 0                                           # the value of `block.timestamp` in tests
block_difficulty = 0                                          # the value of `block.difficulty` in tests
```

### Configuration keys

This section documents all configuration keys. All configuration keys must live under a profile, such as `default`.

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

##### `optimizer`

- Type: boolean
- Default: true
- Environment: `FOUNDRY_OPTIMIZER` or `DAPP_OPTIMIZER`

Whether or not to enable the Solidity compiler optimizer.

##### `optimizer_runs`

- Type: integer
- Default: 200
- Environment: `FOUNDRY_OPTIMIZER_RUNS` or `DAPP_OPTIMIZER_RUNS`

The amount of optimizer runs to perform.

##### `ignored_error_codes`

- Type: array of integers
- Default: none for source, SPDX license identifiers and contract size for tests
- Environment: `FOUNDRY_IGNORED_ERROR_CODES` or `DAPP_IGNORED_ERROR_CODES`

An array of Solidity compiler error codes to ignore during build, such as warnings.

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

##### `evm_version`

- Type: string
- Default: london
- Environment: `FOUNDRY_EVM_VERSION` or `DAPP_EVM_VERSION`

The EVM version to use during tests. The value **must** be an EVM hardfork name, such as `london`, `byzantium`, etc.

##### `fuzz_runs`

- Type: integer
- Default: 256
- Environment: `FOUNDRY_FUZZ_RUNS` or `DAPP_FUZZ_RUNS`

The amount of fuzz runs to perform for each fuzz test case. Higher values gives more confidence in results at the cost of testing speed.

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
- Default: 0
- Environment: `FOUNDRY_BLOCK_NUMBER` or `DAPP_BLOCK_NUMBER`

The value of `block.number` in tests.

##### `chain_id`

- Type: integer
- Default: 99
- Environment: `FOUNDRY_CHAIN_ID` or `DAPP_CHAIN_ID`

The value of the `chainid` opcode in tests.

##### `gas_limit`

- Type: integer
- Default: 9223372036854775807
- Environment: `FOUNDRY_GAS_LIMIT` or `DAPP_GAS_LIMIT`

The gas limit for each test case.

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
- Default: 0
- Environment: `FOUNDRY_BLOCK_TIMESTAMP` or `DAPP_BLOCK_TIMESTAMP`

The value of `block.timestamp` in tests.

##### `block_difficulty`

- Type: integer
- Default: 0
- Environment: `FOUNDRY_BLOCK_DIFFICULTY` or `DAPP_BLOCK_DIFFICULTY`

The value of `block.difficulty` in tests.
