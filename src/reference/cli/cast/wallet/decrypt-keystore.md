# cast wallet decrypt-keystore

Decrypt a keystore file to get the private key

```bash
$ cast wallet decrypt-keystore --help
```

```txt
Usage: cast wallet decrypt-keystore [OPTIONS] <ACCOUNT_NAME>

Arguments:
  <ACCOUNT_NAME>
          The name for the account in the keystore

Options:
  -k, --keystore-dir <KEYSTORE_DIR>
          If not provided, keystore will try to be located at the default
          keystores directory (~/.foundry/keystores)

      --unsafe-password <PASSWORD>
          Password for the JSON keystore in cleartext This is unsafe, we
          recommend using the default hidden password prompt
          
          [env: CAST_UNSAFE_PASSWORD=]

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