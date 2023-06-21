## cast codesize

### NAME

cast-codesize - Get the runtime bytecode size of a contract.

### SYNOPSIS

``cast codesize`` [*options*] *address*

### DESCRIPTION

Get the runtime bytecode size of a contract.

The contract (*address*) can be an ENS name or an address.

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

1. Get the runtime bytecode size of the WETH contract.
```sh
cast codesize 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

### SEE ALSO

[cast](./cast.md), [cast code](./cast-code.md)
