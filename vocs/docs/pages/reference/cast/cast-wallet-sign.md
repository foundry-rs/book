## cast wallet sign

### NAME

cast-wallet-sign - Sign a message.

### SYNOPSIS

``cast wallet sign`` [*options*] *message*

### DESCRIPTION

Sign a message suitable for [`eth_sign`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sign). Note that signing prefixes the message with the Ethereum Signed Message header [in accordance with EIP-191](https://eips.ethereum.org/EIPS/eip-191) unless `--no-hash` is provided.

### OPTIONS

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include common-options.md}}

### EXAMPLES

1. Sign a message using a keystore:
    ```sh
    cast wallet sign --keystore keystore.json --interactive "hello"
    ```

2. Sign a message using a raw private key:
    ```sh
    cast wallet sign --private-key $PRIV_KEY "hello"
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)
