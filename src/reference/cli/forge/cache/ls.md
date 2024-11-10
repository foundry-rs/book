# forge cache ls

Shows cached data from the global foundry directory

```bash
$ forge cache ls --help
```

```txt
Usage: forge cache ls [OPTIONS] [CHAINS]...

Arguments:
  [CHAINS]...
          The chains to list the cache for.
          
          Can also be "all" to list all chains.
          
          [env: CHAIN=]
          [default: all]

Options:
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