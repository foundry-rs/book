# cast implementation

Fetch the EIP-1967 implementation account

```bash
$ cast implementation --help
```

```txt
Usage: cast implementation [OPTIONS] <WHO>

Arguments:
  <WHO>
          The address to get the nonce for

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

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