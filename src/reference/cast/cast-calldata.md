## cast calldata

### NAME

cast-calldata - ABI-encode a function with arguments.

### SYNOPSIS

``cast calldata`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI-encode a function with arguments.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    cast calldata "someFunc(address,uint256)" 0x... 1
    ```

### SEE ALSO

[cast](./cast.md), [cast abi-encode](./cast-abi-encode.md)
