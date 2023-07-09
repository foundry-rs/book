## cast parse-bytes32-string

### NAME

cast-parse-bytes32-string - Parses a string from bytes32 encoding.

### SYNOPSIS

``cast parse-bytes32-string`` [*options*] *bytes*

### DESCRIPTION

Parses a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) from its bytes32 encoding representation mostly by interpreting bytes as ASCII characters. This command undos the encoding in [--format-bytes32-string](./cast-format-bytes32-string.md).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Parse bytes32 string encoding of "hello" back to the string representation:
    ```sh
    cast parse-bytes32-string "0x68656c6c6f000000000000000000000000000000000000000000000000000000"
    ```

### SEE ALSO

[cast](./cast.md)
