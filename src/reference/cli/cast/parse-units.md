# cast parse-units

Convert a number from decimal to smallest unit with arbitrary decimals.

```bash
$ cast parse-units --help
```

```txt
Usage: cast parse-units [OPTIONS] [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert to
          
          [default: 18]

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