# cast from-wei

Convert wei into an ETH amount.

```bash
$ cast from-wei --help
```

```txt
Usage: cast from-wei [OPTIONS] [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert from (ether, gwei, wei)
          
          [default: eth]

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

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```