## cast wallet sign

### NAME

cast-wallet-sign - Sign a message.

### SYNOPSIS

``cast wallet sign`` [*options*] *message*

### DESCRIPTION

Sign a message.

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
