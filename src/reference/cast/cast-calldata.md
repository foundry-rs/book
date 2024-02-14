## probe calldata

### NAME

probe-calldata - ABI-encode a function with arguments.

### SYNOPSIS

``probe calldata`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI-encode a function with arguments.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    probe calldata "someFunc(address,uint256)" 0x... 1
    ```

### SEE ALSO

[probe](./probe.md), [probe abi-encode](./probe-abi-encode.md)
