## cast basefee

### NAME

cast-basefee - Get the basefee of a block.

### SYNOPSIS

``cast basefee`` [*options*] [*block*]

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
    cast basefee
    ```

2. Get the basefee of the genesis block:
    ```sh
    cast basefee 1
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md), [cast age](./cast-age.md)
