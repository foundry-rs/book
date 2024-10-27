# cast index

Compute the storage slot for an entry in a mapping

```bash
$ cast index --help
```

```txt
Usage: cast index [OPTIONS] <KEY_TYPE> <KEY> <SLOT_NUMBER>

Arguments:
  <KEY_TYPE>
          The mapping key type

  <KEY>
          The mapping key

  <SLOT_NUMBER>
          The storage slot of the mapping

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