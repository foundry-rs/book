## probe balance

### NAME

probe-balance - Get the balance of an account in wei.

### SYNOPSIS

``probe balance`` [*options*] *who*

### DESCRIPTION

Get the balance of an account.

The argument *who* can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

`-e` *ether*  
`--ether` *ether*  
&nbsp;&nbsp;&nbsp;&nbsp; If this flag is used then balance will be shown in ether

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the balance of beer.eth
    ```sh
    probe balance beer.eth
    ```

### SEE ALSO

[probe](./probe.md), [probe nonce](./probe-nonce.md)
