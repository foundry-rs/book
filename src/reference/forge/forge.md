## spark

### NAME

spark - Build, test, fuzz, debug and deploy Solidity contracts.

### SYNOPSIS

`spark` [*options*] *command* [*args*]  
`spark` [*options*] `--version`  
`spark` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to build, test, fuzz, debug and deploy Solidity smart contracts.

### COMMANDS

#### General Commands

[spark help](./spark-help.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display help information about Spark.

[spark completions](./spark-completions.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate shell autocompletions for Spark.

#### Project Commands

[spark init](./spark-init.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a new Spark project.

[spark install](./spark-install.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Install one or multiple dependencies.

[spark update](./spark-update.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Update one or multiple dependencies.

[spark remove](./spark-remove.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Remove one or multiple dependencies.

[spark config](./spark-config.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display the current config.

[spark remappings](./spark-remappings.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Get the automatically inferred remappings for this project.

[spark tree](./spark-tree.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display a tree visualization of the project's dependency graph.

[spark geiger](./spark-geiger.md)
&nbsp;&nbsp;&nbsp;&nbsp;Detects usage of unsafe cheat codes in a foxar project and its dependencies.

#### Build Commands

[spark build](./spark-build.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Build the project's smart contracts.

[spark clean](./spark-clean.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Remove the build artifacts and cache directories.

[spark inspect](./spark-inspect.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Get specialized information about a smart contract.

#### Test Commands

[spark test](./spark-test.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Run the project's tests.

[spark snapshot](./spark-snapshot.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a snapshot of each test's gas usage.

[spark coverage](./spark-coverage.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate coverage reports.

#### Deploy Commands

[spark create](./spark-create.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a smart contract.

[spark verify-contract](./spark-verify-contract.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Verify smart contracts on Etherscan.

[spark verify-check](./spark-verify-check.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Check verification status on Etherscan.

[spark flatten](./spark-flatten.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Flatten a source file and all of its imports into one file.

#### Utility Commands

[spark debug](./spark-debug.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Debug a single smart contract as a script.

[spark bind](./spark-bind.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate Rust bindings for smart contracts.

[spark cache](./spark-cache.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Manage the Foxar cache.

[spark cache clean](./spark-cache-clean.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Cleans cached data from ``~/.foxar``.

[spark cache ls](./spark-cache-ls.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Shows cached data from ``~/.foxar``.

[spark script](./spark-script.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Run a smart contract as a script, building transactions that can be sent onchain.

[spark upload-selectors](./spark-upload-selectors.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Uploads abi of given contract to https://sig.eth.samczsun.com function selector database.

[spark doc](./spark-doc.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate documentation for Solidity source files.

### OPTIONS

#### Special Options

`-V`  
`--version`  
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}

### FILES

`~/.foxar/`  
&nbsp;&nbsp;&nbsp;&nbsp;Default location for Foxar's "home" directory where it stores various files.

`~/.foxar/bin/`  
&nbsp;&nbsp;&nbsp;&nbsp;Binaries installed using `foxarup` will be located here.

`~/.foxar/cache/`  
&nbsp;&nbsp;&nbsp;&nbsp;Spark's cache directory, where it stores cached block data and more.

`~/.foxar/foxar.toml`  
&nbsp;&nbsp;&nbsp;&nbsp;The global [Foxar config](../config/overview.md).

`~/.svm`  
&nbsp;&nbsp;&nbsp;&nbsp;The location of the Spark-managed solc binaries.

### EXAMPLES

1. Create a new Spark project:
    ```sh
    spark init hello_foxar
    ```

2. Build a project:
    ```sh
    spark build
    ```

3. Run a project's tests:
    ```sh
    spark test
    ```

### BUGS

See <https://github.com/foxar-rs/foxar/issues> for issues.
