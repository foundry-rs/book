# cast max-uint

Prints the maximum value of the given integer type

```bash
$ cast max-uint --help
```

```txt
Usage: cast max-uint [OPTIONS] [TYPE]

Arguments:
  [TYPE]
          The unsigned integer type to get the maximum value of
          
          [default: uint256]

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