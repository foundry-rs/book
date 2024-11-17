# cast wallet vanity

Generate a vanity address

```bash
$ cast wallet vanity --help
```

```txt
Usage: cast wallet vanity [OPTIONS]

Options:
      --starts-with <PATTERN>
          Prefix regex pattern or hex string

      --ends-with <PATTERN>
          Suffix regex pattern or hex string

      --nonce <NONCE>
          Generate a vanity contract address created by the generated keypair
          with the specified nonce

      --save-path <PATH>
          Path to save the generated vanity contract address to.
          
          If provided, the generated vanity addresses will appended to a JSON
          array in the specified file.

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