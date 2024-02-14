# spark cache clean

Cleans cached data from the global foxar directory

```bash
$ spark cache clean --help
Usage: spark cache clean [OPTIONS] [CHAINS]...

Arguments:
  [CHAINS]...
          The chains to clean the cache for.
          
          Can also be "all" to clean all chains.
          
          [env: CHAIN=]
          [default: all]

Options:
  -b, --blocks <BLOCKS>...
          The blocks to clean the cache for

      --etherscan
          Whether to clean the Etherscan cache

  -h, --help
          Print help (see a summary with '-h')
```