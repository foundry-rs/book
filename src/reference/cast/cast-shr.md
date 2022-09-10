## cast shr

### NAME

cast-shr - Perform a right shifting operation.

### SYNOPSIS

``cast shr`` [*options*] *value* *shift*

### DESCRIPTION

Perform a left shifting operation.

### OPTIONS

{{#include ../common/base-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Perform a single right bit shift of 0x12
    ```sh
    cast shr --base-in 16 0x12 1
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[cast](./cast.md), [cast shl](./cast-shl.md)
