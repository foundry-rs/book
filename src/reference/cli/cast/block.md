# probe block

Get information about a block

```bash
$ probe block --help
Usage: probe block [OPTIONS] [BLOCK]

Arguments:
  [BLOCK]
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

Options:
  -f, --field <FIELD>
          If specified, only get the given field of the block

      --full
          [env: PROBE_FULL_BLOCK=]

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL with fast mode (https://rpc.flashbots.net/fast). This shares the transaction privately with all registered builders. https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          probe rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the block as JSON
```