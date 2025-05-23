## cast proof

### NAME

cast-proof - Generate a storage proof for a given storage slot.

### SYNOPSIS

``cast proof`` [*options*] *address* [*slots...*]

### DESCRIPTION

Generate a storage proof for a given storage slot.

The address (*address*) can be an ENS name or an address.

The displayed output is a JSON object with the following keys:

- `accountProof`: Proof for the account itself
- `address`: The address of the account
- `balance`: The balance of the account
- `codeHash`: A hash of the account's code
- `nonce`: The nonce of the account
- `storageHash`: A hash of the account's storage
- `storageProof`: An array of storage proofs, one for each requested slot
- `storageProof.key`: The slot
- `storageProof.proof`: The proof for the slot
- `storageProof.value`: The value of the slot

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the proof for storage slot 0 on the WETH contract:
    ```sh
    cast proof 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
    ```

### SEE ALSO

[cast](./cast.md), [cast storage](./cast-storage.md)
