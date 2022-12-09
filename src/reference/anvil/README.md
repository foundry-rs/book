## anvil

### NAME

anvil - Create a local testnet node for deploying and testing smart contracts. It can also be used to fork other EVM compatible networks.

### SYNOPSIS

`anvil` [*options*]

### DESCRIPTION

Create a local testnet node for deploying and testing smart contracts. It can also be used to fork other EVM compatible networks.

This section covers an extensive list of information about Mining Modes, Supported Transport Layers, Supported RPC Methods, Anvil flags and their usages. You can run multiple flags at the same time.

#### Mining Modes
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

#### Supported Transport Layers
HTTP and Websocket connections are supported. The server listens on port 8545 by default, but it can be changed by running the following command:

```sh
anvil --port <PORT>
```  

#### Supported RPC Methods
##### Standard Methods
The standard methods are based on [this](https://eth.wiki/json-rpc/API) reference.

* `web3_clientVersion`  

* `web3_sha3`  
  
* `eth_chainId`  
  
* `eth_networkId`  
  
* `eth_gasPrice`  
  
* `eth_accounts`  
  
* `eth_blockNumber`  
  
* `eth_getBalance`  
  
* `eth_getStorageAt`  
  
* `eth_getBlockByHash`  
  
* `eth_getBlockByNumber`  
  
* `eth_getTransactionCount`  
  
* `eth_getBlockTransactionCountByHash`  
  
* `eth_getBlockTransactionCountByNumber`  
  
* `eth_getUncleCountByBlockHash`  
  
* `eth_getUncleCountByBlockNumber`  
  
* `eth_getCode`  
  
* `eth_sign`  

* `eth_signTypedData_v4`  
  
* `eth_sendTransaction`  
  
* `eth_sendRawTransaction`  
   
* `eth_call`  
  
* `eth_createAccessList`  
  
* `eth_estimateGas`  
   
* `eth_getTransactionByHash`  
  
* `eth_getTransactionByBlockHashAndIndex`  
  
* `eth_getTransactionByBlockNumberAndIndex`  
  
* `eth_getTransactionReceipt`  
  
* `eth_getUncleByBlockHashAndIndex`  
  
* `eth_getUncleByBlockNumberAndIndex`  
  
* `eth_getLogs`  
  
* `eth_newFilter`  
  
* `eth_getFilterChanges`  
  
* `eth_newBlockFilter`  
  
* `eth_newPendingTransactionFilter`  
  
* `eth_getFilterLogs`  
  
* `eth_uninstallFilter`  
  
* `eth_getWork`  

* `eth_subscribe`

* `eth_unsubscribe`  

* `eth_syncing`  
  
* `eth_submitWork`  
  
* `eth_submitHashrate`  
  
* `eth_feeHistory`

* `eth_getProof`

* `debug_traceTransaction`  
Use `anvil --steps-tracing` to get `structLogs`  

* `trace_transaction`
  
* `trace_block`

##### Custom Methods
The `anvil_*` namespace is an alias for `hardhat`. For more info, refer to the [Hardhat documentation](https://hardhat.org/hardhat-network/reference#hardhat-network-methods).

`anvil_impersonateAccount`   
Send transactions impersonating an externally owned account or contract. While impersonating a contract, the contract functions can not be called. `anvil_stopImpersonatingAccount` must be used if the contract's functions are to be called again. See also [EIP-3607](https://eips.ethereum.org/EIPS/eip-3607).

`anvil_stopImpersonatingAccount`  
Stops impersonating an account or contract if previously set with `anvil_impersonateAccount`

`anvil_getAutomine`  
Returns true if automatic mining is enabled, and false if it is not

`anvil_mine`  
Mines a series of blocks

`anvil_dropTransaction`  
Removes transactions from the pool

`anvil_reset`  
Reset the fork to a fresh forked state, and optionally update the fork config

`anvil_setRpcUrl`  
Sets the backend RPC URL

`anvil_setBalance`  
Modifies the balance of an account

`anvil_setCode`  
Sets the code of a contract

`anvil_setNonce`  
Sets the nonce of an address

`anvil_setStorageAt`  
Writes a single slot of the account's storage

`anvil_setCoinbase`  
Sets the coinbase address

`anvil_setLoggingEnabled`  
Enable or disable logging

`anvil_setMinGasPrice`  
Set the minimum gas price for the node

`anvil_setNextBlockBaseFeePerGas`  
Sets the base fee of the next block

`anvil_dumpState`
Returns a hex string representing the complete state of the chain. Can be re-imported into a fresh/restarted instance of Anvil to reattain the same state.

`anvil_loadState`
When given a hex string previously returned by `anvil_dumpState`, merges the contents into the current chain state. Will overwrite any colliding accounts/storage slots.

`anvil_nodeInfo`
Retrieves the configuration params for the currently running Anvil node.

##### Special Methods
The special methods come from Ganache. You can take a look at the documentation [here](https://github.com/trufflesuite/ganache-cli-archive/blob/master/README.md).

`evm_setAutomine`  
Enables or disables, based on the single boolean argument, the automatic mining of new blocks with each new transaction submitted to the network
  
`evm_setIntervalMining`  
Sets the mining behavior to interval with the given interval (seconds)

`evm_snapshot`  
Snapshot the state of the blockchain at the current block

`evm_revert`  
Revert the state of the blockchain to a previous snapshot. Takes a single parameter, which is the snapshot id to revert to

`evm_increaseTime`  
Jump forward in time by the given amount of time, in seconds

`evm_setNextBlockTimestamp`  
Similar to `evm_increaseTime` but takes the exact timestamp that you want in the next block

`anvil_setBlockTimestampInterval`  
Similar to `evm_increaseTime` but sets a block timestamp `interval`. The timestamp of the next block will be computed as `lastBlock_timestamp + interval`

`evm_setBlockGasLimit`  
Sets the block gas limit for the following blocks

`anvil_removeBlockTimestampInterval`  
Removes an `anvil_setBlockTimestampInterval` if it exists

`evm_mine`  
Mine a single block

`anvil_enableTraces`  
Turn on call traces for transactions that are returned to the user when they execute a transaction (instead of just txhash/receipt)
  
`eth_sendUnsignedTransaction`  
Execute a transaction regardless of signature status

For the next three methods, make sure to read [Geth's documentation](https://geth.ethereum.org/docs/rpc/ns-txpool).

`txpool_status`  
Returns the number of transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only  

`txpool_inspect`  
Returns a summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only

`txpool_content`  
Returns the details of all transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only


### OPTIONS
#### General Options
`-a, --accounts <ACCOUNTS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Set the number of accounts [default: 10]

`-b, --block-time <block-time>`  
&nbsp;&nbsp;&nbsp;&nbsp; Block time in seconds for interval mining

`--balance <BALANCE>`  
&nbsp;&nbsp;&nbsp;&nbsp; Set the balance of the accounts [default: 10000]

`--derivation-path <DERIVATION_PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Set the derivation path of the child key to be derived [default: m/44'/60'/0'/0/]

`-h, --help`  
&nbsp;&nbsp;&nbsp;&nbsp; Print help information

`--hardfork <HARDFORK>`  
&nbsp;&nbsp;&nbsp;&nbsp; Choose the EVM hardfork to use [default: latest]

`--init <PATH>`  
&nbsp;&nbsp;&nbsp;&nbsp; Initialize the genesis block with the given `genesis.json` file.

`-m, --mnemonic <MNEMONIC>`  
&nbsp;&nbsp;&nbsp;&nbsp; BIP39 mnemonic phrase used for generating accounts

`--no-mining`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead

`--order <ORDER>`  
&nbsp;&nbsp;&nbsp;&nbsp; How transactions are sorted in the mempool [default: fees]

`-p, --port <PORT>`  
&nbsp;&nbsp;&nbsp;&nbsp; Port number to listen on [default: 8545]

`--steps-tracing`  
&nbsp;&nbsp;&nbsp;&nbsp; Enable steps tracing used for debug calls returning geth-style traces [aliases: tracing]

`--ipc [<PATH>]`  
&nbsp;&nbsp;&nbsp;&nbsp; Starts an IPC endpoint at the given `PATH` argument or the default path: unix: `tmp/anvil.ipc`, windows: `\\.\pipe\anvil.ipc` 

`--silent`  
&nbsp;&nbsp;&nbsp;&nbsp; Don't print anything on startup

`--timestamp <TIMESTAMP>`
&nbsp;&nbsp;&nbsp;&nbsp; Set the timestamp of the genesis block 

`-V, --version`  
&nbsp;&nbsp;&nbsp;&nbsp; Print version information


#### EVM Options
`-f, --fork-url <URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state over a remote endpoint instead of starting from an empty state

`--fork-block-number <BLOCK>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state from a specific block number over a remote endpoint (Must pass --fork-url in the same command-line)

`--fork-retry-backoff <BACKOFF>`  
&nbsp;&nbsp;&nbsp;&nbsp; Initial retry backoff on encountering errors.

`--retries <retries>`  
&nbsp;&nbsp;&nbsp;&nbsp; Number of retry requests for spurious networks (timed out requests). [default value= 5]

`--timeout <timeout>`  
&nbsp;&nbsp;&nbsp;&nbsp; Timeout in ms for requests sent to remote JSON-RPC server in forking mode. [default value= 45000]

`--compute-units-per-second <CUPS>`  
&nbsp;&nbsp;&nbsp;&nbsp; Sets the number of assumed available compute units per second for this provider [default value=330]
&nbsp;&nbsp;&nbsp;&nbsp; See also, [Alchemy Ratelimits](https://github.com/alchemyplatform/alchemy-docs/blob/master/documentation/compute-units.md#rate-limits-cups)

`--no-rate-limit`
&nbsp;&nbsp;&nbsp;&nbsp; Disables rate limiting for this node's provider. Will always override `--compute-units-per-second` if present. [default value= false]
&nbsp;&nbsp;&nbsp;&nbsp; See also, [Alchemy Ratelimits](https://github.com/alchemyplatform/alchemy-docs/blob/master/documentation/compute-units.md#rate-limits-cups)

`--no-storage-caching>`  
&nbsp;&nbsp;&nbsp;&nbsp; Explicitly disables the use of RPC caching. All storage slots are read entirely from the endpoint. This flag overrides the project's configuration file (Must pass --fork-url in the same command-line)


#### Executor Environment Config
`--base-fee <FEE>`  
`--block-base-fee-per-gas <FEE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The base fee in a block

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID

`--code-size-limit <CODE_SIZE>`  
&nbsp;&nbsp;&nbsp;&nbsp; EIP-170: Contract code size limit in bytes. Useful to increase this because of tests.
By default, it is 0x6000 (~25kb)

`--gas-limit <GAS_LIMIT>`  
&nbsp;&nbsp;&nbsp;&nbsp; The block gas limit

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The gas price

#### Server Options
`--allow-origin <allow-origin>`  
&nbsp;&nbsp;&nbsp;&nbsp; Set the CORS allow_origin [default: *]

`--no-cors`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable CORS

`--host <HOST>`  
&nbsp;&nbsp;&nbsp;&nbsp; The IP address the server will listen on

`--config-out <OUT_FILE>`  
&nbsp;&nbsp;&nbsp;&nbsp; Writes output of `anvil` as json to user-specified file

`--prune-history`  
&nbsp;&nbsp;&nbsp;&nbsp; Don't keep full chain history

### EXAMPLES
1. Set the number of accounts to 15 and their balance to 300 ETH
  ```sh
  anvil --accounts 15 --balance 300
  ```

2. Choose the address which will execute the tests
  ```sh
  anvil --sender 0xC8479C45EE87E0B437c09d3b8FE8ED14ccDa825E
  ```

3. Change how transactions are sorted in the mempool to FIFO
  ```sh
  anvil --order fifo
  ```

### Shell Completions

``anvil completions`` *shell*

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
    anvil completions zsh > $HOME/.oh-my-zsh/completions/_anvil
    ```


### Usage within Docker

In order to run anvil as a service in Github Actions with the [Docker container](./tutorials/foundry-docker.md), where passing arguments to the entrypoint command is not possible, use the `ANVIL_IP_ADDR` environment variable to set the host's IP. `ANVIL_IP_ADDR=0.0.0.0` is equivalent to providing the `--host <ip>` option.
