## probe namehash

### NAME

probe-namehash - Calculate the ENS namehash of a name.

### SYNOPSIS

``probe namehash`` [*options*] *name*

### DESCRIPTION

Calculate the ENS namehash of a name.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Calculate the namehash of an ENS name.
    ```sh
    probe namehash vitalik.eth
    ```

### SEE ALSO

[probe](./probe.md), [probe lookup-address](./probe-lookup-address.md), [probe resolve-name](./probe-resolve-name.md)
