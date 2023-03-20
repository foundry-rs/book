## cast nonce

### NAME

cast-nonce - Get the nonce for an account.

### SYNOPSIS

``cast nonce`` [*options*] *who*

### DESCRIPTION

Get the nonce of an account.

The argument *who* can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the nonce of beer.eth
    ```sh
    cast nonce beer.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast balance](./cast-balance.md)
