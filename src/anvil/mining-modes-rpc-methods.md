## Mining Modes
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

## Supported Transport Layers
HTTP is already supported and WebSocket (WS) will be supported soon. The server listens on port 8545 by default, but it can be changed by running the following command:

```
anvil --port <PORT>
```  

## Supported RPC Methods
### Standard Methods
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
  
* `eth_submitWork`  
  
* `eth_submitHashrate`  
  
* `eth_feeHistory`  

* `debug_traceTransaction`  
  
* `trace_transaction`
  
* `trace_block`

### Custom Methods
The `anvil_*` namespace is an alias for `hardhat`. For more info, refer to the [Hardhat documentation](https://hardhat.org/hardhat-network/reference#hardhat-network-methods).

`anvil_impersonateAccount`   
Send transactions impersonating specific account and contract addresses

`anvil_stopImpersonatingAccount`  
Stops impersonating an account if previously set with `anvil_impersonateAccount`

`anvil_getAutomine`  
Returns true if automatic mining is enabled, and false.

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

### Special Methods
The special methods come from Ganache. You can take a look at the documentation [here](https://github.com/trufflesuite/ganache-cli-archive/blob/master/README.md).

`evm_setAutomine`  
Enables or disables, based on the single boolean argument, the automatic mining of new blocks with each new transaction submitted to the network.
  
`evm_setIntervalMining`  
Sets the mining behavior to interval with the given interval (seconds)

`evm_snapshot`  
Snapshot the state of the blockchain at the current block

`evm_revert`  
Revert the state of the blockchain to a previous snapshot. Takes a single parameter, which is the snapshot id to revert to

`evm_increaseTime`  
Jump forward in time by the given amount of time, in seconds.

`evm_setNextBlockTimestamp`  
Similar to `evm_increaseTime` but takes the exact timestamp that you want in the next block

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
