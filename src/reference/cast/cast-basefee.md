## cast basefee

### NAME

cast-basefee - Get the basefee of a block.

### SYNOPSIS

``cast basefee`` [*options*] *block*

### DESCRIPTION

Get the basefee of a block.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the basefee of the latest block:
    ```sh
    cast basefee latest
    ```

2. Get the basefee of the genesis block:
    ```sh
    cast basefee 1
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md), [cast age](./cast-age.md)
