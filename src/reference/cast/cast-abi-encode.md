## cast abi-encode

### NAME

cast-abi-encode - ABI encode the given function arguments, excluding the selector.

### SYNOPSIS

``cast abi-encode`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI encode the given function, excluding the selector.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    cast abi-encode "someFunc(address,uint256)" 0x... 1
    ```

2. For encoding a type with components (as a tuple, or custom struct):

    ```sh
    cast abi-encode "someFunc((string,uint256))" "(myString,1)"
    ```

### SEE ALSO

[cast](./cast.md), [cast calldata](./cast-calldata.md)
