## cast wallet

### NAME

cast-wallet - Wallet management utilities.

### SYNOPSIS

`cast wallet` [*options*] *command* [*args*]  
`cast wallet` [*options*] `--version`  
`cast wallet` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to use, create and manage wallets.

### COMMANDS

[cast wallet new](./cast-wallet-new.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a new random keypair.

[cast wallet address](./cast-wallet-address.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Convert a private key to an address.

[cast wallet sign](./cast-wallet-sign.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Sign a message.

[cast wallet vanity](./cast-wallet-vanity.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity address.

[cast wallet verify](./cast-wallet-verify.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Verify the signature of a message.

[cast wallet import](./cast-wallet-import.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Import a private key into an encrypted keystore.

[cast wallet list](./cast-wallet-list.md)  
&nbsp;&nbsp;&nbsp;&nbsp;List all the accounts in the keystore default directory.

### OPTIONS

#### Special Options

`-V`  
`--version`  
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}
