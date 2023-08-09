## forge

### NAME

forge - Build, test, fuzz, debug and deploy Solidity contracts.

### SYNOPSIS

`forge` [*options*] *command* [*args*]  
`forge` [*options*] `--version`  
`forge` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to build, test, fuzz, debug and deploy Solidity smart contracts.

### COMMANDS

#### General Commands

[forge help](./forge-help.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display help information about Forge.

[forge completions](./forge-completions.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate shell autocompletions for Forge.

#### Project Commands

[forge init](./forge-init.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a new Forge project.

[forge install](./forge-install.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Install one or multiple dependencies.

[forge update](./forge-update.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Update one or multiple dependencies.

[forge remove](./forge-remove.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Remove one or multiple dependencies.

[forge config](./forge-config.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display the current config.

[forge remappings](./forge-remappings.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Get the automatically inferred remappings for this project.

[forge tree](./forge-tree.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Display a tree visualization of the project's dependency graph.

[forge geiger](./forge-geiger.md)
&nbsp;&nbsp;&nbsp;&nbsp;Detects usage of unsafe cheat codes in a foundry project and its dependencies.

#### Build Commands

[forge build](./forge-build.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Build the project's smart contracts.

[forge clean](./forge-clean.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Remove the build artifacts and cache directories.

[forge inspect](./forge-inspect.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Get specialized information about a smart contract.

#### Test Commands

[forge test](./forge-test.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Run the project's tests.

[forge snapshot](./forge-snapshot.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a snapshot of each test's gas usage.

[forge coverage](./forge-coverage.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate coverage reports.

#### Deploy Commands

[forge create](./forge-create.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a smart contract.

[forge verify-contract](./forge-verify-contract.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Verify smart contracts on Etherscan.

[forge verify-check](./forge-verify-check.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Check verification status on Etherscan.

[forge flatten](./forge-flatten.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Flatten a source file and all of its imports into one file.

#### Utility Commands

[forge debug](./forge-debug.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Debug a single smart contract as a script.

[forge bind](./forge-bind.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate Rust bindings for smart contracts.

[forge cache](./forge-cache.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Manage the Foundry cache.

[forge cache clean](./forge-cache-clean.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Cleans cached data from ``~/.foundry``.

[forge cache ls](./forge-cache-ls.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Shows cached data from ``~/.foundry``.

[forge script](./forge-script.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Run a smart contract as a script, building transactions that can be sent onchain.

[forge upload-selectors](./forge-upload-selectors.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Uploads abi of given contract to https://sig.eth.samczsun.com function selector database.

[forge doc](./forge-doc.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate documentation for Solidity source files.

### OPTIONS

#### Special Options

`-V`  
`--version`  
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}

### FILES

`~/.foundry/`  
&nbsp;&nbsp;&nbsp;&nbsp;Default location for Foundry's "home" directory where it stores various files.

`~/.foundry/bin/`  
&nbsp;&nbsp;&nbsp;&nbsp;Binaries installed using `foundryup` will be located here.

`~/.foundry/cache/`  
&nbsp;&nbsp;&nbsp;&nbsp;Forge's cache directory, where it stores cached block data and more.

`~/.foundry/foundry.toml`  
&nbsp;&nbsp;&nbsp;&nbsp;The global [Foundry config](../config/overview.md).

`~/.svm`  
&nbsp;&nbsp;&nbsp;&nbsp;The location of the Forge-managed solc binaries.

### EXAMPLES

1. Create a new Forge project:
    ```sh
    forge init hello_foundry
    ```

2. Build a project:
    ```sh
    forge build
    ```

3. Run a project's tests:
    ```sh
    forge test
    ```

### BUGS

See <https://github.com/foundry-rs/foundry/issues> for issues.
