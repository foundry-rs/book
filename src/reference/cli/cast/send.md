# cast send

Sign and publish a transaction

```bash
$ cast send --help
Usage: cast send [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  Use to deploy raw contract bytecode
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction.
          
          If not provided, you must use cast send --create.

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
      --async
          Only print the transaction hash and exit immediately
          
          [env: CAST_ASYNC=]

      --confirmations <CONFIRMATIONS>
          The number of confirmations until the receipt is fetched
          
          [default: 1]

      --unlocked
          Send via `eth_sendTransaction using the `--from` argument or $ETH_FROM as sender

      --timeout <TIMEOUT>
          Timeout for sending the transaction
          
          [env: ETH_TIMEOUT=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the transaction receipt as JSON

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either
          specified in wei, or as a string with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string with a unit
          type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

      --blob
          Send a EIP-4844 blob transaction

      --blob-gas-price <BLOB_PRICE>
          Gas price for EIP-4844 blob transaction
          
          [env: ETH_BLOB_GAS_PRICE=]

      --auth <AUTH>
          EIP-7702 authorization list.
          
          Can be either a hex-encoded signed authorization or an address.

      --access-list [<ACCESS_LIST>]
          EIP-2930 access list.
          
          Accepts either a JSON-encoded access list or an empty value to create the access list via
          an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the
          `cast access-list` command.

      --path <BLOB_DATA_PATH>
          The path of blob data to be sent

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).
          
          This shares the transaction privately with all registered builders.
          
          See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>

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

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - remote:
      --aws
          Use AWS Key Management Service
```