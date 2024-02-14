## probe from-fixed-point

### NAME

probe-from-fixed-point - Convert a fixed point number into an integer.

### SYNOPSIS

``probe from-fixed-point`` [*options*] *decimals* *value*

### DESCRIPTION

Convert a fixed point number into an integer.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert 10.55 to an integer:
    ```sh
    probe from-fixed-point 2 10.55
    ```

### SEE ALSO

[probe](./probe.md)
