## cast find-block

### NAME

cast-find-block - Get the block number closest to the provided timestamp.

### SYNOPSIS

``cast find-block`` [*options*] *timestamp*

### DESCRIPTION

Get the block number closest to the provided timestamp.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the block number closest to New Years 2021
    ```sh
    cast find-block 1609459200
    ```

### SEE ALSO

[cast](./cast.md)
