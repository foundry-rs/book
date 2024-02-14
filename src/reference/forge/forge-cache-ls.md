## `spark cache ls`

### NAME

spark-cache-ls - Shows cached data from ``~/.foxar``.

### SYNOPSIS

`spark cache ls` [*chains..*]

### DESCRIPTION

Lists what is in the `~/.foxar/cache` folder currently.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Show the entire cache (also, ``spark cache ls`` is an alias for this)
    ```sh
    spark cache ls all
    ```

2. Show cache data for a specific chain, by name
    ```sh
    spark cache ls rinkeby
    ```
   
3. Specify multiple chains
    ```sh
    spark cache ls rinkeby mainnet
    ```

### SEE ALSO
[spark](./spark.md), [spark cache](./spark-cache.md)