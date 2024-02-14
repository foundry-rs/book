## probe parse-bytes32-address

### NAME

probe-parse-bytes32-address - Parses a checksummed address from bytes32 encoding.

### SYNOPSIS

``probe parse-bytes32-address`` [*options*] *bytes*

### DESCRIPTION

Parses a checksummed address from its bytes32 encoding representation.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Parse the bytes32 encoding of the WETH9 contract address to its address representation:
    ```sh
    probe parse-bytes32-address 0x000000000000000000000000C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[probe](./probe.md)
