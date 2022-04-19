## cast wallet vanity

### NAME

cast-wallet-vanity - Generate a vanity address.

### SYNOPSIS

``cast wallet vanity`` [*options*]

### DESCRIPTION

Generate a vanity address.

If `--nonce` is specified, then the command will try to generate a vanity contract address.

### OPTIONS

#### Keystore Options

`--starts-with` *hex*  
&nbsp;&nbsp;&nbsp;&nbsp;Prefix for the vanity address.

`--ends-with` *hex*  
&nbsp;&nbsp;&nbsp;&nbsp;Suffix for the vanity address.

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity contract address created by the generated keypair with the specified nonce.

{{#include common-options.md}}

### EXAMPLES

1. Create a new keypair that starts with `dead`:
    ```sh
    cast wallet vanity --starts-with dead
    ```

2. Create a new keypair ends with `beef`:
    ```sh
    cast wallet vanity --ends-with beef
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)
