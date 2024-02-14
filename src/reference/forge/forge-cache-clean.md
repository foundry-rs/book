## `spark cache clean`

### NAME

spark-cache-clean - Cleans cached data from `~/.foxar`.

### SYNOPSIS

`spark cache clean` [*options*] [*--*] [*chains..*]

### DESCRIPTION

Removes files in the `~/.foxar/cache` folder which is used to cache Etherscan verification status and block data.

### OPTIONS

`-b`  
`--blocks`  
&nbsp;&nbsp;&nbsp;&nbsp;One or more block numbers separated by comma with no spaces

`--etherscan`
&nbsp;&nbsp;&nbsp;&nbsp;A boolean flag that specifies to only remove the block explorer portion of the cache

{{#include common-options.md}}

### EXAMPLES

1. Remove the entire cache (also, `spark cache clean` is an alias for this)

   ```sh
   spark cache clean all
   ```

2. Remove the entire block explorer cache

   ```sh
   spark cache clean all --etherscan
   ```

3. Remove cache data for a specific chain, by name

   ```sh
   spark cache clean rinkeby
   ```

4. Remove cache data for a specific block number on a specific chain. Does not work if `chain` is `all`

   ```sh
   spark cache clean rinkeby -b 150000
   ```

5. Remove block explorer cache data for a specific chain. Does not work if `--blocks` are specified.

   ```sh
   spark cache clean rinkeby --etherscan
   ```

6. Specify multiple chains

   ```sh
   spark cache clean rinkeby mainnet
   ```

7. Specify multiple blocks
   ```sh
   spark cache clean rinkeby --blocks 530000,9000000,9200000
   ```

### SEE ALSO
[spark](./spark.md), [spark cache](./spark-cache.md)
