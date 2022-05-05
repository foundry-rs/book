## `forge cache clean`

### NAME

forge-cache-clean - Cleans cached data from `~/.foundry`.

### SYNOPSIS

`forge cache clean` [*options*] [*--*] [*CHAINS*]

### DESCRIPTION

Removes files in the `~/.foundry/cache` folder which is used to cache Etherscan verification status and block data.

### OPTIONS

``

### EXAMPLES

1. Remove the entire cache (also, forge cache clean is an alias for this)
    ```sh
    forge cache clean all
    ```

2. Remove cache data for a specific chain, by name
    ```sh
    forge cache clean <chain>
    ```

3. Remove cache data for a specific block number on a specific chain. Does not work if `chain` is `all`
    ```sh
    forge cache clean <chain> <block number>
    ```

4. Specify multiple chains
    ```sh
    forge cache clean <chain 1> [<chain n...>]
    ```

5. Specify multiple blocks
    ```sh
    forge cache clean <chain...> --blocks <block 1>,<block 2>,<block 3>
    ```

### SEE ALSO
[forge](./forge.md), [forge cache](./forge-cache.md)