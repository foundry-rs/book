# cast abi-encode

ABI encode the given function argument, excluding the selector

```bash
$ cast abi-encode --help
```

```txt
Usage: cast abi-encode [OPTIONS] <SIG> [ARGS]...

Arguments:
  <SIG>
          The function signature

  [ARGS]...
          The arguments of the function

Options:
      --packed
          Whether to use packed encoding

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