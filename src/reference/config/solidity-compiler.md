## Solidity compiler

Configuration related to the behavior of the Solidity compiler.

**Sections**

- [General](#general)
- [Optimizer](#optimizer)
- [Model Checker](#model-checker)

### General

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
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
```

becomes

```solidity
import {Context} from "node_modules/@openzeppelin/openzeppelin-contracts/contracts/utils/Context.sol";
```

##### `auto_detect_remappings`

- Type: boolean
- Default: true
- Environment: `FOUNDRY_AUTO_DETECT_REMAPPINGS` or `DAPP_AUTO_DETECT_REMAPPINGS`

If enabled, Foundry will automatically try auto-detect remappings by scanning the `libs` folder(s).

If set to `false`, only the remappings in `foundry.toml` and `remappings.txt` are used.

##### `allow_paths`

- Type: array of strings (paths)
- Default: none
- Environment: `FOUNDRY_ALLOW_PATHS` or `DAPP_ALLOW_PATHS`

Tells solc to allow reading source files from additional directories. This is mainly relevant for complex workspaces managed by `pnpm` or similar.

See also [solc allowed-paths](https://docs.soliditylang.org/en/latest/path-resolution.html#allowed-paths)

##### `include_paths`

- Type: array of strings (paths)
- Default: none
- Environment: `FOUNDRY_INCLUDE_PATHS` or `DAPP_INCLUDE_PATHS`

Make an additional source directory available to the default import callback. Use this option if you want to import contracts whose location is not fixed in relation to your main source tree, e.g. third-party libraries installed using a package manager. Can be used multiple times. Can only be used if base path has a non-empty value.

See also [solc path resolution](https://docs.soliditylang.org/en/latest/path-resolution.html)

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

##### `ignored_warnings_from`

- Type: array of strings (file paths)
- Default: none
- Environment: `FOUNDRY_IGNORED_WARNINGS_FROM` OR `DAPP_IGNORED_WARNINGS_FROM`

An array of file paths from which warnings should be ignored during the compulation process. This is useful when you have a specific
directories of files that produce known warnings and you wish to suppress these warnings without affecting others.

Each entry in the array should be a path to a directory or a specific file. For Example:

`ignored_warnings_from = ["path/to/warnings/file1.sol", "path/to/warnings/file2.sol"]`

This configuration will cause the compiler to ignore any warnings that originate from the specified paths.

##### `ignored_error_codes`

- Type: array of integers/strings
- Default: none for source, SPDX license identifiers and contract size for tests
- Environment: `FOUNDRY_IGNORED_ERROR_CODES` or `DAPP_IGNORED_ERROR_CODES`

An array of Solidity compiler error codes to ignore during build, such as warnings.

Valid values are:

- `license`: 1878
- `code-size`: 5574
- `func-mutability`: 2018
- `unused-var`: 2072
- `unused-param`: 5667
- `unused-return`: 9302
- `virtual-interfaces`: 5815
- `missing-receive-ether`: 3628
- `shadowing`: 2519
- `same-varname`: 8760
- `unnamed-return`: 6321
- `unreachable`: 5740
- `pragma-solidity`: 3420
- `constructor-visibility`: 2462
- `init-code-size`: 3860
- `transient-storage`: 2394
- `too-many-warnings`: 4591

##### `deny_warnings`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_DENY_WARNINGS` or `DAPP_DENY_WARNINGS`

If enabled, Foundry will treat Solidity compiler warnings as errors, stopping artifacts from being written to disk.

##### `evm_version`

- Type: string
- Default: paris
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

Enables [sparse mode](../forge/forge-build.md#sparse-mode-experimental) for builds.

### Optimizer

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

The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). A `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code. The maximum value of the parameter is `2**32-1`.

A common misconception is that this parameter specifies the number of iterations of the optimizer. This is not true: The optimizer will always run as many times as it can still improve the code.

##### `via_ir`

- Type: boolean
- Default: false
- Environment: `FOUNDRY_VIA_IR` or `DAPP_VIA_IR`

If set to true, changes compilation pipeline to go through the new IR optimizer.

##### `use_literal_content`

- Type: boolean
- Default: false

If set to true, changes compilation to only use literal content and not URLs.

##### `[optimizer_details]`

The optimizer details section is used to tweak how the Solidity optimizer behaves. There are several configurable values in this section (each of them are booleans):

- `peephole`
- `inliner`
- `jumpdestRemover`
- `orderLiterals`
- `deduplicate`
- `cse`
- `constantOptimizer`
- `yul`

Refer to the Solidity [compiler input description](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) for the default values.

##### `[optimizer_details.yul_details]`

The Yul details subsection of the optimizer details section is used to tweak how the new IR optimizer behaves. There are two configuration values:

- `stack_allocation`: Tries to improve the allocation of stack slots by freeing them up earlier.
- `optimizer_steps`: Selects the optimizer steps to be applied.

Refer to the Solidity [compiler input description](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) for the default values.

> ℹ️ **Note**
> If you encounter compiler errors when using `via_ir`, explicitly enable the legacy `optimizer` and leave `optimizer_steps` as an empty string

### Model checker

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

###### `model_checker.div_mod_with_slacks`

- Type: boolean
- Default: false
- Environment: N/A

Sets how division and modulo operations should be encoded.

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#division-and-modulo-with-slack-variables) for more information.

###### `model_checker.engine`

- Type: string (see below)
- Default: all
- Environment: N/A

Specifies the model checker engine to run. Valid values are:

- `chc`: The constrained horn clauses engine
- `bmc`: The bounded model checker engine
- `all`: Runs both engines

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#model-checking-engines) for more information on the engines.

###### `model_checker.invariants`

- Type: array of strings
- Default: N/A
- Environment: N/A

Sets the model checker invariants. Valid values are:

- `contract`: Contract Invariants
- `reentrancy`: Reentrancy Properties

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#reported-inferred-inductive-invariants) for more information on the invariants.

###### `model_checker.show_unproved`

- Type: boolean
- Default: false
- Environment: N/A

Whether or not to output all unproved targets.

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#unproved-targets) for more information.

###### `model_checker.solvers`

- Type: array of strings
- Default: N/A
- Environment: N/A

Sets the model checker solvers. Valid values are:

- `cvc4`
- `eld`: introduced in v0.8.18
- `smtlib2`
- `z3`

Refer to the [Solidity documentation](https://docs.soliditylang.org/en/latest/smtchecker.html#smt-and-horn-solvers) for more information.

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
