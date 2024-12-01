# forge verify-contract

Verify smart contracts on Etherscan

```bash
$ forge verify-contract --help
```

```txt
Usage: forge verify-contract [OPTIONS] <ADDRESS> [CONTRACT]

Arguments:
  <ADDRESS>
          The address of the contract to verify

  [CONTRACT]
          The contract identifier in the form `<path>:<contractname>`

Options:
      --constructor-args <ARGS>
          The ABI-encoded constructor arguments
          
          [aliases: encoded-constructor-args]

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

      --guess-constructor-args
          Try to extract constructor arguments from on-chain creation code

      --compiler-version <VERSION>
          The `solc` version to use to build the smart contract

      --compilation-profile <PROFILE_NAME>
          The compilation profile to use to build the smart contract

      --num-of-optimizations <NUM>
          The number of optimization runs used to build the smart contract
          
          [aliases: optimizer-runs]

      --flatten
          Flatten the source code before verifying

  -f, --force
          Do not compile the flattened smart contract before verifying (if
          --flatten is passed)

      --skip-is-verified-check
          Do not check if the contract is already verified before verifying

      --watch
          Wait for verification result after submission

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --show-standard-json-input
          Prints the standard json compiler input.
          
          The standard json compiler input can be used to manually submit
          contract verification in the browser.

      --via-ir
          Use the Yul intermediate representation compilation pipeline

      --evm-version <EVM_VERSION>
          The EVM version to use.
          
          Overrides the version specified in the config.

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL with fast mode
          (<https://rpc.flashbots.net/fast>).
          
          This shares the transaction privately with all registered builders.
          
          See:
          <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example,
          the following can be used to simulate a CL `engine_forkchoiceUpdated`
          call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

      --rpc-timeout <RPC_TIMEOUT>
          Timeout for the RPC request in seconds.
          
          The specified timeout will be used to override the default timeout for
          RPC requests.
          
          Default value: 45
          
          [env: ETH_RPC_TIMEOUT=]

      --rpc-headers <RPC_HEADERS>
          Specify custom headers for RPC requests
          
          [env: ETH_RPC_HEADERS=]

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply in between verification attempts, in seconds
          
          [default: 5]

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]

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