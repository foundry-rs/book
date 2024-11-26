## anvil-zksync

### NAME

anvil-zksync - Create a local testnet node for deploying and testing smart contracts. It can also be used to fork other ZK chains.

### SYNOPSIS

`anvil-zksync` [*options*]

### DESCRIPTION

Create a local testnet node for deploying and testing smart contracts. It can also be used to fork other ZK chains.

This section covers an extensive list of information about Supported Transport Layers, Supported RPC Methods, Anvil-ZKsync flags and their usages. You can run multiple flags at the same time.

<!-- #### Mining Modes
Mining modes refer to how frequent blocks are mined using Anvil. By default, it automatically generates a new block as soon as a transaction is submitted.

You can change this setting to interval mining if you will, which means that a new block will be generated in a given period of time selected by the user. If you want to go for this type of mining, you can do it by adding the `--block-time <block-time-in-seconds>` flag, like in the following example.
```sh
# Produces a new block every 10 seconds
anvil --block-time 10
```

There's also a third mining mode called never. In this case, it disables auto and interval mining, and mine on demand instead. You can do this by typing:
```sh
# Enables never mining mode
anvil --no-mining
```

To speed up the finalization of blocks, you can use the `--slots-in-an-epoch` flag with a value of `1` for example. This will lead to the block at height `N-2` being finalized, where `N` is the latest block. -->

#### Supported Transport Layers
HTTP and Websocket connections are supported. The server listens on port 8011 by default, but it can be changed by running the following command:

```sh
anvil_zksync --port <PORT>
```

#### Default CREATE2 Deployer
Anvil-ZKsync, when used without forking, includes the [default CREATE2 deployer proxy](https://github.com/matter-labs/era-contracts/blob/main/system-contracts/contracts/Create2Factory.sol) at the address `0x0000000000000000000000000000000000010000`.

This allows you to test CREATE2 deployments locally without forking.

#### Supported RPC Methods

##### **ANVIL Namespace**

The `anvil_*` namespace provides custom methods for advanced node manipulation and testing.

##### **Anvil Namespace**

**`anvil_setMinGasPrice`**  
**Status:** NOT IMPLEMENTED  
**Description:** Set the minimum gas price for the node. Unsupported for ZKsync as it is only relevant for pre-EIP1559 chains.

**`anvil_setLoggingEnabled`**  
**Status:** SUPPORTED  
**Description:** Enables or disables logging.

**`anvil_snapshot`**  
**Status:** SUPPORTED  
**Description:** Snapshot the state of the blockchain at the current block.

**`anvil_revert`**  
**Status:** SUPPORTED  
**Description:** Revert the state of the blockchain to a previous snapshot.

**`anvil_setTime`**  
**Status:** SUPPORTED  
**Description:** Sets the internal clock time to the given timestamp.

**`anvil_increaseTime`**  
**Status:** SUPPORTED  
**Description:** Jump forward in time by the given amount of time, in seconds.

**`anvil_setNextBlockTimestamp`**  
**Status:** SUPPORTED  
**Description:** Sets the timestamp of the next block.

**`anvil_autoImpersonateAccount`**  
**Status:** SUPPORTED  
**Description:** Sets auto impersonation status.

**`anvil_setNonce`**  
**Status:** SUPPORTED  
**Description:** Sets the nonce of an address.

**`anvil_impersonateAccount`**  
**Status:** SUPPORTED  
**Description:** Impersonate an account.

**`anvil_stopImpersonatingAccount`**  
**Status:** SUPPORTED  
**Description:** Stop impersonating an account after previously impersonating it.

**`anvil_reset`**  
**Status:** SUPPORTED  
**Description:** Resets the state of the network; cannot revert to past block numbers, unless they're in a fork.

**`anvil_mine`**  
**Status:** SUPPORTED  
**Description:** Mines any number of blocks at once, in constant time.

**`anvil_setBalance`**  
**Status:** SUPPORTED  
**Description:** Modifies the balance of an account.

**`anvil_setCode`**  
**Status:** SUPPORTED  
**Description:** Sets the bytecode of a given account.

**`anvil_setStorageAt`**  
**Status:** SUPPORTED  
**Description:** Sets the storage value at a given key for a given account.

---

##### **CONFIG Namespace**

Configuration methods to adjust node settings dynamically.

**`config_getShowCalls`**  
**Status:** SUPPORTED  
**Description:** Gets the current value of `show_calls` that's originally set with the `--show-calls` option.

**`config_getShowOutputs`**  
**Status:** SUPPORTED  
**Description:** Gets the current value of `show_outputs` that's originally set with the `--show-outputs` option.

**`config_getCurrentTimestamp`**  
**Status:** SUPPORTED  
**Description:** Gets the value of `current_timestamp` for the node.

**`config_setResolveHashes`**  
**Status:** SUPPORTED  
**Description:** Updates `resolve-hashes` to call OpenChain for human-readable ABI names in call traces.

**`config_setShowCalls`**  
**Status:** SUPPORTED  
**Description:** Updates `show_calls` to print more detailed call traces.

**`config_setShowOutputs`**  
**Status:** SUPPORTED  
**Description:** Updates `show_outputs` to print calls outputs.

**`config_setShowStorageLogs`**  
**Status:** SUPPORTED  
**Description:** Updates `show_storage_logs` to print storage log reads/writes.

**`config_setShowVmDetails`**  
**Status:** SUPPORTED  
**Description:** Updates `show_vm_details` to print more detailed results from VM execution.

**`config_setShowGasDetails`**  
**Status:** SUPPORTED  
**Description:** Updates `show_gas_details` to print more details about gas estimation and usage.

**`config_setLogLevel`**  
**Status:** SUPPORTED  
**Description:** Sets the logging level for the node and only displays the node logs.

**`config_setLogging`**  
**Status:** SUPPORTED  
**Description:** Sets the fine-tuned logging levels for the node and any of its dependencies.

---

##### **DEBUG Namespace**

Debugging tools to trace and inspect transactions and blocks.

**`debug_traceCall`**  
**Status:** SUPPORTED  
**Description:** Performs a call and returns structured traces of the execution.

**`debug_traceTransaction`**  
**Status:** SUPPORTED  
**Description:** Returns a structured trace of the execution of the specified transaction.

**`debug_traceBlockByHash`**  
**Status:** SUPPORTED  
**Description:** Returns structured traces for operations within the block of the specified block hash.

**`debug_traceBlockByNumber`**  
**Status:** SUPPORTED  
**Description:** Returns structured traces for operations within the block of the specified block number.

---

##### **ETH Namespace**

Standard Ethereum JSON-RPC methods.

**`eth_accounts`**  
**Status:** SUPPORTED  
**Description:** Returns a list of addresses owned by the client.

**`eth_chainId`**  
**Status:** SUPPORTED  
**Description:** Returns the currently configured chain ID (default is `260`).

**`eth_coinbase`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the client coinbase address.

**`eth_estimateGas`**  
**Status:** SUPPORTED  
**Description:** Generates and returns an estimate of how much gas is necessary for the transaction to complete.

**`eth_feeHistory`**  
**Status:** SUPPORTED  
**Description:** Returns a collection of historical block gas data (hardcoded with gas price of `50_000_000`).

**`eth_gasPrice`**  
**Status:** SUPPORTED  
**Description:** Returns the current price per gas in wei (hardcoded to `50_000_000`).

**`eth_getBalance`**  
**Status:** SUPPORTED  
**Description:** Returns the balance of the account of given address.

**`eth_getBlockByHash`**  
**Status:** SUPPORTED  
**Description:** Returns information about a block by block hash.

**`eth_getBlockByNumber`**  
**Status:** SUPPORTED  
**Description:** Returns information about a block by block number.

**`eth_getBlockTransactionCountByHash`**  
**Status:** SUPPORTED  
**Description:** Number of transactions in a block matching the given block hash.

**`eth_getBlockTransactionCountByNumber`**  
**Status:** SUPPORTED  
**Description:** Number of transactions in a block matching the given block number.

**`eth_getCompilers`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns a list of available compilers.

**`eth_getProof`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the account's Merkle proof and storage values for specified storage keys.

**`eth_getStorageAt`**  
**Status:** SUPPORTED  
**Description:** Returns the value from a storage position at a given address.

**`eth_getTransactionByHash`**  
**Status:** SUPPORTED  
**Description:** Returns information about a transaction requested by transaction hash.

**`eth_getTransactionCount`**  
**Status:** SUPPORTED  
**Description:** Returns the number of transactions sent from an address.

**`eth_getTransactionByBlockHashAndIndex`**  
**Status:** SUPPORTED  
**Description:** Returns information about a transaction by block hash and transaction index.

**`eth_getTransactionByBlockNumberAndIndex`**  
**Status:** SUPPORTED  
**Description:** Returns information about a transaction by block number and transaction index.

**`eth_getTransactionReceipt`**  
**Status:** SUPPORTED  
**Description:** Returns the receipt of a transaction by transaction hash.

**`eth_getUncleByBlockHashAndIndex`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns information about an uncle of a block by hash and uncle index.

**`eth_getUncleByBlockNumberAndIndex`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns information about an uncle of a block by number and uncle index.

**`eth_getUncleCountByBlockHash`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the number of uncles in a block matching the given block hash.

**`eth_getUncleCountByBlockNumber`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the number of uncles in a block matching the given block number.

**`eth_getWork`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns mining-related data such as current block header pow-hash, seed hash, and target.

**`eth_hashrate`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the number of hashes per second that the node is mining with.

**`eth_maxPriorityFeePerGas`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns a `maxPriorityFeePerGas` value suitable for quick transaction inclusion.

**`eth_mining`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns `true` if the client is actively mining new blocks.

**`eth_newBlockFilter`**  
**Status:** SUPPORTED  
**Description:** Creates a filter in the node to notify when a new block arrives.

**`eth_newFilter`**  
**Status:** SUPPORTED  
**Description:** Creates a filter object to notify when state changes (logs) occur.

**`eth_newPendingTransactionFilter`**  
**Status:** SUPPORTED  
**Description:** Creates a filter to notify when new pending transactions arrive.

**`eth_protocolVersion`**  
**Status:** SUPPORTED  
**Description:** Returns the current Ethereum protocol version.

**`eth_sendTransaction`**  
**Status:** SUPPORTED  
**Description:** Creates a new message call transaction or a contract creation.

**`eth_sendRawTransaction`**  
**Status:** SUPPORTED  
**Description:** Creates a new message call transaction or a contract creation for signed transactions.

**`eth_sign`**  
**Status:** NOT IMPLEMENTED  
**Description:** Calculates an Ethereum-specific signature.

**`eth_signTransaction`**  
**Status:** NOT IMPLEMENTED  
**Description:** Signs a transaction for later submission using `eth_sendRawTransaction`.

**`eth_signTypedData`**  
**Status:** NOT IMPLEMENTED  
**Description:** Identical to `eth_signTypedData_v4`.

**`eth_signTypedData_v4`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns a hex-encoded signature.

**`eth_submitHashrate`**  
**Status:** NOT IMPLEMENTED  
**Description:** Used for submitting mining hashrate.

**`eth_submitWork`**  
**Status:** NOT IMPLEMENTED  
**Description:** Used for submitting a proof-of-work solution.

**`eth_subscribe`**  
**Status:** NOT IMPLEMENTED  
**Description:** Starts a subscription to a particular event.

**`eth_syncing`**  
**Status:** SUPPORTED  
**Description:** Returns an object containing data about the sync status or `false` when not syncing.

**`eth_uninstallFilter`**  
**Status:** SUPPORTED  
**Description:** Uninstalls a filter with the given ID.

**`eth_unsubscribe`**  
**Status:** NOT IMPLEMENTED  
**Description:** Cancels a subscription to a particular event.

---

##### **HARDHAT Namespace**

Custom methods provided by Hardhat for advanced testing and node manipulation.

**`hardhat_addCompilationResult`**  
**Status:** NOT IMPLEMENTED  
**Description:** Add information about compiled contracts.

**`hardhat_dropTransaction`**  
**Status:** NOT IMPLEMENTED  
**Description:** Remove a transaction from the mempool.

**`hardhat_impersonateAccount`**  
**Status:** SUPPORTED  
**Description:** Impersonate an account.

**`hardhat_getAutomine`**  
**Status:** PARTIALLY SUPPORTED  
**Description:** Currently always returns `true` as `anvil_zksync` by default mines new blocks with each transaction.

**`hardhat_metadata`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the metadata of the current network.

**`hardhat_mine`**  
**Status:** SUPPORTED  
**Description:** Mine any number of blocks at once, in constant time.

**`hardhat_reset`**  
**Status:** PARTIALLY SUPPORTED  
**Description:** Resets the state of the network; cannot revert to past block numbers, unless they're in a fork.

**`hardhat_setBalance`**  
**Status:** SUPPORTED  
**Description:** Modifies the balance of an account.

**`hardhat_setCode`**  
**Status:** SUPPORTED  
**Description:** Sets the bytecode of a given account.

**`hardhat_setCoinbase`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the coinbase address.

**`hardhat_setLoggingEnabled`**  
**Status:** NOT IMPLEMENTED  
**Description:** Enables or disables logging in Hardhat Network.

**`hardhat_setMinGasPrice`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the minimum gas price.

**`hardhat_setNextBlockBaseFeePerGas`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the base fee per gas for the next block.

**`hardhat_setPrevRandao`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the PREVRANDAO value of the next block.

**`hardhat_setNonce`**  
**Status:** SUPPORTED  
**Description:** Sets the nonce of a given account.

**`hardhat_setStorageAt`**  
**Status:** SUPPORTED  
**Description:** Sets the storage value at a given key for a given account.

**`hardhat_stopImpersonatingAccount`**  
**Status:** SUPPORTED  
**Description:** Stop impersonating an account after previously impersonating it.

---

##### **EVM Namespace**

Ethereum Virtual Machine manipulation methods for testing and development.

**`evm_addAccount`**  
**Status:** NOT IMPLEMENTED  
**Description:** Adds any arbitrary account.

**`evm_increaseTime`**  
**Status:** SUPPORTED  
**Description:** Jump forward in time by the given amount of time, in seconds.

**`evm_mine`**  
**Status:** SUPPORTED  
**Description:** Force a single block to be mined.

**`evm_removeAccount`**  
**Status:** NOT IMPLEMENTED  
**Description:** Removes an account.

**`evm_revert`**  
**Status:** SUPPORTED  
**Description:** Revert the state of the blockchain to a previous snapshot.

**`evm_setAccountBalance`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the given account's balance to the specified WEI value.

**`evm_setAccountCode`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the given account's code to the specified data.

**`evm_setAccountNonce`**  
**Status:** SUPPORTED  
**Description:** Sets the given account's nonce to the specified value.

**`evm_setAccountStorageAt`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the given account's storage slot to the specified data.

**`evm_setAutomine`**  
**Status:** NOT IMPLEMENTED  
**Description:** Enables or disables the automatic mining of new blocks with each transaction.

**`evm_setBlockGasLimit`**  
**Status:** NOT IMPLEMENTED  
**Description:** Sets the Block Gas Limit of the network.

**`evm_setIntervalMining`**  
**Status:** NOT IMPLEMENTED  
**Description:** Enables or disables automatic mining of blocks at regular intervals.

**`evm_setNextBlockTimestamp`**  
**Status:** SUPPORTED  
**Description:** Sets the timestamp of the next block.

**`evm_setTime`**  
**Status:** SUPPORTED  
**Description:** Sets the current timestamp for the node.

**`evm_snapshot`**  
**Status:** SUPPORTED  
**Description:** Snapshot the state of the blockchain at the current block.

**`evm_revert`**  
**Status:** SUPPORTED  
**Description:** Revert the state of the blockchain to a previous snapshot.

---

##### **WEB3 Namespace**

Standard Web3 methods.

**`web3_clientVersion`**  
**Status:** SUPPORTED  
**Description:** Returns the client version (e.g., `zkSync/v2.0`).

---

##### **ZKS Namespace**

ZkSync-specific methods for enhanced functionality on the zkRollup.

**`zks_estimateFee`**  
**Status:** SUPPORTED  
**Description:** Gets the fee estimation data for a given request.

**`zks_estimateGasL1ToL2`**  
**Status:** NOT IMPLEMENTED  
**Description:** Estimate of the gas required for an L1 to L2 transaction.

**`zks_getAllAccountBalances`**  
**Status:** SUPPORTED  
**Description:** Returns all balances for confirmed tokens given by an account address.

**`zks_getBridgeContracts`**  
**Status:** SUPPORTED  
**Description:** Returns L1/L2 addresses of default bridges.

**`zks_getBlockDetails`**  
**Status:** SUPPORTED  
**Description:** Returns additional zkSync-specific information about the L2 block.

**`zks_getBytecodeByHash`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns bytecode of a transaction given by its hash.

**`zks_getConfirmedTokens`**  
**Status:** SUPPORTED  
**Description:** Returns [address, symbol, name, and decimal] information of all tokens within a range of IDs.

**`zks_getBaseTokenL1Address`**  
**Status:** SUPPORTED  
**Description:** Returns the L1 base token address (hard-coded to `0x0000000000000000000000000000000000000001`).

**`zks_getL1BatchBlockRange`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the range of blocks contained within a batch given by batch number.

**`zks_getL1BatchDetails`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns data pertaining to a given batch.

**`zks_getL2ToL1LogProof`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the proof for the corresponding L2 to L1 log.

**`zks_getL2ToL1MsgProof`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the proof for the message sent via the L1Messenger system contract.

**`zks_getMainContract`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the address of the zkSync Era contract.

**`zks_getRawBlockTransactions`**  
**Status:** SUPPORTED  
**Description:** Returns data of transactions in a block.

**`zks_getTestnetPaymaster`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the address of the testnet paymaster.

**`zks_getTokenPrice`**  
**Status:** SUPPORTED  
**Description:** Gets the USD price of a token (`ETH` is hard-coded to `1_500`, while some others are `1`).

**`zks_getTransactionDetails`**  
**Status:** SUPPORTED  
**Description:** Returns data from a specific transaction given by the transaction hash.

**`zks_L1BatchNumber`**  
**Status:** NOT IMPLEMENTED  
**Description:** Returns the latest L1 batch number.

**`zks_L1ChainId`**  
**Status:** IMPLEMENTED  
**Description:** Returns the chain ID of the underlying L1.

### OPTIONS

#### General Options
`-h, --help`
&nbsp;&nbsp;&nbsp;&nbsp; Print help information.

`-V, --version`
&nbsp;&nbsp;&nbsp;&nbsp; Print version information.

`--offline`
&nbsp;&nbsp;&nbsp;&nbsp; Run in offline mode (disables all network requests).

`--health-check-endpoint`
&nbsp;&nbsp;&nbsp;&nbsp; Enable health check endpoint. It will be available for GET requests at `/health`. The endpoint will return `200 OK` if the node is healthy.

`--config-out <OUT_FILE>`
&nbsp;&nbsp;&nbsp;&nbsp; Writes output of `era-test-node` as JSON to the user-specified file.

#### Account Configuration
`-a, --accounts <NUM>`
&nbsp;&nbsp;&nbsp;&nbsp; Number of dev accounts to generate and configure. [default: 10]

`--balance <NUM>`
&nbsp;&nbsp;&nbsp;&nbsp; The balance of every dev account in Ether. [default: 10000]

`-m, --mnemonic <MNEMONIC>`
&nbsp;&nbsp;&nbsp;&nbsp; BIP39 mnemonic phrase used for generating accounts. Cannot be used if `--mnemonic-random` or `--mnemonic-seed-unsafe` are used.

`--mnemonic-random [<MNEMONIC_RANDOM>]`
&nbsp;&nbsp;&nbsp;&nbsp; Automatically generates a BIP39 mnemonic phrase and derives accounts from it. Cannot be used with other `--mnemonic` options. You can specify the number of words you want in the mnemonic. [default: 12]

`--mnemonic-seed-unsafe <MNEMONIC_SEED>`
&nbsp;&nbsp;&nbsp;&nbsp; Generates a BIP39 mnemonic phrase from a given seed. Cannot be used with other `--mnemonic` options. **CAREFUL:** This is **NOT SAFE** and should only be used for testing. Never use the private keys generated in production.

`--derivation-path <DERIVATION_PATH>`
&nbsp;&nbsp;&nbsp;&nbsp; Sets the derivation path of the child key to be derived. [default: `m/44'/60'/0'/0/`]

`--auto-impersonate`
&nbsp;&nbsp;&nbsp;&nbsp; Enables automatic impersonation on startup. This allows any transaction sender to be simulated as different accounts, which is useful for testing contract behavior.
&nbsp;&nbsp;&nbsp;&nbsp; [aliases: `auto-unlock`]

#### Network Options
`--port <PORT>`
&nbsp;&nbsp;&nbsp;&nbsp; Port to listen on. [default: 8011]

`--host <IP_ADDR>`
&nbsp;&nbsp;&nbsp;&nbsp; The IP address the server will listen on.
&nbsp;&nbsp;&nbsp;&nbsp; [env: `ANVIL_ZKSYNC_IP_ADDR`]
&nbsp;&nbsp;&nbsp;&nbsp; [default: `127.0.0.1`]

`--chain-id <CHAIN_ID>`
&nbsp;&nbsp;&nbsp;&nbsp; Specify chain ID. [default: `260`]

#### Debugging Options
`-d, --debug-mode`
&nbsp;&nbsp;&nbsp;&nbsp; Enable default settings for debugging contracts.

`--show-calls <SHOW_CALLS>`
&nbsp;&nbsp;&nbsp;&nbsp; Show call debug information.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `none`, `user`, `system`, `all`]

`--show-outputs <SHOW_OUTPUTS>`
&nbsp;&nbsp;&nbsp;&nbsp; Show call output information.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `true`, `false`]

`--show-storage-logs <SHOW_STORAGE_LOGS>`
&nbsp;&nbsp;&nbsp;&nbsp; Show storage log information.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `none`, `read`, `write`, `paid`, `all`]

`--show-vm-details <SHOW_VM_DETAILS>`
&nbsp;&nbsp;&nbsp;&nbsp; Show VM details information.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `none`, `all`]

`--show-gas-details <SHOW_GAS_DETAILS>`
&nbsp;&nbsp;&nbsp;&nbsp; Show gas details information.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `none`, `all`]

`--resolve-hashes <RESOLVE_HASHES>`
&nbsp;&nbsp;&nbsp;&nbsp; If `true`, the tool will try to resolve ABI and topic names for better readability. May decrease performance.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `true`, `false`]

#### Gas Configuration
`--l1-gas-price <L1_GAS_PRICE>`
&nbsp;&nbsp;&nbsp;&nbsp; Custom L1 gas price (in wei).

`--l2-gas-price <L2_GAS_PRICE>`
&nbsp;&nbsp;&nbsp;&nbsp; Custom L2 gas price (in wei).

`--l1-pubdata-price <L1_PUBDATA_PRICE>`
&nbsp;&nbsp;&nbsp;&nbsp; Custom L1 pubdata price (in wei).

`--price-scale-factor <PRICE_SCALE_FACTOR>`
&nbsp;&nbsp;&nbsp;&nbsp; Gas price estimation scale factor.

`--limit-scale-factor <LIMIT_SCALE_FACTOR>`
&nbsp;&nbsp;&nbsp;&nbsp; Gas limit estimation scale factor.

#### System Configuration
`--override-bytecodes-dir <OVERRIDE_BYTECODES_DIR>`
&nbsp;&nbsp;&nbsp;&nbsp; Directory to override bytecodes.

`--dev-system-contracts <DEV_SYSTEM_CONTRACTS>`
&nbsp;&nbsp;&nbsp;&nbsp; Option for system contracts (default: `built-in`).
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `built-in`, `local`, `built-in-without-security`]

`--emulate-evm`
&nbsp;&nbsp;&nbsp;&nbsp; Enables EVM emulation. Requires local system contracts.

#### Logging Configuration
`--log <LOG>`
&nbsp;&nbsp;&nbsp;&nbsp; Log level (default: `info`).
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `trace`, `debug`, `info`, `warn`, `error`]

`--log-file-path <LOG_FILE_PATH>`
&nbsp;&nbsp;&nbsp;&nbsp; Log file path. [default: `anvil_zksync.log`]

#### Cache Options
`--cache <CACHE>`
&nbsp;&nbsp;&nbsp;&nbsp; Cache type (`none`, `memory`, or `disk`). [default: `disk`]
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `none`, `memory`, `disk`]

`--reset-cache <RESET_CACHE>`
&nbsp;&nbsp;&nbsp;&nbsp; Reset the local disk cache.
&nbsp;&nbsp;&nbsp;&nbsp; [possible values: `true`, `false`]

`--cache-dir <CACHE_DIR>`
&nbsp;&nbsp;&nbsp;&nbsp; Cache directory location for disk cache. [default: `.cache`]

#### Commands
`run`
&nbsp;&nbsp;&nbsp;&nbsp; Starts a new empty local network.

`fork`
&nbsp;&nbsp;&nbsp;&nbsp; Starts a local network that is a fork of another network.

`replay_tx`
&nbsp;&nbsp;&nbsp;&nbsp; Starts a local network that is a fork of another network and replays a given transaction on it.

`help`
&nbsp;&nbsp;&nbsp;&nbsp; Print this message or the help of the given subcommand(s).

#### Command-Specific Options

##### `fork` Command
`--fork-url <FORK_URL>`
&nbsp;&nbsp;&nbsp;&nbsp; Network to fork from (e.g., `http://XXX:YY`, `mainnet`, `sepolia-testnet`).

`--fork-block-number <BLOCK>`
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state from a specific block number over a remote endpoint.

`--fork-transaction-hash <TRANSACTION>`
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state from a specific transaction hash over a remote endpoint.
&nbsp;&nbsp;&nbsp;&nbsp; See `--fork-url`.

##### `replay_tx` Command
`<TX>`
&nbsp;&nbsp;&nbsp;&nbsp; Transaction hash to replay.

#### Additional Options
`--timestamp <NUM>`
&nbsp;&nbsp;&nbsp;&nbsp; The timestamp of the genesis block.

`--init <PATH>`
&nbsp;&nbsp;&nbsp;&nbsp; Initialize the genesis block with the given `genesis.json` file.

---

**Usage Examples:**

- **Start a new empty local network:**
  ```
  anvil_zksync run [OPTIONS]
  ```

- **Start a forked network:**
  ```
  anvil_zksync fork [OPTIONS] --fork-url <FORK_URL>
  ```

- **Replay a transaction on a forked network:**
  ```
  anvil_zksync replay_tx --fork-url <FORK_URL> <TX>
  ```

- **Display help information:**
  ```
  anvil_zksync help
  ```

### Shell Completions

``anvil_zksync completions`` *shell*

Generates a shell completions script for the given shell.

Supported shells are:

- bash
- elvish
- fish
- powershell
- zsh

#### EXAMPLES

1. Generate shell completions script for zsh:
    ```sh
    anvil-zksync completions zsh > $HOME/.oh-my-zsh/completions/_anvil_zksync
    ```


<!-- ### Usage within Docker

In order to run anvil as a service in Github Actions with the [Docker container](../../tutorials/foundry-docker.md), where passing arguments to the entrypoint command is not possible, use the `ANVIL_IP_ADDR` environment variable to set the host's IP. `ANVIL_IP_ADDR=0.0.0.0` is equivalent to providing the `--host <ip>` option. -->

#### Using `genesis.json` 

The `genesis.json` file in Anvil serves a similar purpose as in Geth, defining the network's initial state, consensus rules, and preallocated accounts to ensure all nodes start consistently and maintain network integrity. All values, including balance, gas limit and such, are to be defined as hexadecimals.

Certainly! Here's the updated documentation reflecting the provided JSON file, maintaining the original formatting and including nested fields for clarity.

---

### GENESIS BLOCK FIELDS

- `hash`: The hash of the block.
- `parent_hash`: The hash of the parent block. All zeros for the genesis block since there is no parent.
- `block_number`: The block number, with the genesis block being `0`.
- `timestamp`: The creation time of the genesis block in Unix time.
- `l1_batch_env`: The environment configuration for the Layer 1 batch, containing:
  - `previous_batch_hash`:The hash of the previous batch. `null` for the first batch.
  - `number`: The batch number.
  - `timestamp`: The timestamp of the batch in Unix time.
  - `fee_input`: Details of the fee inputs:
    - `PubdataIndependent`: Contains independent fee parameters:
      - `l1_gas_price`: The gas price for Layer 1 transactions.
      - `fair_l2_gas_price`: The fair gas price for Layer 2 transactions.
      - `fair_pubdata_price`: The fair pubdata price.
  - `fee_account`: The address designated for fee collection. Defaults to `0x0000000000000000000000000000000000000000`.
  
  - `enforced_base_fee`: The enforced base fee for transactions. `null` if not enforced.
  - `first_l2_block`: Details of the first Layer 2 block:
    - `number`: The block number.
    - `timestamp`: The timestamp of the block in Unix time.
    - `prev_block_hash`: The hash of the previous block. All zeros for the genesis block.
    - `max_virtual_blocks_to_create`: The maximum number of virtual blocks that can be created.
- `transactions`: An array of transactions included in the block. Empty array for the genesis block.
- `gas_used`: The total amount of gas used in the block.
- `logs_bloom`: The bloom filter for logs in the block.

---
**Example:**

```json
{
  "hash": null,
  "parent_hash": null,
  "block_number": 0,
  "timestamp": 1638316800,
  "l1_batch_env": {
    "previous_batch_hash": null,
    "number": 0,
    "timestamp": 1732653220,
    "fee_input": {
      "PubdataIndependent": {
        "l1_gas_price": 1,
        "fair_l2_gas_price": 2,
        "fair_pubdata_price": 1000000000000000
      }
    },
    "fee_account": "0x0000000000000000000000000000000000000000",
    "enforced_base_fee": null,
    "first_l2_block": {
      "number": 0,
      "timestamp": 1638316800,
      "prev_block_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "max_virtual_blocks_to_create": 0
    }
  },
  "transactions": [],
  "gas_used": null,
  "logs_bloom": null
}
```
