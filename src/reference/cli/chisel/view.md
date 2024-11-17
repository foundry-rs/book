# chisel view

View the source of a cached session

```bash
$ chisel view --help
```

```txt
Usage: chisel view [OPTIONS] <ID>

Arguments:
  <ID>
          The ID of the session to load

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
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

  -q, --quiet
          Do not print log messages

      --json
          Format log messages as JSON

      --color <COLOR>
          The color of the log messages

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output
```