# cast abi-decode

Decode ABI-encoded input or output data.

```bash
$ cast abi-decode --help
```

```txt
Usage: cast abi-decode [OPTIONS] <SIG> <CALLDATA>

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  <CALLDATA>
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')

Decode input data instead of output data:
  -i, --input
          Whether to decode the input or output data

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