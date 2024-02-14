## probe calldata-decode

### NAME

probe-calldata-decode - Decode ABI-encoded input data.

### SYNOPSIS

``probe calldata-decode`` [*options*] *sig* *calldata*

### DESCRIPTION

Decode ABI-encoded input data.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Decode input data for a `transfer` call:
    ```sh
    probe calldata-decode "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

### SEE ALSO

[probe](./probe.md), [probe abi-decode](./probe-abi-decode.md)
