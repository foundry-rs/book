# cast wallet vanity

Generate a vanity address

```bash
$ cast wallet vanity --help
Usage: cast wallet vanity [OPTIONS]

Options:
      --starts-with <HEX>
          Prefix for the vanity address

      --ends-with <HEX>
          Suffix for the vanity address

      --nonce <NONCE>
          Generate a vanity contract address created by the generated keypair with the specified
          nonce

      --save-path <PATH>
          Path to save the generated vanity contract address to.
          
          If provided, the generated vanity addresses will appended to a JSON array in the specified
          file.

  -h, --help
          Print help (see a summary with '-h')
```