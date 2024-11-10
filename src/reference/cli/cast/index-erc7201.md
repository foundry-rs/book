# cast index-erc7201

Compute storage slots as specified by `ERC-7201: Namespaced Storage Layout`

```bash
$ cast index-erc7201 --help
```

```txt
Usage: cast index-erc7201 [OPTIONS] [ID]

Arguments:
  [ID]
          The arbitrary identifier

Options:
      --formula-id <FORMULA_ID>
          The formula ID. Currently the only supported formula is `erc7201`
          
          [default: erc7201]

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