## cast resolve-name

### NAME

cast-resolve-name - Perform an ENS lookup.

### SYNOPSIS

``cast resolve-name`` [*options*] *who*

### DESCRIPTION

Perform an ENS lookup.

If `--verify` is passed, then a reverse lookup is performed after the normal lookup to verify that the name is correct.

### OPTIONS

#### Lookup Options

`-v`  
`--verify`  
&nbsp;&nbsp;&nbsp;&nbsp;Perform a reverse lookup to verify that the name is correct.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the address for an ENS name.
    ```sh
    cast resolve-name vitalik.eth
    ```

2. Perform both a normal and a reverse lookup:
    ```sh
    cast resolve-name --verify vitalik.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast lookup-address](./cast-lookup-address.md)
