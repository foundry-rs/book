# cast from-rlp

Decodes RLP hex-encoded data

```bash
$ cast from-rlp --help
```

```txt
Usage: cast from-rlp [OPTIONS] [VALUE]

Arguments:
  [VALUE]
          The RLP hex-encoded data

Options:
      --as-int
          Decode the RLP data as int

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