#### Wallet Options - Raw

`-i`  
`--interactive`  
&nbsp;&nbsp;&nbsp;&nbsp;Open an interactive prompt to enter your private key.

`--private-key` *private key*  
&nbsp;&nbsp;&nbsp;&nbsp;Use the provided private key.

`--mnemnic-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Use the mnemonic file at the specified path.

`--mnemonic-index` *index*  
&nbsp;&nbsp;&nbsp;&nbsp;Use the private key from the given mnemonic index. Used with `--mnemonic-path`.  
&nbsp;&nbsp;&nbsp;&nbsp;Defaults to `0`.

#### Wallet Options - Keystore

`--keystore` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Use the keystore in the given folder or file.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `ETH_KEYSTORE`

`--password` *password*  
&nbsp;&nbsp;&nbsp;&nbsp;The keystore password. Used with `--keystore`.

#### Wallet Options - Hardware Wallet

`-t`  
`--trezor`  
&nbsp;&nbsp;&nbsp;&nbsp;Use a Trezor hardware wallet.

`-l`  
`--ledger`  
&nbsp;&nbsp;&nbsp;&nbsp;Use a Ledger hardware wallet.

`--hd-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The derivation path to use with hardware wallets.

#### Wallet Options - Remote

`-f` *address*  
`--from` *address*  
&nbsp;&nbsp;&nbsp;&nbsp;Sign the transaction with the specified account on the RPC.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `ETH_FROM`
