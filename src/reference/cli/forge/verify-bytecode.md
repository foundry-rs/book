# forge verify-bytecode

Verify the deployed bytecode against its source

```bash
$ forge verify-bytecode --help
```

```txt
Usage: forge verify-bytecode [OPTIONS] <ADDRESS> <CONTRACT> [ROOT]

Arguments:
  <ADDRESS>
          The address of the contract to verify

  <CONTRACT>
          The contract identifier in the form `<path>:<contractname>`

  [ROOT]
          The path to the project's root directory

Options:
      --block <BLOCK>
          The block at which the bytecode should be verified

      --constructor-args <ARGS>
          The constructor args to generate the creation code
          
          [aliases: encoded-constructor-args]

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

  -r, --rpc-url <RPC_URL>
          The rpc url to use for verification
          
          [env: ETH_RPC_URL=]

      --verification-type <TYPE>
          Verfication Type: `full` or `partial`. Ref:
          <https://docs.sourcify.dev/docs/full-vs-partial-match/>
          
          [default: full]
          [possible values: full, partial]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

      --json
          Suppress logs and emit json results to stdout

  -h, --help
          Print help (see a summary with '-h')

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout, oklink]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]

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