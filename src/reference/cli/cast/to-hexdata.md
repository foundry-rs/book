# cast to-hexdata

Normalize the input to lowercase, 0x-prefixed hex.

```bash
$ cast to-hexdata --help
```

```txt
Usage: cast to-hexdata [OPTIONS] [INPUT]

Arguments:
  [INPUT]
          The input to normalize

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