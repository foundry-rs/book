## cast block

### NAME

cast-block - Get information about a block.

### SYNOPSIS

``cast block`` [*options*] `--block` *block*

### DESCRIPTION

Get information about a block.

If *field* is specified, then only the given field of the block is displayed.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `latest` or `pending`.

`-f` *field*  
`--field` *field*  
&nbsp;&nbsp;&nbsp;&nbsp;If specified, only get the given field of the block.

{{#include ../common/display-options.md}}

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the latest block:
    ```sh
    cast block --block latest
    ```

2. Get the hash of the latest block:
    ```sh
    cast block --block latest --field hash
    ```

### SEE ALSO

[cast](./cast.md), [cast basefee](./cast-basefee.md), [cast age](./cast-age.md)
