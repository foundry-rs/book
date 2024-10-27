# cast 4byte-decode

Decode ABI-encoded calldata using https://openchain.xyz

```bash
$ cast 4byte-decode --help
```

```txt
Usage: cast 4byte-decode [OPTIONS] [CALLDATA]

Arguments:
  [CALLDATA]
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the decoded calldata as JSON

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