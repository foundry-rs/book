## cast balance

### NAME

cast-balance - Get the balance of an account in wei.

### SYNOPSIS

``cast balance`` [*options*] *who*

### DESCRIPTION

Get the balance of an account.

The argument *who* can be an ENS name or an address.

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

1. Get the balance of beer.eth
    ```sh
    cast balance beer.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast nonce](./cast-nonce.md)
