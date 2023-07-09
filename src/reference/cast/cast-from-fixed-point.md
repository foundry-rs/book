## cast from-fixed-point

### NAME

cast-from-fix - Convert a fixed point number into an integer.

### SYNOPSIS

``cast from-fix`` [*options*] *decimals* *value*

### DESCRIPTION

Convert a fixed point number into an integer.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert 10.55 to an integer:
    ```sh
    cast from-fixed-point 2 10.55
    ```

### SEE ALSO

[cast](./cast.md)
