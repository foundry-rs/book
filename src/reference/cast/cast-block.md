## cast block

### NAME

cast-block - Get information about a block.

### SYNOPSIS

``cast block`` [*options*] *block* [*field*]

### DESCRIPTION

Get information about a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `latest` or `pending`.

If *field* is specified, then only the given field of the block is displayed.

### OPTIONS

{{#include ../common/display-options.md}}

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the latest block:
    ```sh
    cast block latest
    ```

2. Get the hash of the latest block:
    ```sh
    cast block latest hash
    ```

### SEE ALSO

[cast](./cast.md), [cast basefee](./cast-basefee.md), [cast age](./cast-age.md)
