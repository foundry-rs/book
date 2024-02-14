## probe find-block

### NAME

probe-find-block - Get the block number closest to the provided timestamp.

### SYNOPSIS

``probe find-block`` [*options*] *timestamp*

### DESCRIPTION

Get the block number closest to the provided timestamp.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the block number closest to New Years 2021
    ```sh
    probe find-block 1609459200
    ```

### SEE ALSO

[probe](./probe.md)
