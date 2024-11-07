# cast format-units

Format a number from smallest unit to decimal with arbitrary decimals.

```bash
$ cast format-units --help
```

```txt
Usage: cast format-units [OPTIONS] [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to format

  [UNIT]
          The unit to format to
          
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