# cast wallet new-mnemonic

Generates a random BIP39 mnemonic phrase

```bash
$ cast wallet new-mnemonic --help
```

```txt
Usage: cast wallet new-mnemonic [OPTIONS]

Options:
  -w, --words <WORDS>
          Number of words for the mnemonic
          
          [default: 12]

  -a, --accounts <ACCOUNTS>
          Number of accounts to display
          
          [default: 1]

  -e, --entropy <ENTROPY>
          Entropy to use for the mnemonic

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