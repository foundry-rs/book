# forge cache clean

Cleans cached data from the global foundry directory

```bash
$ forge cache clean --help
```

```txt
Usage: forge cache clean [OPTIONS] [CHAINS]...

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

Display options:
      --color <COLOR>
          Log messages coloring

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```