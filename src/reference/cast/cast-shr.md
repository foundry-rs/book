## probe shr

### NAME

probe-shr - Perform a right shifting operation.

### SYNOPSIS

``probe shr`` [*options*] *value* *shift*

### DESCRIPTION

Perform a right shifting operation.

### OPTIONS

{{#include ../common/base-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Perform a single right bit shift of 0x12
    ```sh
    probe shr --base-in 16 0x12 1
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[probe](./probe.md), [probe shl](./probe-shl.md)
