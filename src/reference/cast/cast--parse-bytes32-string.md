## cast --parse-bytes32-string

### NAME

cast---parse-bytes32-string - Parses a string from bytes32 encoding.

### SYNOPSIS

``cast --parse-bytes32-string`` [*options*] *bytes*

### DESCRIPTION

Parses a string from bytes32 encoding.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Parse bytes32 string encoding of "hello" back to the string representation:
    ```sh
    cast --parse-bytes32-string "0x68656c6c6f000000000000000000000000000000000000000000000000000000"
    ```

### SEE ALSO

[cast](./cast.md)
