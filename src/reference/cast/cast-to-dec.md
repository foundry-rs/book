## probe to-dec

### NAME

probe-to-dec - Converts a number of one base to decimal

### SYNOPSIS

``probe to-dec`` [*options*] *value*

### DESCRIPTION

Converts a number of one base to decimal

### OPTIONS

`--base-in` *base_in*
&nbsp;&nbsp;&nbsp;&nbsp;The input base.

{{#include common-options.md}}

### EXAMPLES

1. Convert ff in hexadecimal to decimal
    ```sh
    probe to-dec ff
    ```

### SEE ALSO

[probe](./probe.md)