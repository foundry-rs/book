## `forge cache ls`

### NAME

forge-cache-ls - Shows cached data from ``~/.foundry``.

### SYNOPSIS

`forge cache ls` [*chains..*]

### DESCRIPTION

Lists what is in the `~/.foundry/cache` folder currently.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Show the entire cache (also, ``forge cache ls`` is an alias for this)
    ```sh
    forge cache ls all
    ```

2. Show cache data for a specific chain, by name
    ```sh
    forge cache ls rinkeby
    ```
   
3. Specify multiple chains
    ```sh
    forge cache ls rinkeby mainnet
    ```

### SEE ALSO
[forge](./forge.md), [forge cache](./forge-cache.md)