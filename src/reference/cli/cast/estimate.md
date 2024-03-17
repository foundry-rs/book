# cast estimate

Estimate the gas cost of a transaction

```bash
$ cast estimate --help
Usage: cast estimate [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  Estimate gas cost to deploy a smart contract
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
  -f, --from <FROM>
          The sender account
          
          [env: ETH_FROM=]
          [default: 0x0000000000000000000000000000000000000000]

      --value <VALUE>
          Ether to send in the transaction.
          
          Either specified in wei, or as a string with a unit type:
          
          Examples: 1ether, 10gwei, 0.01ether

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

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')
```