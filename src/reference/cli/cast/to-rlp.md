# cast to-rlp

RLP encodes hex data, or an array of hex data.

```bash
$ cast to-rlp --help
```

```txt
Usage: cast to-rlp [OPTIONS] [VALUE]

Arguments:
  [VALUE]
          The value to convert.
          
          This is a hex-encoded string, or an array of hex-encoded strings. Can
          be arbitrarily recursive.

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