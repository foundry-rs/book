# cast wallet decrypt-keystore

Decrypt a keystore file to get the private key

```bash
$ cast wallet decrypt-keystore --help
Usage: cast wallet decrypt-keystore [OPTIONS] <ACCOUNT_NAME>

Arguments:
  <ACCOUNT_NAME>  The name for the account in the keystore

Options:
  -k, --keystore-dir <KEYSTORE_DIR>  If not provided, keystore will try to be located at the default
                                     keystores directory (~/.foundry/keystores)
      --unsafe-password <PASSWORD>   Password for the JSON keystore in cleartext This is unsafe, we
                                     recommend using the default hidden password prompt [env:
                                     CAST_UNSAFE_PASSWORD=]
  -h, --help                         Print help
```