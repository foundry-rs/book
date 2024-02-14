## probe shl

### NAME

probe-shl - Perform a left shifting operation.

### SYNOPSIS

``probe shl`` [*options*] *value* *shift*

### DESCRIPTION

Perform a left shifting operation.

### OPTIONS

{{#include ../common/base-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Perform a 3 position left bit shift of the number 61
    ```sh
    probe shl --base-in 10 61 3
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[probe](./probe.md), [probe shr](./probe-shr.md)
