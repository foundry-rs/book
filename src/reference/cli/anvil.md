# anvil

A fast local Ethereum development node

```bash
$ anvil --help
Usage: anvil [OPTIONS] [COMMAND]

Commands:
  completions        Generate shell completions script [aliases: com]
  generate-fig-spec  Generate Fig autocompletion spec [aliases: fig]
  help               Print this message or the help of the given subcommand(s)

Options:
  -a, --accounts <NUM>
          Number of dev accounts to generate and configure
          
          [default: 10]

  -b, --block-time <SECONDS>
          Block time in seconds for interval mining
          
          [aliases: blockTime]

      --balance <NUM>
          The balance of every dev account in Ether
          
          [default: 10000]

      --config-out <OUT_FILE>
          Writes output of `anvil` as json to user-specified file

      --derivation-path <DERIVATION_PATH>
          Sets the derivation path of the child key to be derived.
          
          [default: m/44'/60'/0'/0/]

      --dump-state <PATH>
          Dump the state and block environment of chain on exit to the given file.
          
          If the value is a directory, the state will be written to `<VALUE>/state.json`.

  -h, --help
          Print help (see a summary with '-h')

      --hardfork <HARDFORK>
          The EVM hardfork to use.
          
          Choose the hardfork by name, e.g. `shanghai`, `paris`, `london`, etc... [default: latest]

      --init <PATH>
          Initialize the genesis block with the given `genesis.json` file

      --ipc [<PATH>]
          Launch an ipc server at the given path or default path = `/tmp/anvil.ipc`
          
          [aliases: ipcpath]

      --load-state <PATH>
          Initialize the chain from a previously saved state snapshot

  -m, --mnemonic <MNEMONIC>
          BIP39 mnemonic phrase used for generating accounts. Cannot be used if `mnemonic_random` or
          `mnemonic_seed` are used

      --mnemonic-random [<MNEMONIC_RANDOM>]
          Automatically generates a BIP39 mnemonic phrase, and derives accounts from it. Cannot be
          used with other `mnemonic` options You can specify the number of words you want in the
          mnemonic. [default: 12]

      --mnemonic-seed-unsafe <MNEMONIC_SEED>
          Generates a BIP39 mnemonic phrase from a given seed Cannot be used with other `mnemonic`
          options
          
          CAREFUL: this is NOT SAFE and should only be used for testing. Never use the private keys
          generated in production.

      --no-mining
          Disable auto and interval mining, and mine on demand instead
          
          [aliases: no-mine]

      --order <ORDER>
          How transactions are sorted in the mempool
          
          [default: fees]

  -p, --port <NUM>
          Port number to listen on
          
          [default: 8545]

      --prune-history [<PRUNE_HISTORY>]
          Don't keep full chain history. If a number argument is specified, at most this number of
          states is kept in memory

  -s, --state-interval <SECONDS>
          Interval in seconds at which the state and block environment is to be dumped to disk.
          
          See --state and --dump-state

      --silent
          Don't print anything on startup and don't print logs

      --slots-in-an-epoch <SLOTS_IN_AN_EPOCH>
          Slots in an epoch
          
          [default: 32]

      --state <PATH>
          This is an alias for both --load-state and --dump-state.
          
          It initializes the chain with the state and block environment stored at the file, if it
          exists, and dumps the chain's state on exit.

      --timestamp <NUM>
          The timestamp of the genesis block

      --transaction-block-keeper <TRANSACTION_BLOCK_KEEPER>
          Number of blocks with transactions to keep in memory

  -V, --version
          Print version

Server options:
      --allow-origin <ALLOW_ORIGIN>
          Set the CORS allow_origin
          
          [default: *]

      --host <IP_ADDR>
          The hosts the server will listen on
          
          [env: ANVIL_IP_ADDR=]
          [default: 127.0.0.1]

      --no-cors
          Disable CORS

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this provider
          
          default value: 330
          
          See --fork-url. See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, add a block number like
          `http://localhost:8545@1400000` or use the `--fork-block-number` argument.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-chain-id <CHAIN>
          Specify chain id to skip fetching it from remote endpoint. This enables offline-start
          mode.
          
          You still must pass both `--fork-url` and `--fork-block-number`, and already have your
          required state cached on disk, anything missing locally would be fetched from the remote.

      --fork-header <HEADERS>
          Headers to use for the rpc client, e.g. "User-Agent: test-agent"
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-rate-limit
          Disables rate limiting for this node's provider.
          
          default value: false
          
          See --fork-url. See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rpc-rate-limit]

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --retries <retries>
          Number of retry requests for spurious networks (timed out requests)
          
          Default value 5

      --timeout <timeout>
          Timeout in ms for requests sent to remote JSON-RPC server in forking mode.
          
          Default value 45000

Environment config:
      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --chain-id <CHAIN_ID>
          The chain ID

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By
          default, it is 0x6000 (~25kb)

      --disable-block-gas-limit
          Disable the `call.gas_limit <= block.gas_limit` constraint

      --gas-limit <GAS_LIMIT>
          The block gas limit

      --gas-price <GAS_PRICE>
          The gas price

EVM options:
      --auto-impersonate
          Enable autoImpersonate on startup
          
          [aliases: auto-impersonate]

      --disable-default-create2-deployer
          Disable the default create2 deployer
          
          [aliases: no-create2]

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes

      --optimism
          Run an Optimism chain
          
          [aliases: optimism]

      --steps-tracing
          Enable steps tracing used for debug calls returning geth-style traces
          
          [aliases: tracing]
```