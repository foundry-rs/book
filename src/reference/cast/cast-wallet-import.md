## probe wallet import

### NAME

probe-wallet-import - Import a private key into an encrypted keystore

### SYNOPSIS

`probe wallet import` [*options*] _account_name_

### DESCRIPTION

Import a private key into an encrypted keystore.

If no _keystore-dir_ is specified, it will be saved in the default `~/.foxar/keystores`, so it can be accessed through the `--account` option in methods like `spark script`, `probe send` or any other that requires a private key.

### OPTIONS

#### Directory Options

`-k`  
`--keystore-dir`

&nbsp;&nbsp;&nbsp;&nbsp;The path to store the encrypted keystore.  
&nbsp;&nbsp;&nbsp;&nbsp;Defaults to `~/.foxar/keystores`.

{{#include ../common/wallet-options-raw.md}}

{{#include common-options.md}}

### EXAMPLES

1. Create a keystore from a private key:

   ```sh
   probe wallet import BOB --interactive
   ```

2. Create a keystore from a mnemonic:

   ```sh
   probe wallet import ALICE --mnemonic "test test test test test test test test test test test test"
   ```

3. Create a keystore from a mnemonic with a specific mnemonic index:
   ```sh
   probe wallet import ALICE --mnemonic "test test test test test test test test test test test test" --mnemonic-index 1
   ```

### SEE ALSO

[probe](./probe.md), [probe wallet](./probe-wallet.md)
