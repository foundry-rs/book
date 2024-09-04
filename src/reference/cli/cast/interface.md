# cast interface

Generate a Solidity interface from a given ABI.

```bash
$ cast interface --help
Usage: cast interface [OPTIONS] <PATH_OR_ADDRESS>

Arguments:
  <PATH_OR_ADDRESS>
          The contract address, or the path to an ABI file.
          
          If an address is specified, then the ABI is fetched from Etherscan.

Options:
  -n, --name <NAME>
          The name to use for the generated interface

  -p, --pragma <VERSION>
          Solidity pragma version
          
          [default: ^0.8.4]

  -o, --output <PATH>
          The path to the output file.
          
          If not specified, the interface will be output to stdout.

  -j, --json
          If specified, the interface will be output as JSON rather than Solidity

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')
```