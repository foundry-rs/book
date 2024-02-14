## probe compute-address

### NAME

probe-compute-address - Compute the contract address from a given nonce and deployer address.

### SYNOPSIS

``probe compute-address`` [*options*] *address*

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

[probe](./probe.md), [probe proof](./probe-proof.md), [probe create2](./probe-create2.md)
