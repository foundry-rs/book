# cast to-unit

Convert an ETH amount into another unit (ether, gwei or wei).

```bash
$ cast to-unit --help
```

```txt
Usage: cast to-unit [OPTIONS] [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert to (ether, gwei, wei)
          
          [default: wei]

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