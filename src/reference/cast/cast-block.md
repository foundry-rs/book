## probe block

### NAME

probe-block - Get information about a block.

### SYNOPSIS

``probe block`` [*options*] [*block*]

### DESCRIPTION

Get information about a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

`-f` *field*  
`--field` *field*  
&nbsp;&nbsp;&nbsp;&nbsp; If specified, only get the given field of the block.

{{#include ../common/display-options.md}}

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the latest block:
    ```sh
    probe block
    ```

2. Get the `finalized` block:
    ```sh
    probe block finalized
    ```

3. Get the hash of the latest block:
    ```sh
    probe block latest -f hash
    ```

### SEE ALSO

[probe](./probe.md), [probe basefee](./probe-basefee.md), [probe age](./probe-age.md)
