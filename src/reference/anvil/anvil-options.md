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

### Examples

1. Set the number of accounts to 15 and their balance to 300 ETH
  ```sh
  anvil --accounts 15 --balance 300
  ```
