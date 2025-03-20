## cast decode-abi

### NAME

cast-decode-abi - Decode ABI-encoded input or output data.

### SYNOPSIS

``cast decode-abi`` [*options*] *sig* *calldata*

### DESCRIPTION

Decode ABI-encoded input or output data.

By default, the command will decode output data. To decode input data, pass `--input` or use [`cast decode-calldata`](./cast-decode-calldata.md).

The signature (*sig*) is a fragment in the form `<function name>(<types...>)(<types...>)`.

### OPTIONS

#### Decoder Options

`-i`  
`--input`  
&nbsp;&nbsp;&nbsp;&nbsp;Decode input data.

{{#include common-options.md}}

### EXAMPLES

1. Decode output data for a `balanceOf` call:
    ```sh
    cast decode-abi "balanceOf(address)(uint256)" \
      0x000000000000000000000000000000000000000000000000000000000000000a
    ```

2. Decode input data for a `transfer` call:
    ```sh
    cast decode-abi --input "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

### SEE ALSO

[cast](./cast.md), [cast decode-calldata](./cast-decode-calldata.md)
