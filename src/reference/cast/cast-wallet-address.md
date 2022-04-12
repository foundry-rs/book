## cast wallet address

### NAME

cast-wallet-address - Convert a private key to an address.

### SYNOPSIS

``cast wallet address`` [*options*]

### DESCRIPTION

Convert a private key to an address.

### OPTIONS

#### Keystore Options

{{#include wallet-options-raw.md}}

{{#include wallet-options-keystore.md}}

{{#include wallet-options-hardware.md}}

{{#include common-options.md}}

### EXAMPLES

1. Create a new keypair without saving it to a keystore:

       cast wallet new

2. Create a new keypair and save it in `keystore.json`:

       cast wallet new keystore.json

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)
