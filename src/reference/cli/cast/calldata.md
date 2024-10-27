# cast calldata

ABI-encode a function with arguments

```bash
$ cast calldata --help
```

```txt
Usage: cast calldata [OPTIONS] <SIG> [ARGS]...

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  [ARGS]...
          The arguments to encode

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

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```