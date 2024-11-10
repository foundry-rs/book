# cast from-fixed-point

Convert a fixed point number into an integer

```bash
$ cast from-fixed-point --help
```

```txt
Usage: cast from-fixed-point [OPTIONS] [DECIMALS] [VALUE]

Arguments:
  [DECIMALS]
          The number of decimals to use

  [VALUE]
          The value to convert

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