## probe wallet

### NAME

probe-wallet - Wallet management utilities.

### SYNOPSIS

`probe wallet` [*options*] *command* [*args*]  
`probe wallet` [*options*] `--version`  
`probe wallet` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to use, create and manage wallets.

### COMMANDS

[probe wallet new](./probe-wallet-new.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a new random keypair.

[probe wallet address](./probe-wallet-address.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Convert a private key to an address.

[probe wallet sign](./probe-wallet-sign.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Sign a message.

[probe wallet vanity](./probe-wallet-vanity.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity address.

[probe wallet verify](./probe-wallet-verify.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Verify the signature of a message.

[probe wallet import](./probe-wallet-import.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Import a private key into an encrypted keystore.

[probe wallet list](./probe-wallet-list.md)  
&nbsp;&nbsp;&nbsp;&nbsp;List all the accounts in the keystore default directory.

### OPTIONS

#### Special Options

`-V`  
`--version`  
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}
