## `forge cache clean`

### NAME

forge-cache-clean - Cleans cached data from `~/.foundry`.

### SYNOPSIS

`forge cache clean` [*options*] [*--*] [*chains..*]

### DESCRIPTION

Removes files in the `~/.foundry/cache` folder which is used to cache Etherscan verification status and block data.

### OPTIONS

`-b`  
`--blocks`  
&nbsp;&nbsp;&nbsp;&nbsp;One or more block numbers separated by comma with no spaces

{{#include common-options.md}}

### EXAMPLES

1. Remove the entire cache (also, ``forge cache clean`` is an alias for this)
    ```sh
    forge cache clean all
    ```

2. Remove cache data for a specific chain, by name
    ```sh
    forge cache clean rinkeby
    ```

3. Remove cache data for a specific block number on a specific chain. Does not work if `chain` is `all`
    ```sh
    forge cache clean rinkeby -b 150000
    ```

4. Specify multiple chains
    ```sh
    forge cache clean rinkeby mainnet
    ```

5. Specify multiple blocks
    ```sh
    forge cache clean rinkeby --blocks 530000,9000000,9200000
    ```

### SEE ALSO
[forge](./forge.md), [forge cache](./forge-cache.md)