# cast run

Runs a published transaction in a local environment and prints the trace

```bash
$ cast run --help
```

```txt
Usage: cast run [OPTIONS] <TX_HASH>

Arguments:
  <TX_HASH>
          The transaction hash

Options:
  -d, --debug
          Opens the transaction in the debugger

      --decode-internal
          Whether to identify internal functions in traces

  -t, --trace-printer
          Print out opcode traces

      --quick
          Executes the transaction only with the state from the previous block.
          
          May result in different results than the live execution!

  -l, --label <LABEL>
          Label addresses in the trace.
          
          Example: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045:vitalik.eth

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

      --evm-version <EVM_VERSION>
          The EVM version to use.
          
          Overrides the version specified in the config.

      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rate-limit
          Disables rate limiting for this node's provider.
          
          default value: false
          
          See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rpc-rate-limit]

      --odyssey
          Enables Odyssey features

      --with-local-artifacts
          Use current project artifacts for trace decoding
          
          [aliases: la]

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

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