# cast wallet list

List all the accounts in the keystore default directory

```bash
$ cast wallet list --help
```

```txt
Usage: cast wallet list [OPTIONS]

Options:
      --dir [<DIR>]
          List all the accounts in the keystore directory. Default keystore
          directory is used if no path provided

  -l, --ledger
          List accounts from a Ledger hardware wallet

  -t, --trezor
          List accounts from a Trezor hardware wallet

      --aws
          List accounts from AWS KMS

      --all
          List all configured accounts

  -m, --max-senders <MAX_SENDERS>
          Max number of addresses to display from hardware wallets
          
          [default: 3]

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