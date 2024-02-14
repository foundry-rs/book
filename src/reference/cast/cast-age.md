## probe age

### NAME

probe-age - Get the timestamp of a block.

### SYNOPSIS

``probe age`` [*options*] [*block*]

### DESCRIPTION

Get the timestamp of a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the timestamp of the latest block:
    ```sh
    probe age
    ```

2. Get the timestamp of the genesis block:
    ```sh
    probe age 1
    ```

### SEE ALSO

[probe](./probe.md), [probe block](./probe-block.md), [probe basefee](./probe-basefee.md)
