## cast to-bytes32

### NAME

cast-to-bytes32 - Right-pads hex data to 32 bytes.

### SYNOPSIS

``cast to-bytes32`` [*options*] *bytes*

### DESCRIPTION

Right-pads hex data to 32 bytes.

Note that this command is for padding a byte string only. If you're looking to format a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) into `bytes32`, use [format-bytes32-string](./cast-format-bytes32-string.md) instead.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)
