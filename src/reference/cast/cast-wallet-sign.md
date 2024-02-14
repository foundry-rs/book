## probe wallet sign

### NAME

probe-wallet-sign - Sign a message.

### SYNOPSIS

``probe wallet sign`` [*options*] *message*

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
    probe wallet sign --keystore keystore.json --interactive "hello"
    ```

2. Sign a message using a raw private key:
    ```sh
    probe wallet sign --private-key $PRIV_KEY "hello"
    ```

### SEE ALSO

[probe](./probe.md), [probe wallet](./probe-wallet.md)
