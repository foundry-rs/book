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
          The color of the log messages

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

  -v, --verbosity...
          Verbosity level of the log messages.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Depending on the context the verbosity levels have different meanings.
          
          For example, the verbosity levels of the EVM are:
          - 2 (-vv): Print logs for all tests.
          - 3 (-vvv): Print execution traces for failing tests.
          - 4 (-vvvv): Print execution traces for all tests, and setup traces
          for failing tests.
          - 5 (-vvvvv): Print execution and setup traces for all tests.
```