## cast new-mnemonic

### NAME

cast-new-mnemonic - Creates a new mnemonic with a set number of words.

### SYNOPSIS

``cast new-mnemonic`` [*options*]

### DESCRIPTION

Convert binary data into hex data.

The input is taken from stdin.

### OPTIONS

#### New Mnemonic Options

`-w`
`--words`
&nbsp;&nbsp;&nbsp;&nbsp;The amount of words for the mnemonic. Defaults to 12.

`-a`
`--accounts`
&nbsp;&nbsp;&nbsp;&nbsp;The number of accounts to display, which are derived from the mnemonic. Defaults to 1.

{{#include common-options.md}}

### EXAMPLES

1. Create a new mnemonic with 24 words.
    ```sh
    cast new-mnemonic --words 24
    ```

### SEE ALSO

[cast](./cast.md)
