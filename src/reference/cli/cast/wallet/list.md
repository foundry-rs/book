# cast wallet list

List all the accounts in the keystore default directory

```bash
$ cast wallet list --help
Usage: cast wallet list [OPTIONS]

Options:
      --dir [<DIR>]                List all the accounts in the keystore directory. Default keystore
                                   directory is used if no path provided
  -l, --ledger                     List accounts from a Ledger hardware wallet
  -t, --trezor                     List accounts from a Trezor hardware wallet
      --aws                        List accounts from AWS KMS
      --all                        List all configured accounts
  -m, --max-senders <MAX_SENDERS>  Max number of addresses to display from hardware wallets
                                   [default: 3]
  -h, --help                       Print help
```