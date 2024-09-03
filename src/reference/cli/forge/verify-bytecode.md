# forge verify-bytecode

Verify the deployed bytecode against its source on Etherscan

```bash
$ forge verify-bytecode --help
Usage: forge verify-bytecode [OPTIONS] <ADDRESS> <CONTRACT>

Arguments:
  <ADDRESS>
          The address of the contract to verify

  <CONTRACT>
          The contract identifier in the form `<path>:<contractname>`

Options:
      --block <BLOCK>
          The block at which the bytecode should be verified

      --constructor-args <ARGS>...
          The constructor args to generate the creation code

      --encoded-constructor-args <HEX>
          The ABI-encoded constructor arguments

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

  -r, --rpc-url <RPC_URL>
          The rpc url to use for verification
          
          [env: ETH_RPC_URL=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

      --json
          Suppress logs and emit json results to stdout

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

      --ignore <BYTECODE_TYPE>
          Ignore verification for creation or runtime bytecode
          
          [possible values: creation, runtime]

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
```