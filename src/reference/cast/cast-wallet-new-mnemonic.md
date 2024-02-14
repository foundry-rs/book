## probe new-mnemonic

### NAME

probe-wallet-new-mnemonic - Creates a new mnemonic with a set number of words.

### SYNOPSIS

``probe wallet new-mnemonic`` [*options*]

### DESCRIPTION

Generates a random BIP39 mnemonic phrase.

### OPTIONS

#### New Mnemonic Options

`-w`
`--words`
&nbsp;&nbsp;&nbsp;&nbsp;The amount of words for the mnemonic. Defaults to 12.

`-a`
`--accounts`
&nbsp;&nbsp;&nbsp;&nbsp;The number of accounts to display, which are derived from the mnemonic. Defaults to 1.

### EXAMPLES

1. Create a new mnemonic with 24 words.
    ```sh
    probe wallet new-mnemonic --words 24
    ```
   
```text
Successfully generated a new mnemonic.
Phrase:
decrease where seek crop segment want icon medal sleep social blast provide virus grief pledge soccer stereo trick dry dirt rotate explain into nominee

Accounts:
- Account 0:
Address:     0x34644D4eC92ae1832877cE22AD9bA4b00c7397c8
Private key: 0x832a3784d0a130c8a0ce3cc6dfc336a41ca7801a117eac7a3bfaace52e4d239c
```

### SEE ALSO

[probe](./probe.md)
