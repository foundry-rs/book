# chisel eval

Simple evaluation of a command without entering the REPL

```bash
$ chisel eval --help
```

```txt
Usage: chisel eval [OPTIONS] <COMMAND>

Arguments:
  <COMMAND>
          The command to be evaluated

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
      --verbose
          Use verbose output

  -q, --quiet
          Do not print log messages

      --color <COLOR>
          Log messages coloring

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output
```