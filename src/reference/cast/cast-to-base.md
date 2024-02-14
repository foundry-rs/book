## probe to-base

### NAME

probe-to-base - Convert a number of one base to another.

### SYNOPSIS

``probe to-base`` [*options*] *value* *base*

### DESCRIPTION

Convert a number of one base to another.

### OPTIONS

#### Base Options

`--base-in` *base*
&nbsp;&nbsp;&nbsp;&nbsp;The base of the input number. Available options:

&nbsp;&nbsp;&nbsp;&nbsp;10, d, dec, decimal

&nbsp;&nbsp;&nbsp;&nbsp;16, h, hex, hexadecimal

{{#include common-options.md}}

### EXAMPLES

1. Convert the decimal number 64 to hexadecimal
    ```sh
    probe to-base 64 hex
    ```

2. Convert the hexadecimal number 100 to binary
    ```sh
    probe to-base 0x100 2
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[probe](./probe.md)
