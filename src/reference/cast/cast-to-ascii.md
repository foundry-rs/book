## probe to-ascii

### NAME

probe-to-ascii - Convert hex data to an ASCII string.

### SYNOPSIS

``probe to-ascii`` [*options*] *text*

### DESCRIPTION

Convert hex data to an ASCII string.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert hex data to an ASCII string:
    ```sh
    probe to-ascii "0x68656c6c6f"
    ```

### SEE ALSO

[probe](./probe.md)
