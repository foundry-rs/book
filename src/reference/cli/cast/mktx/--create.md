# cast mktx --create

Use to deploy raw contract bytecode

```bash
$ cast mktx --create --help
```

```txt
Usage: cast mktx --create [OPTIONS] <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>
          The initialization bytecode of the contract to deploy

  [SIG]
          The signature of the constructor

  [ARGS]...
          The constructor arguments

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