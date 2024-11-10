# cast wallet

Wallet management utilities

```bash
$ cast wallet --help
```

```txt
Usage: cast wallet [OPTIONS] <COMMAND>

Commands:
  new               Create a new random keypair [aliases: n]
  new-mnemonic      Generates a random BIP39 mnemonic phrase [aliases: nm]
  vanity            Generate a vanity address [aliases: va]
  address           Convert a private key to an address [aliases: a, addr]
  sign              Sign a message or typed data [aliases: s]
  sign-auth         EIP-7702 sign authorization [aliases: sa]
  verify            Verify the signature of a message [aliases: v]
  import            Import a private key into an encrypted keystore [aliases: i]
  list              List all the accounts in the keystore default directory
                    [aliases: ls]
  private-key       Derives private key from mnemonic [aliases: pk]
  decrypt-keystore  Decrypt a keystore file to get the private key [aliases: dk]
  help              Print this message or the help of the given subcommand(s)

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

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```