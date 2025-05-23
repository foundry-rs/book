## cast compute-address

### NAME

cast-compute-address - Compute the contract address from a given nonce and deployer address.

### SYNOPSIS

``cast compute-address`` [*options*] *address*

### DESCRIPTION

Compute the contract address from a given nonce and deployer address.

### OPTIONS

#### Compute Options

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;The nonce of the account. Defaults to the latest nonce, fetched from the RPC.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md), [cast create2](./cast-create2.md)
