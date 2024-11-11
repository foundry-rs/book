# cast send --create

Use to deploy raw contract bytecode

```bash
$ cast send --create --help
```

```txt
Usage: cast send --create [OPTIONS] <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>
          The bytecode of the contract to deploy

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

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