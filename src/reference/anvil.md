## anvil

### NAME

anvil - Create a local testnet node for deploying and testing smart contracts, can also be used to forking other EVM compatiable networks.

### SYNOPSIS

`anvil` [*options*]

### DESCRIPTION

Create a local testnet node for deploying and testing smart contracts, can also be used to forking other EVM compatiable networks.

### OPTIONS

`-a` _num_  
`--accounts` _num_  
&nbsp;&nbsp;&nbsp;&nbsp;Number of dev accounts to generate and configure. [default: 10]

`-b` _seconds_  
`--block-time` _seconds_  
&nbsp;&nbsp;&nbsp;&nbsp;Block time in seconds for interval mining. [aliases: blockTime]

`--balance` _num_  
&nbsp;&nbsp;&nbsp;&nbsp;The balance of every dev account in Ether. [default: 10000]

`--derivation-path` _derivation_path_  
&nbsp;&nbsp;&nbsp;&nbsp;Sets the derivation path of the child key to be derived. [default: m/44'/60'/0'/0/]

#### EVM OPTIONS

`-f` _url_  
`--fork-url` _url_  
&nbsp;&nbsp;&nbsp;&nbsp;Fetch state over a remote endpoint instead of starting from an empty state [aliases: rpc-url]

`--ffi`  
&nbsp;&nbsp;&nbsp;&nbsp;Enables the FFI cheatcode.

`--fork-block-number` _block_  
&nbsp;&nbsp;&nbsp;&nbsp;Fetch state from a specific block number over a remote endpoint

`--initial-balance` _balance_  
&nbsp;&nbsp;&nbsp;&nbsp;The initial balance of deployed test contracts

`--no-storage-caching`  
&nbsp;&nbsp;&nbsp;&nbsp;Explicitly disables the use of RPC caching

`--sender` _address_  
&nbsp;&nbsp;&nbsp;&nbsp;The address which will be executing tests

`-v`  
`--verbosity`  
&nbsp;&nbsp;&nbsp;&nbsp;Verbosity of the EVM.

#### EXECUTOR ENVIRONMENT CONFIG

`--block-base-fee-per-gas` _fee_  
&nbsp;&nbsp;&nbsp;&nbsp;The base fee in a block

`--block-coinbase` _address_  
&nbsp;&nbsp;&nbsp;&nbsp;The coinbase of the block

`--block-difficulty` _difficulty_  
&nbsp;&nbsp;&nbsp;&nbsp;The block difficulty

`--block-gas-limit` _gas_limit_  
&nbsp;&nbsp;&nbsp;&nbsp;The block gas limit

`--block-number` _block_  
&nbsp;&nbsp;&nbsp;&nbsp;The block number

`--block-timestamp` _timestamp_  
&nbsp;&nbsp;&nbsp;&nbsp;The timestamp of the block

`--chain-id` _chain_id_  
&nbsp;&nbsp;&nbsp;&nbsp;The chain ID

`--gas-limit` _gas_limit_  
&nbsp;&nbsp;&nbsp;&nbsp;The block gas limit

`--gas-price` _gas_price_  
&nbsp;&nbsp;&nbsp;&nbsp;The gas price

`--tx-origin` _address_  
&nbsp;&nbsp;&nbsp;&nbsp;The transaction origin

#### SERVER OPTIONS

`--allow-origin` <allow_origin>  
&nbsp;&nbsp;&nbsp;&nbsp;Set the CORS allow_origin [default: *]

`--no-cors`  
&nbsp;&nbsp;&nbsp;&nbsp;Disable CORS

### EXAMPLES

1. Fork the Rinkeby testnet and generate accounts with mnemonics.
   ```sh
   anvil  --fork-url $RINKEBY_RPC_URL  --mnemonic $MNEMONIC
   ```

[debugger]: ../../forge/debugger.md
