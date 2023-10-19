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

`--trace`  
&nbsp;&nbsp;&nbsp;&nbsp;Prints traces for the transaction.

`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Opens an interactive debugger with the transaction. Needs `--trace`.

`--verbose`  
&nbsp;&nbsp;&nbsp;&nbsp;Prints a more verbose trace. Needs `--trace`.

`--labels <address:label>`  
&nbsp;&nbsp;&nbsp;&nbsp;Labels to apply to the traces, with the format `address:label`. Needs `--trace`.

`--evm-version`  
&nbsp;&nbsp;&nbsp;&nbsp;The EVM version to use. Needs `--trace`.

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

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

2. Call `tokenURI(uint256)(string)` on the Tubby Cats NFT contract:

    ```sh
    export CONTRACT=0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd
    export TOKEN_ID=19938
    cast call $CONTRACT "tokenURI(uint256)(string)" $TOKEN_ID
   ```

3. Call ``getAmountsOut(uint,address[])`` on the Uniswap v2 router contract:

    ```sh
   cast call 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D \
     "getAmountsOut(uint,address[])" 1 "[0x6b...0f,0xc0...c2]"
    ```

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md)
