## cast format-bytes32-string

### NAME

cast-format-bytes32-string - Formats a string into bytes32 encoding.

### SYNOPSIS

``cast format-bytes32-string`` [*options*] *string*

### DESCRIPTION

Formats a string into bytes32 encoding.

Note that this command is for formatting a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) into `bytes32` only. If you're looking to pad a byte string, use [to-bytes32](./cast-to-bytes32.md) instead.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Turn string "hello" into bytes32 hex:
    ```sh
    cast format-bytes32-string "hello"
    ```

### SEE ALSO

[cast](./cast.md)
