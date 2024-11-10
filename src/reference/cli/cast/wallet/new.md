# cast wallet new

Create a new random keypair

```bash
$ cast wallet new --help
```

```txt
Usage: cast wallet new [OPTIONS] [PATH]

Arguments:
  [PATH]
          If provided, then keypair will be written to an encrypted JSON
          keystore

Options:
  -p, --password
          Triggers a hidden password prompt for the JSON keystore.
          
          Deprecated: prompting for a hidden password is now the default.

      --unsafe-password <PASSWORD>
          Password for the JSON keystore in cleartext.
          
          This is UNSAFE to use and we recommend using the --password.
          
          [env: CAST_PASSWORD=]

  -n, --number <NUMBER>
          Number of wallets to generate
          
          [default: 1]

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