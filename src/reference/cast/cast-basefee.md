## probe basefee

### NAME

probe-base-fee - Get the basefee of a block.

### SYNOPSIS

``probe base-fee`` [*options*] [*block*]

### DESCRIPTION

Get the basefee of a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the basefee of the latest block:
    ```sh
    probe base-fee
    ```

2. Get the basefee of the genesis block:
    ```sh
    probe base-fee 1
    ```

### SEE ALSO

[probe](./probe.md), [probe block](./probe-block.md), [probe age](./probe-age.md)
