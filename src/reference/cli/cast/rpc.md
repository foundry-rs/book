# cast rpc

Perform a raw JSON-RPC request

```bash
$ cast rpc --help
Usage: cast rpc [OPTIONS] <METHOD> [PARAMS]...

Arguments:
  <METHOD>
          RPC method name

  [PARAMS]...
          RPC parameters
          
          Interpreted as JSON:
          
          cast rpc eth_getBlockByNumber 0x123 false => {"method": "eth_getBlockByNumber", "params":
          ["0x123", false] ... }

Options:
  -w, --raw
          Send raw JSON parameters
          
          The first param will be interpreted as a raw JSON array of params. If no params are given,
          stdin will be used. For example:
          
          cast rpc eth_getBlockByNumber '["0x123", false]' --raw => {"method":
          "eth_getBlockByNumber", "params": ["0x123", false] ... }

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL with fast mode (https://rpc.flashbots.net/fast). This shares the
          transaction privately with all registered builders.
          https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the following can be
          used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```