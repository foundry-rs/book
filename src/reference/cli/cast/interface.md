# cast interface

Generate a Solidity interface from a given ABI.

```bash
$ cast interface --help
```

```txt
Usage: cast interface [OPTIONS] <CONTRACT>

Arguments:
  <CONTRACT>
          The target contract, which can be one of: - A file path to an ABI JSON
          file. - A contract identifier in the form `<path>:<contractname>` or
          just `<contractname>`. - An Ethereum address, for which the ABI will
          be fetched from Etherscan

Options:
  -n, --name <NAME>
          The name to use for the generated interface.
          
          Only relevant when retrieving the ABI from a file.

  -p, --pragma <VERSION>
          Solidity pragma version
          
          [default: ^0.8.4]

  -o, --output <PATH>
          The path to the output file.
          
          If not specified, the interface will be output to stdout.

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
      --color <COLOR>
          The color of the log messages

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

  -v, --verbosity...
          Verbosity level of the log messages.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Depending on the context the verbosity levels have different meanings.
          
          For example, the verbosity levels of the EVM are:
          - 2 (-vv): Print logs for all tests.
          - 3 (-vvv): Print execution traces for failing tests.
          - 4 (-vvvv): Print execution traces for all tests, and setup traces
          for failing tests.
          - 5 (-vvvvv): Print execution and setup traces for all tests.
```