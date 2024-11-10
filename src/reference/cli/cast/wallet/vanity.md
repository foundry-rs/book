# cast wallet vanity

Generate a vanity address

```bash
$ cast wallet vanity --help
```

```txt
Usage: cast wallet vanity [OPTIONS]

Options:
      --starts-with <PATTERN>
          Prefix regex pattern or hex string

      --ends-with <PATTERN>
          Suffix regex pattern or hex string

      --nonce <NONCE>
          Generate a vanity contract address created by the generated keypair
          with the specified nonce

      --save-path <PATH>
          Path to save the generated vanity contract address to.
          
          If provided, the generated vanity addresses will appended to a JSON
          array in the specified file.

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