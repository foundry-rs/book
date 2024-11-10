# cast sig

Get the selector for a function

```bash
$ cast sig --help
```

```txt
Usage: cast sig [OPTIONS] [SIG] [OPTIMIZE]

Arguments:
  [SIG]
          The function signature, e.g. transfer(address,uint256)

  [OPTIMIZE]
          Optimize signature to contain provided amount of leading zeroes in
          selector

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

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```