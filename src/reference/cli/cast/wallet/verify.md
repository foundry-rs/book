# cast wallet verify

Verify the signature of a message

```bash
$ cast wallet verify --help
```

```txt
Usage: cast wallet verify [OPTIONS] --address <ADDRESS> <MESSAGE> <SIGNATURE>

Arguments:
  <MESSAGE>
          The original message

  <SIGNATURE>
          The signature to verify

Options:
  -a, --address <ADDRESS>
          The address of the message signer

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