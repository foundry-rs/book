# cast string-decode

Decode ABI-encoded string.

```bash
$ cast string-decode --help
```

```txt
Usage: cast string-decode [OPTIONS] <DATA>

Arguments:
  <DATA>
          The ABI-encoded string

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the decoded string as JSON

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