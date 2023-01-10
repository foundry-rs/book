## forge build

### NAME

forge-build - Build the project's smart contracts.

### SYNOPSIS

``forge build`` or ``forge b`` [*options*]

### DESCRIPTION

Build the project's smart contracts.

The command will try to detect the latest version that can compile your project by looking at the
version requirements of all your contracts and dependencies.

You can override this behaviour by passing `--no-auto-detect`. Alternatively, you can pass `--use <SOLC_VERSION>`.

If the command detects that the Solidity compiler version it is using to build is not installed,
it will download it and install it in `~/.svm`. You can disable this behavior by passing `--offline`.

The build is incremental, and the build cache is saved in `cache/` in the project root by default. If you
want to clear the cache, pass `--force`, and if you want to change the cache directory, pass `--cache-path <PATH>`.

#### Build Modes

There are three build modes:

- Just compilation (default): Builds the project and saves the contract artifacts in `out/` (or the path specified by `--out <PATH>`).
- Size mode (`--sizes`): Builds the project, displays the size of non-test contracts and exits with code 1 if any of them are above the size limit.
- Name mode (`--names`): Builds the project, displays the names of the contracts and exits.

#### The Optimizer

You can enable the optimizer by passing `--optimize`, and you can adjust the number of optimizer runs by passing `--optimizer-runs <RUNS>`.

You can also opt-in to the Solidity IR compilation pipeline by passing `--via-ir`. Read more about the IR pipeline in the [Solidity docs][ir-pipeline].

By default, the optimizer is enabled and runs for 200 cycles.

##### Conditional Optimizer Usage

Many projects use the solc optimizer, either through the standard compilation pipeline or the IR pipeline. But in some cases, the optimizer can significantly slow down compilation speeds.

A config file for a project using the optimizer may look like this for regular compilation:

```toml
[profile.default]
solc-version = "0.8.17"
optimizer = true
optimizer-runs = 10_000_000
```

Or like this for `via-ir`:

```toml
[profile.default]
solc-version = "0.8.17"
via_ir = true
```

To reduce compilation speeds during development and testing, one approach is to have a `lite` profile that has the optimizer off and use this for development/testing cycle. The updated config file for regular compilation may look like this:

```toml
[profile.default]
solc-version = "0.8.17"
optimizer = true
optimizer-runs = 10_000_000

[profile.lite]
optimizer = false
```

Or like this for `via-ir`:

```toml
[profile.default]
solc-version = "0.8.17"
via_ir = true

[profile.lite.optimizer_details.yulDetails]
optimizerSteps = ''
```

When setup like this, `forge build` (or `forge test` / `forge script`) still uses the standard profile, so by default a `forge script` invocation will deploy your contracts with the production setting. Running `FOUNDRY_PROFILE=lite forge build` (and again, same for the test and script commands) will use the lite profile to reduce compilation times.

> There are additional optimizer details you can configure, see the [Additional Optimizer Settings](#additional-optimizer-settings) section below for more info.

#### Artifacts

You can add extra output from the Solidity compiler to your artifacts by passing `--extra-output <SELECTOR>`.

The selector is a path in the Solidity compiler output, which you can read more about in the [Solidity docs][output-desc].

You can also write some of the compiler output to separate files by passing `--extra-output-files <SELECTOR>`.

Valid selectors for `--extra-output-files` are:

- `metadata`: Written as a `metadata.json` file in the artifacts directory
- `ir`: Written as a `.ir` file in the artifacts directory
- `irOptimized`: Written as a `.iropt` file in the artifacts directory
- `ewasm`: Written as a `.ewasm` file in the artifacts directory
- `evm.assembly`: Written as a `.asm` file in the artifacts directory

#### Watch Mode

The command can be run in watch mode by passing `--watch [PATH...]`, which will rebuild every time a
watched file or directory is changed. The source directory is watched by default.

#### Sparse Mode (experimental)

Sparse mode only compiles files that match certain criteria.

By default, this filter applies to files that have not been changed since the last build, but for commands that
take file filters (e.g. [forge test](./forge-test.md)), sparse mode will only recompile files that match the filter.

Sparse mode is opt-in until the feature is stabilized. To opt-in to sparse mode and try it out, set [`sparse_mode`][sparse-mode]
in your configuration file.

#### Additional Optimizer Settings

The optimizer can be fine-tuned with additional settings. Simply set the `optimizer_details` table in your configuration file. For example:

```toml
[profile.default.optimizer_details]
constantOptimizer = true
yul = true

[profile.default.optimizer_details.yulDetails]
stackAllocation = true
optimizerSteps = 'dhfoDgvulfnTUtnIf'
```

See the [compiler input description documentation](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description)
for more information on available settings (specifically `settings.optimizer.details`).

#### Revert Strings

You can control how revert strings are generated by the compiler. By default, only user supplied revert strings are included in the bytecode, but there are other options:

- `strip`: Removes all revert strings (if possible, i.e. if literals are used) keeping side-effects.
- `debug`:  Injects strings for compiler-generated internal reverts, implemented for ABI encoders V1 and V2 for now.
- `verboseDebug`: Appends further information to user-supplied revert strings (not yet implemented).

#### Additional Model Checker settings

[Solidity's built-in model checker](https://docs.soliditylang.org/en/latest/smtchecker.html#tutorial) is an opt-in module that can be enabled via the `ModelChecker` object.

See [Compiler Input Description `settings.modelChecker`](https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description) and [the model checker's options](https://docs.soliditylang.org/en/latest/smtchecker.html#smtchecker-options-and-tuning).

The module is available in `solc` release binaries for OSX and Linux. The latter requires the z3 library version [4.8.8, 4.8.14] to be installed in the system (SO version 4.8).

Similarly to the optimizer settings above, the `model_checker` settings must be prefixed with the profile they correspond to: `[profile.default.model_checker]` belongs to the `[profile.default]`.

```toml
## foundry.toml
[profile.default.model_checker]
contracts = { '/path/to/project/src/Contract.sol' = [ 'Contract' ] }
engine = 'chc'
timeout = 10000
targets = [ 'assert' ]
```

The fields above are recommended when using the model checker.
Setting which contract should be verified is extremely important, otherwise all available contracts will be verified which can consume a lot of time.
The recommended engine is `chc`, but `bmc` and `all` (runs both) are also accepted.
It is also important to set a proper timeout (given in milliseconds), since the default time given to the underlying solvers may not be enough.
If no verification targets are given, only assertions will be checked.

The model checker will run when `forge build` is invoked, and will show findings as warnings if any.

### OPTIONS

#### Build Options

`--names`
&nbsp;&nbsp;&nbsp;&nbsp;Print compiled contract names.

`--sizes`
&nbsp;&nbsp;&nbsp;&nbsp;Print compiled non-test contract sizes, exiting with code 1 if any of them are above the size limit.

`--skip`
&nbsp;&nbsp;&nbsp;&nbsp;Skip compilation of non-essential contract directories like test or script (usage `--skip test`).

{{#include core-build-options.md}}

{{#include watch-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Build the project:
    ```sh
    forge build
    ```

2. Build the project with solc 0.6.0:
    ```sh
    forge build --use solc:0.6.0
    ```

3. Build the project with additional artifact output:
    ```sh
    forge build --extra-output evm.assembly
    ```

4. Build the project in watch mode:
    ```sh
    forge build --watch
    ```

### SEE ALSO

[forge](./forge.md), [forge clean](./forge-clean.md), [forge inspect](./forge-inspect.md)

[sparse-mode]: ../config/solidity-compiler.md#sparse_mode
[ir-pipeline]: https://docs.soliditylang.org/en/latest/ir-breaking-changes.html
[output-desc]: https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-api
