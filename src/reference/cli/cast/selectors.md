# cast selectors

Extracts function selectors and arguments from bytecode

```bash
$ cast selectors --help
```

```txt
Usage: cast selectors [OPTIONS] <BYTECODE>

Arguments:
  <BYTECODE>
          The hex encoded bytecode

Options:
  -r, --resolve
          Resolve the function signatures for the extracted selectors using
          https://openchain.xyz

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