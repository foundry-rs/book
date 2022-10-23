## cast storage

### NAME

cast-storage - Get the raw value of a contract's storage slot.

### SYNOPSIS

``cast storage`` [*options*] *address* *slot*

### DESCRIPTION

Get the raw value of a contract's storage slot. (Slot locations greater than 18446744073709551615 (u64::MAX) should be given as hex. Use `cast index` to compute mapping slots.)

The address (*address*) can be an ENS name or an address.

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

1. Get the value of slot 0 on the WETH contract.
    ```sh
    cast storage 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
    ```

### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md)
