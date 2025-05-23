# forge verify-bytecode

Verify the deployed bytecode against its source on Etherscan

```bash
$ forge verify-bytecode --help
```

```txt
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

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --ignore <BYTECODE_TYPE>
          Ignore verification for creation or runtime bytecode
          
          [possible values: creation, runtime]

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: sourcify]

          Possible values:
          - etherscan
          - sourcify
          - blockscout
          - oklink
          - custom:     Custom verification provider, requires compatibility
            with the Etherscan API

      --verifier-api-key <VERIFIER_API_KEY>
          The verifier API KEY, if using a custom provider
          
          [env: VERIFIER_API_KEY=]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]

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
          - 5 (-vvvvv): Print execution and setup traces for all tests,
          including storage changes.
```