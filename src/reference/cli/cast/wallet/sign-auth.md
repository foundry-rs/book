# cast wallet sign-auth

EIP-7702 sign authorization

```bash
$ cast wallet sign-auth --help
```

```txt
Usage: cast wallet sign-auth [OPTIONS] <ADDRESS>

Arguments:
  <ADDRESS>
          Address to sign authorization for

Options:
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

      --nonce <NONCE>
          

      --chain <CHAIN>
          

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

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
          Use a keystore from the default keystores folder
          (~/.foundry/keystores) by its filename
          
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