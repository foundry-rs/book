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

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

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