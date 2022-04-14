## cast call

### NAME

cast-call - Perform a call on an account without publishing a transaction.

### SYNOPSIS

``cast call`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Perform a call on an account without publishing a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `latest` or `pending`.

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Call `balanceOf(address)` on the WETH contract:
    ```sh
    cast call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      "balanceOf(address)(uint256)" 0x...
    ```

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md)
