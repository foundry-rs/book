# probe wallet sign

Sign a message or typed data

```bash
$ probe wallet sign --help
Usage: probe wallet sign [OPTIONS] <MESSAGE>

Arguments:
  <MESSAGE>
          The message or typed data to sign.
          
          Messages starting with 0x are expected to be hex encoded, which get decoded before being signed. The message will be prefixed with the Ethereum Signed Message header and hashed before signing.
          
          Typed data can be provided as a json string or a file name. Use --data flag to denote the message is a string of typed data. Use --data --from-file to denote the message is a file name containing typed data. The data will be
          combined and hashed using the EIP712 specification before signing. The data should be formatted as JSON.

Options:
      --data
          If provided, the message will be treated as typed data

      --from-file
          If provided, the message will be treated as a file name containing typed data. Requires --data

  -h, --help
          Print help (see a summary with '-h')

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foxar/keystores) by its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```