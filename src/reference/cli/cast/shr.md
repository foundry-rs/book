# cast shr

Perform a right shifting operation

```bash
$ cast shr --help
```

```txt
Usage: cast shr [OPTIONS] <VALUE> <BITS>

Arguments:
  <VALUE>
          The value to shift

  <BITS>
          The number of bits to shift

Options:
      --base-in <BASE_IN>
          The input base,

      --base-out <BASE_OUT>
          The output base,
          
          [default: 16]

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