## probe abi-encode

### NAME

probe-abi-encode - ABI encode the given function arguments, excluding the selector.

### SYNOPSIS

``probe abi-encode`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI encode the given function, excluding the selector.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    probe abi-encode "someFunc(address,uint256)" 0x... 1
    ```

2. For encoding a type with components (as a tuple, or custom struct):

    ```sh
    probe abi-encode "someFunc((string,uint256))" "(myString,1)"
    ```

### SEE ALSO

[probe](./probe.md), [probe calldata](./probe-calldata.md)
