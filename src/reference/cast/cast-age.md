## cast age

### NAME

cast-age - Get the timestamp of a block.

### SYNOPSIS

``cast age`` [*options*] [*block*]

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
    cast age
    ```

2. Get the timestamp of the genesis block:
    ```sh
    cast age 1
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md), [cast basefee](./cast-basefee.md)
