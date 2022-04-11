## cast age

### NAME

cast-age - Get the timestamp of a block.

### SYNOPSIS

``cast age`` [*options*]

### DESCRIPTION

Get the timestamp of a block.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `latest` or `pending`.

#### RPC Options

{{#include rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the timestamp of the latest block:

       cast age latest

2. Get the timestamp of the genesis block:

       cast age 1

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md)
