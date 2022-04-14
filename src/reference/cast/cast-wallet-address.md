## cast wallet address

### NAME

cast-wallet-address - Convert a private key to an address.

### SYNOPSIS

``cast wallet address`` [*options*]

### DESCRIPTION

Convert a private key to an address.

### OPTIONS

#### Keystore Options

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the address of the keypair in `keystore.json`:
    ```sh
    cast wallet address --keystore keystore.json
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)
