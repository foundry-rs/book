# cast bind

Generate a rust binding from a given ABI

```bash
$ cast bind --help
```

```txt
Usage: cast bind [OPTIONS] <PATH_OR_ADDRESS>

Arguments:
  <PATH_OR_ADDRESS>
          The contract address, or the path to an ABI Directory
          
          If an address is specified, then the ABI is fetched from Etherscan.

Options:
  -o, --output-dir <PATH>
          Path to where bindings will be stored

      --crate-name <NAME>
          The name of the Rust crate to generate.
          
          This should be a valid crates.io crate name. However, this is
          currently not validated by this command.
          
          [default: foundry-contracts]

      --crate-version <VERSION>
          The version of the Rust crate to generate.
          
          This should be a standard semver version string. However, it is not
          currently validated by this command.
          
          [default: 0.0.1]

      --separate-files
          Generate bindings as separate files

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