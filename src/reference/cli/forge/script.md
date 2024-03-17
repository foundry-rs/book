# forge script

Run a smart contract as a script, building transactions that can be sent onchain

```bash
$ forge script --help
Usage: forge script [OPTIONS] <PATH> [ARGS]...

Arguments:
  <PATH>
          The contract you want to run. Either the file path or contract name.
          
          If multiple contracts exist in the same file you must specify the target contract with
          --target-contract.

  [ARGS]...
          Arguments to pass to the script function

Options:
      --target-contract <CONTRACT_NAME>
          The name of the contract you want to run
          
          [aliases: tc]

  -s, --sig <SIG>
          The signature of the function you want to call in the contract, or raw calldata
          
          [default: run()]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --legacy
          Use legacy transactions instead of EIP1559 ones.
          
          This is auto-enabled for common networks without EIP1559.

      --broadcast
          Broadcasts the transactions

      --skip-simulation
          Skips on-chain simulation

  -g, --gas-estimate-multiplier <GAS_ESTIMATE_MULTIPLIER>
          Relative percentage to multiply gas estimates by
          
          [default: 130]

      --unlocked
          Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender

      --resume
          Resumes submitting transactions that failed or timed-out previously.
          
          It DOES NOT simulate the script again and it expects nonces to have remained the same.
          
          Example: If transaction N has a nonce of 22, then the account should have a nonce of 22,
          otherwise it fails.

      --multi
          If present, --resume or --verify will be assumed to be a multi chain deployment

      --debug
          Open the script in the debugger.
          
          Takes precedence over broadcast.

      --slow
          Makes sure a transaction is sent, only after its previous one has been confirmed and
          succeeded

      --non-interactive
          Disables interactive prompts that might appear when deploying big contracts.
          
          For more info on the contract size limit, see EIP-170:
          <https://eips.ethereum.org/EIPS/eip-170>

      --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

      --verify
          Verifies all the contracts found in the receipts of a script, if any

      --json
          Output results in JSON format

      --with-gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559 transactions
          
          [env: ETH_GAS_PRICE=]

      --skip <SKIP>...
          Skip building files whose names contain the given filter.
          
          `test` and `script` are aliases for `.t.sol` and `.s.sol`.

  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Compiler options:
      --ignored-error-codes <ERROR_CODES>
          Ignore solc warnings by error code

      --deny-warnings
          Warnings will trigger a compiler error

      --no-auto-detect
          Do not auto-detect the `solc` version

      --use <SOLC_VERSION>
          Specify the solc version, or a path to a local solc, to build with.
          
          Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.

      --offline
          Do not access the network.
          
          Missing solc versions will not be installed.

      --via-ir
          Use the Yul intermediate representation compilation pipeline

      --silent
          Don't print anything on startup

      --ast
          Includes the AST as JSON in the compiler output

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert
          strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

  -C, --contracts <PATH>
          The contracts source directory

  -R, --remappings <REMAPPINGS>
          The project's remappings

      --remappings-env <ENV>
          The project's remappings from the environment

      --cache-path <PATH>
          The path to the compiler cache

      --lib-paths <PATH>
          The path to the library folder

      --hardhat
          Use the Hardhat-style project layout.
          
          This is the same as using: `--contracts contracts --lib-paths node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file

Wallet options - raw:
  -a, --froms [<ADDRESSES>...]
          The sender accounts
          
          [env: ETH_FROM=]

  -i, --interactives <NUM>
          Open an interactive prompt to enter your private key.
          
          Takes a value for the number of keys to enter.
          
          [default: 0]

      --private-keys <RAW_PRIVATE_KEYS>
          Use the provided private keys

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonics <MNEMONICS>
          Use the mnemonic phrases of mnemonic files at the specified paths

      --mnemonic-passphrases <PASSPHRASE>
          Use a BIP39 passphrases for the mnemonic

      --mnemonic-derivation-paths <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-indexes <INDEXES>
          Use the private key from the given mnemonic index.
          
          Can be used with --mnemonics, --ledger, --aws and --trezor.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATHS>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]
          [aliases: keystores]

      --account <ACCOUNT_NAMES>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]
          [aliases: accounts]

      --password <PASSWORDS>
          The keystore password.
          
          Used with --keystore.

      --password-file <PATHS>
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

EVM options:
  -f, --fork-url <URL>
          Fetch state over a remote endpoint instead of starting from an empty state.
          
          If you want to fetch state from a specific block number, see --fork-block-number.
          
          [aliases: rpc-url]

      --fork-block-number <BLOCK>
          Fetch state from a specific block number over a remote endpoint.
          
          See --fork-url.

      --fork-retries <RETRIES>
          Number of retries.
          
          See --fork-url.

      --fork-retry-backoff <BACKOFF>
          Initial retry backoff on encountering errors.
          
          See --fork-url.

      --no-storage-caching
          Explicitly disables the use of RPC caching.
          
          All storage slots are read entirely from the endpoint.
          
          This flag overrides the project's configuration file.
          
          See --fork-url.

      --initial-balance <BALANCE>
          The initial balance of deployed test contracts

      --sender <ADDRESS>
          The address which will be executing tests

      --ffi
          Enable the FFI cheatcode

      --always-use-create-2-factory
          Use the create 2 factory in all cases including tests and non-broadcasting scripts

  -v, --verbosity...
          Verbosity of the EVM.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 2: Print logs for all tests
          - 3: Print execution traces for failing tests
          - 4: Print execution traces for all tests, and setup traces for failing tests
          - 5: Print execution and setup traces for all tests

Fork config:
      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this provider
          
          default value: 330
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rpc-rate-limit
          Disables rate limiting for this node's provider.
          
          See also --fork-url and
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rate-limit]

Executor environment config:
      --gas-limit <GAS_LIMIT>
          The block gas limit

      --code-size-limit <CODE_SIZE>
          EIP-170: Contract code size limit in bytes. Useful to increase this because of tests. By
          default, it is 0x6000 (~25kb)

      --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [aliases: chain-id]

      --gas-price <GAS_PRICE>
          The gas price

      --block-base-fee-per-gas <FEE>
          The base fee in a block
          
          [aliases: base-fee]

      --tx-origin <ADDRESS>
          The transaction origin

      --block-coinbase <ADDRESS>
          The coinbase of the block

      --block-timestamp <TIMESTAMP>
          The timestamp of the block

      --block-number <BLOCK>
          The block number

      --block-difficulty <DIFFICULTY>
          The block difficulty

      --block-prevrandao <PREVRANDAO>
          The block prevrandao value. NOTE: Before merge this field was mix_hash

      --block-gas-limit <GAS_LIMIT>
          The block gas limit

      --memory-limit <MEMORY_LIMIT>
          The memory limit per EVM execution in bytes. If this limit is exceeded, a `MemoryLimitOOG`
          result is thrown.
          
          The default is 128MiB.

      --disable-block-gas-limit
          Whether to disable the block gas limit checks
          
          [aliases: no-gas-limit]

      --isolate
          Whether to enable isolation of calls. In isolation mode all top-level calls are executed
          as a separate transaction in a separate EVM context, enabling more precise gas accounting
          and transaction state changes

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```