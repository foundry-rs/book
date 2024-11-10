# cast wallet new-mnemonic

Generates a random BIP39 mnemonic phrase

```bash
$ cast wallet new-mnemonic --help
```

```txt
Usage: cast wallet new-mnemonic [OPTIONS]

Options:
  -w, --words <WORDS>
          Number of words for the mnemonic
          
          [default: 12]

  -a, --accounts <ACCOUNTS>
          Number of accounts to display
          
          [default: 1]

  -e, --entropy <ENTROPY>
          Entropy to use for the mnemonic

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