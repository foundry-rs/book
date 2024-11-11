# cast disassemble

Disassembles hex encoded bytecode into individual / human readable opcodes

```bash
$ cast disassemble --help
```

```txt
Usage: cast disassemble [OPTIONS] <BYTECODE>

Arguments:
  <BYTECODE>
          The hex encoded bytecode

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