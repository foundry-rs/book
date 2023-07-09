## cast from-rlp

### NAME

cast-from-rlp - Decodes RLP-encoded data.

### SYNOPSIS

``cast from-rlp`` *data*

### DESCRIPTION

Decodes RLP-encoded data.

The *data* is a hexadecimal string with optional 0x prefix.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Decode RLP data:
    ```sh
    cast from-rlp 0xc481f181f2

    cast from-rlp c481f181f2
    ```
