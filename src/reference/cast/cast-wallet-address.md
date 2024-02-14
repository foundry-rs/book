## probe wallet address

### NAME

probe-wallet-address - Convert a private key to an address.

### SYNOPSIS

``probe wallet address`` [*options*]

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
    probe wallet address --keystore keystore.json
    ```

### SEE ALSO

[probe](./probe.md), [probe wallet](./probe-wallet.md)
