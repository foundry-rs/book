## Anvil Flags

This section shows an extensive list of Anvil flags and their usages. You can run multiple flags at the same time.

### Options
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

`--host <HOST>`  
&nbsp;&nbsp;&nbsp;&nbsp; The IP address the server will listen on

`-m, --mnemonic <MNEMONIC>`  
&nbsp;&nbsp;&nbsp;&nbsp; BIP39 mnemonic phrase used for generating accounts

`--no-mining`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable auto and interval mining, and mine on demand instead

`--order <ORDER>`  
&nbsp;&nbsp;&nbsp;&nbsp; How transactions are sorted in the mempool [default: fees]

`-p, --port <PORT>`  
&nbsp;&nbsp;&nbsp;&nbsp; Port number to listen on [default: 8545]

`--silent`  
&nbsp;&nbsp;&nbsp;&nbsp; Don't print anything on startup

`-V, --version`  
&nbsp;&nbsp;&nbsp;&nbsp; Print version information


### EVM Options
`-f, --fork-url <URL>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state over a remote endpoint instead of starting from an empty state

`--ffi`  
&nbsp;&nbsp;&nbsp;&nbsp; Enables the FFI cheatcode

`--fork-block-number <BLOCK>`  
&nbsp;&nbsp;&nbsp;&nbsp; Fetch state from a specific block number over a remote endpoint (Must pass --fork-url in the same command-line)

`--initial-balance <BALANCE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The initial balance of deployed test contracts

`--no-storage-caching>`  
&nbsp;&nbsp;&nbsp;&nbsp; Explicitly disables the use of RPC caching. All storage slots are read entirely from the endpoint. This flag overrides the project's configuration file (Must pass --fork-url in the same command-line)

`--sender <ADDRESS> `  
&nbsp;&nbsp;&nbsp;&nbsp; The address which will be executing tests

`-v, --verbosity`  
&nbsp;&nbsp;&nbsp;&nbsp; Verbosity of the EVM. Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv)  
 &nbsp;&nbsp;&nbsp;&nbsp; Verbosity levels:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 2: Print logs for all tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 3: Print execution traces for failing tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 4: Print execution traces for all tests, and setup traces for failing tests  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 5: Print execution and setup traces for all tests


### Executor Environment Config
`--block-base-fee-per-gas <FEE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The base fee in a block

`--block-coinbase <ADDRESS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The coinbase of the block

`--block-difficulty <DIFFICULTY>`  
&nbsp;&nbsp;&nbsp;&nbsp; The block difficulty

`--block-gas-limit <GAS_LIMIT>`  
&nbsp;&nbsp;&nbsp;&nbsp; The block gas limit

`--block-number <BLOCK>`  
&nbsp;&nbsp;&nbsp;&nbsp; The block number

`--block-timestamp <TIMESTAMP>`  
&nbsp;&nbsp;&nbsp;&nbsp; The timestamp of the block

`--chain-id <CHAIN_ID>`  
&nbsp;&nbsp;&nbsp;&nbsp; The chain ID

`--gas-limit <GAS_LIMIT>`  
&nbsp;&nbsp;&nbsp;&nbsp; The block gas limit

`--gas-price <GAS_PRICE>`  
&nbsp;&nbsp;&nbsp;&nbsp; The gas price

`--tx-origin <ADDRESS>`  
&nbsp;&nbsp;&nbsp;&nbsp; The transaction origin


### Server Options
`--allow-origin <allow-origin>`  
&nbsp;&nbsp;&nbsp;&nbsp; Set the CORS allow_origin [default: *]

`--no-cors`  
&nbsp;&nbsp;&nbsp;&nbsp; Disable CORS


### Examples

1. Set the number of accounts to 15 and their balance to 300 ETH
```
anvil --accounts 15 --balance 300
```

2. Choose the address which will execute the tests
```
anvil --sender 0xC8479C45EE87E0B437c09d3b8FE8ED14ccDa825E
```

3. Change how transactions are sorted in the mempool to FIFO
```
anvil --order fifo
```
