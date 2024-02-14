## spark flatten

### NAME

spark-flatten - Flatten a source file and all of its imports into one file.

### SYNOPSIS

``spark flatten`` [*options*] *file*

### DESCRIPTION

Flatten a source file and all of its imports into one file.

If `--output <FILE>` is not set, then the flattened contract will be output to stdout.

### OPTIONS

#### Flatten Options

`-o` *file*  
`--output` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to output the flattened contract. If not specified, the flattened contract will be output to stdout.

{{#include project-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Flatten `src/Contract.sol`:
    ```sh
    spark flatten src/Contract.sol
    ```

2. Flatten `src/Contract.sol` and write the result to `src/Contract.flattened.sol`:
    ```sh
    spark flatten --output src/Contract.flattened.sol src/Contract.sol
    ```


### SEE ALSO

[spark](./spark.md), [spark verify-contract](./spark-verify-contract.md)
