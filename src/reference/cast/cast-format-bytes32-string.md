## probe format-bytes32-string

### NAME

probe-format-bytes32-string - Formats a string into bytes32 encoding.

### SYNOPSIS

``probe format-bytes32-string`` [*options*] *string*

### DESCRIPTION

Formats a string into bytes32 encoding.

Note that this command is for formatting a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) into `bytes32` only. If you're looking to pad a byte string, use [to-bytes32](./probe-to-bytes32.md) instead.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Turn string "hello" into bytes32 hex:
    ```sh
    probe format-bytes32-string "hello"
    ```

### SEE ALSO

[probe](./probe.md)
