# cast min-int

Prints the minimum value of the given integer type

```bash
$ cast min-int --help
```

```txt
Usage: cast min-int [OPTIONS] [TYPE]

Arguments:
  [TYPE]
          The integer type to get the minimum value of
          
          [default: int256]

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