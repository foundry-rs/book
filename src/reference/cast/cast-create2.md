## cast create2

### NAME

cast-create2 - Generate a deterministic contract address using CREATE2

### SYNOPSIS

``cast create2`` [*options*]

### DESCRIPTION

Generate a deterministic contract address using CREATE2

### OPTIONS

`--starts-with` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Prefix for the contract address.

`--ends-with` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Suffix for the contract address

`--matching` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Sequence that the address has to match

`--case-sensitive`
&nbsp;&nbsp;&nbsp;&nbsp;Case sensitive matching

`--deployer` *address*
&nbsp;&nbsp;&nbsp;&nbsp;Address of the contract deployer [default: `0x4e59b44847b379578588920ca78fbf26c0b4956c`]

`--init-code` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Init code of the contract to be deployed

`--init-code-hash` *hash*
&nbsp;&nbsp;&nbsp;&nbsp;Init code hash of the contract to be deployed

`--jobs` *jobs*
&nbsp;&nbsp;&nbsp;&nbsp;Number of threads to use. Defaults to and caps at the number of logical cores

`--caller` *address*
&nbsp;&nbsp;&nbsp;&nbsp;Address of the caller. Used for the first 20 bytes of the salt

{{#include common-options.md}}

### EXAMPLES

1. Generate a contract address that starts with `dead`:
    ```sh
    cast create2 --starts-with dead
    ```
2. Generate a contract address that ends with `beef`:
    ```sh
    cast create2 --ends-with beef
    ```
3. A more complex example:
    ```sh
    cast create2 --starts-with dead --case-sensitive --deployer 0x0000000000FFe8B47B3e2130213B802212439497 --init-code-hash 0x0c591f26891d6443cf08c5be3584c1e6ae10a4c2f07c5c53218741e9755fb9cd
    ```

### SEE ALSO

[cast](./cast.md), [cast compute-address](./cast-compute-address.md)

