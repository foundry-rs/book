# forge verify-bytecode

Verify the deployed bytecode against its source

```bash
$ forge verify-bytecode --help
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
```