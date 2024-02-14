# probe call

Perform a call on an account without publishing a transaction

```bash
$ probe call --help
Usage: probe call [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  ignores the address field and simulates creating a contract
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
      --data <DATA>
          Data for the transaction

      --trace
          Forks the remote rpc, executes the transaction locally and prints a trace

      --debug
          Can only be used with "--trace"
          
          opens an interactive debugger

      --labels <LABELS>
          Can only be used with "--trace" Labels to apply to the traces.
          
          Format: `address:label`

      --evm-version <EVM_VERSION>
          Can only be used with "--trace"
          
          The EVM Version to use.

  -b, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -h, --help
          Print help (see a summary with '-h')

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559 transactions
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

Ethereum options:
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
          Use a keystore from the default keystores folder (~/.foxar/keystores) by its filename
          
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

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```