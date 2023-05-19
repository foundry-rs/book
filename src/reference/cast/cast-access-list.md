## cast access-list

### NAME

cast-access-list - Create an access list for a transaction.

### SYNOPSIS

``cast access-list`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Create an access list for a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast call](./cast-call.md)
