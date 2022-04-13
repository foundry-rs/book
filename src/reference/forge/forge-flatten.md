## forge flatten

### NAME

forge-flatten - Flatten a source file and all of its imports into one file.

### SYNOPSIS

``forge flatten`` [*options*] *file*

### DESCRIPTION

Flatten a source file and all of its imports into one file.

If `--output <FILE>` is not set, then the flattened contract will be output to stdout.

### OPTIONS

#### Flatten Options

`-o` *file*  
`--output` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to output the flattened contract. If not specified, the flattened contract will be output to stdout.

#### Project Options

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`-c` *path*  
`--contracts` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The contract's source directory, relative to the project root.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `DAPP_SRC`

`--lib-paths` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to the library folder.

`-r` *remappings*  
`--remappings` *remappings*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's remappings.

`--cache-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to the compiler cache.

`--hardhat`  
&nbsp;&nbsp;&nbsp;&nbsp;Use the Hardhat-style project layout.

{{#include common-options.md}}

### EXAMPLES

1. Flatten `src/Contract.sol`:
    ```sh
    forge flatten src/Contract.sol
    ```

2. Flatten `src/Contract.sol` and write the result to `src/Contract.flattened.sol`:
    ```sh
    forge flatten --output src/Contract.flattened.sol src/Contract.sol
    ```


### SEE ALSO

[forge](./forge.md), [forge verify-contract](./forge-verify-contract.md)
