## `cast` Reference

`cast` lets you perform Ethereum RPC calls from the comfort of your command line.

### Cast CLI

This is a complete overview of all the available `cast` subcommands. For detailed descriptions and example usage, see below.

```text
--abi-decode             Decode ABI-encoded hex output data. Pass --input to decode as input, or use
                            `--calldata-decode`
--calldata-decode        Decode ABI-encoded hex input data. Use `--abi-decode` to decode output data 
--from-bin               Convert binary data into hex data
--from-fix               Convert fixed point into specified number of decimals
--from-utf8              convert text data into hexdata
--from-wei               convert wei into an ETH amount
--max-int                maximum i256 value
--max-uint               maximum u256 value
--min-int                minimum i256 value
--to-ascii               convert hex data to text data
--to-bytes32             left-pads a hex bytes string to 32 bytes)
--to-checksum-address    convert an address to a checksummed format (EIP-55)
--to-dec                 convert hex value into decimal number
--to-fix                 convert integers into fixed point with specified decimals
--to-hex                 convert a decimal number into hex
--to-hexdata             [<hex>|</path>|<@tag>]
                                Output lowercase, 0x-prefixed hex, converting from the
                                input, which can be:
                                - mixed case hex with or without 0x prefix
                                - 0x prefixed hex, concatenated with a ':'
                                - absolute path to file
                                - @tag, where $TAG is defined in environment variables
--to-int256              Convert a number into int256 hex string with 0x prefix
--to-uint256             convert a number into uint256 hex string with 0x prefix
--to-unit                Convert an ETH amount into a specified unit: ether, gwei or wei (default: wei).
                                Usage:
                                - 1ether wei     | converts 1 ether to wei
                                - "1 ether" wei  | converts 1 ether to wei
                                - 1ether         | converts 1 ether to wei
                                - 1 gwei         | converts 1 wei to gwei
                                - 1gwei ether    | converts 1 gwei to ether
--to-wei                 convert an ETH amount into wei
4byte                    Fetches function signatures given the selector from 4byte.directory
4byte-decode             Decodes transaction calldata by fetching the signature using 4byte.directory
4byte-event              Takes a 32 byte topic and prints the response from querying 4byte.directory for that topic
abi-encode               ABI encodes the given arguments with the function signature, excluding the selector
access-list              Create an access list for a transaction
age                      Prints the timestamp of a block
balance                  Print the balance of <account> in wei
basefee                  Print the basefee of a block
block                    Prints information about <block>. If <field> is given, print only the value of that
                            field
block-number             Prints latest block number
call                     Perform a local call to <to> without publishing a transaction.
calldata                 Pack a signature and an argument list into hexadecimal calldata.
chain                    Prints symbolic name of current blockchain by checking genesis hash
chain-id                 Returns ethereum chain id
code                     Prints the bytecode at <address>
completions              Generate shell completions script
compute-address          Returns the computed address from a given address and nonce pair
estimate                 Estimate the gas cost of a transaction from <from> to <to> with <data>
etherscan-source         Prints the source code of a contract from Etherscan
find-block               Prints the block number closest to the provided timestamp
gas-price                Prints current gas price of target chain
help                     Print this message or the help of the given subcommand(s)
index                    Get storage slot of value from mapping type, mapping slot number and input value
interface                Generate contract's interface from ABI. Currently it doesn't support ABI encoder V2
keccak                   Keccak-256 hashes arbitrary data
lookup-address           Returns the name the provided address resolves to
namehash                 Returns ENS namehash of provided name
nonce                    Prints the number of transactions sent from <address>
pretty-calldata          Pretty prints calldata, if available gets signature from 4byte.directory
proof                    Generate a storage proof for a given slot
publish                  Publish a raw transaction to the network
receipt                  Print information about the transaction receipt for <tx-hash>
resolve-name             Returns the address the provided ENS name resolves to
send                     Publish a transaction signed by <from> to call <to> with <data>
sig                      Print a function's 4-byte selector
storage                  Show the raw value of a contract's storage slot
tx                       Show information about the transaction <tx-hash>
wallet                   Set of wallet management utilities
```

### `cast` Subcommands
This section documents all `cast` subcommands and provides usage examples.

---

#### `--abi-decode`

```ignore
cast --abi-decode [OPTIONS] <SIG> <CALLDATA>
```

Where `[OPTIONS]` is `--input`

Decode ABI-encoded hexadecimal output. Pass `--input` to decode as input, or use `--calldata-decode`.

##### Example

```bash
$ cast --abi-decode --input "fulfillRandomness(bytes32,uint256)" 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
0x676d000000000000000000000000000000000000000000000000000000000000
999
```

<br>

---

#### `--calldata-decode`

```ignore
cast --calldata-decode <SIG> <CALLDATA>
```

Decode ABI-encoded hexadecimal input. Use `--abi-decode` to decode output data.

##### Example

```bash
$ cast --calldata-decode "fulfillRandomness(bytes32,uint256)" 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
0x676d000000000000000000000000000000000000000000000000000000000000
999
```

<br>

---

#### `--from-bin`

```ignore
cast --from-bin
```

Convert binary data into hex data.

##### Example

```bash
$ echo -n "gm"| cast --from-bin
0x676d
```

<br>

---

#### `--from-fix`

```ignore
cast --from-fix [ARGS]
```

Where `[ARGS]` are `<DECIMALS>` and `<VALUE>`

Convert fixed point into specified number of decimals.

##### Example

```bash
$ cast --from-fix 16 8
80000000000000000
```

<br>

---

#### `--from-utf8`

```ignore
cast --from-utf8 [TEXT]
```

Convert from UTF8 to hexadecimal.

##### Example

```bash
$ cast --from-utf8 "gm"
0x676d
```

<br>

---

#### `--from-wei`

```ignore
cast --from-wei [ARGS]
```

Where `[ARGS]` are `<VALUE>` and `<UNIT>`

Convert from `wei` to `ether`.

##### Example

```bash
$ cast --from-wei 100000000000000000
0.1
```

<br>

---

#### `--max-int`

```ignore
cast --max-int
```

Maximum `int256` value.

##### Example

```bash
$ cast --max-int
57896044618658097711785492504343953926634992332820282019728792003956564819967
```

<br>

---

#### `--max-uint`

```ignore
cast --max-uint
```

Maximum `uint256` value.

##### Example

```bash
$ cast --max-uint
115792089237316195423570985008687907853269984665640564039457584007913129639935
```

<br>

---

#### `--min-int`

```ignore
cast --min-int
```

Minimum `int256` value.

##### Example

```bash
$ cast --min-int
-57896044618658097711785492504343953926634992332820282019728792003956564819968
```

<br>

---

#### `--to-ascii`

```ignore
cast --to-ascii [HEXDATA]
```

Convert from hexadecimal to ASCII.

##### Example

```bash
$ cast --to-ascii 0x676d
gm
```

<br>

---

#### `--to-bytes32`

```ignore
cast --to-bytes32 [BYTES]
```

Left pad hexadecimal to `bytes32`.

##### Example

```bash
$ cast --to-bytes32 0x676d
0x676d000000000000000000000000000000000000000000000000000000000000
```

<br>

---

#### `--to-checksum-address`

```ignore
cast --to-checksum-address [ADDRESS]
```

Convert an address to a checksummed format (EIP-55)

##### Example

```bash
$ cast --to-checksum-address 0x6b175474e89094c44da98b954eedeac495271d0f
0x6B175474E89094C44Da98b954EedeAC495271d0F
```

<br>

---

#### `--to-dec`

```ignore
cast --to-dec [HEXVALUE]
```

Convert from hexadecimal to decimal.

##### Example

```bash
$ cast --to-dec 0xf
15
```

<br>

---

#### `--to-fix`

```ignore
cast --to-fix [ARGS]
```

Where `[ARGS]` are `<DECIMALS>` and `<VALUE>`

Convert from integer to fixed-point.

##### Example

```bash
cast --to-fix 18 1
0.000000000000000001
```

<br>

---

#### `--to-hex`

```ignore
cast --to-hex [DECIMAL]
```

Convert from decimal to hexadecimal.

##### Example

```bash
$ cast --to-hex 15
0xf
```

<br>

---

#### `--to-hexdata`

```ignore
cast --to-hexdata [INPUT]
```

Where `[INPUT]` can be:
- mixed case hex with or without `0x` prefix
- `0x` prefixed hex, concatenated with a `:`
- absolute path to file
- `@<$TAG>`, where `$TAG` is defined in environment variables

Convert input to lowercase, `0x`-prefixed hexadecimal.

##### Example

```bash
$ export EXAMPLE_INPUT=gm
$ cast --to-hexdata @EXAMPLE_INPUT
0x676d
```

<br>

---

#### `--to-int256`

```ignore
cast --to-int256 [VALUE]
```

Convert a number into `int256` hexadecimal.

##### Example

```bash
$ cast --to-int256 -- -15
0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
```

<br>

---

#### `--to-uint256`

```ignore
cast --to-uint256 [VALUE]
```

Convert a number into `uint256` hexadecimal.

##### Example

```bash
$ cast --to-uint256 15
0x000000000000000000000000000000000000000000000000000000000000000f
```

<br>

---

#### `--to-unit`

```ignore
cast --to-uint256 [ARGS]
```

Where `[ARGS]` are `<VALUE>` `<UNIT>`

Convert a number into a specified unit: ether, gwei or wei (default: wei).

##### Example

```bash
$ cast --to-unit 1gwei ether
0.000000001000000000
```

<br>

---

#### `--to-wei`

```ignore
cast --to-wei [ARGS]
```

Where `[ARGS]` are `<VALUE>` and `<UNIT>`

Convert from `ether` to `wei`.

##### Example

```bash
$ cast --to-wei 1
1000000000000000000
```

<br>

---

#### `4byte`

```ignore
cast 4byte <SELECTOR>
```

Fetch function signature using the selector.

##### Example

```bash
$ cast 4byte 0x1F1F897F
fulfillRandomness(bytes32,uint256)
```

<br>

---

#### `4byte-decode`

```ignore
cast 4byte-decode [OPTIONS] <CALLDATA>
```

Where `[OPTIONS]` is `--id <ID>` (the 4byte selector id to use, can also be `earliest` or `latest`)

Decode calldata by fetching the signature.

##### Example

```bash
$ cast 4byte-decode 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
1) "fulfillRandomness(bytes32,uint256)"
0x676d000000000000000000000000000000000000000000000000000000000000
999
```

<br>

---

#### `4byte-event`

```ignore
cast 4byte-event <TOPIC>
```

Queries https://4byte.directory for the provided event topic

##### Example

```bash
$ cast 4byte-event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
Transfer(address,address,uint256)

```

<br>

---

#### `abi-encode`

```ignore
cast abi-encode <SIG> <ARGS>
```

Endcode the arguments with the function signature using ABI, exculding the selector.

##### Example

```bash
$ cast abi-encode "fulfillRandomness(bytes32,uint256)" 0x676d000000000000000000000000000000000000000000000000000000000000 999
0x676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
```

<br>

---

#### `access-list`

```ignore
cast access-list [OPTIONS] <ADDRESS> <SIG> [ARGS]...
```

Create an access list for a transaction.  
The node must support the `eth_createAccesList` json-RPC method.

##### Example

```bash
$ cast access-list --rpc-url <your_rpc_url> 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)"
prints the access list here...
```

<br>

---

#### `age`

```ignore
cast age --rpc-url <RPC_URL> [BLOCK]
```

env: `ETH_RPC_URL`

Print the timestamp of a block.

##### Example

```bash
$ cast age --rpc-url <your_rpc_url> 1
Thu Jul 30 15:26:28 2015
```

<br>

---

#### `balance`

```ignore
cast balance [OPTIONS] --rpc-url <RPC_URL> <WHO>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Print the balance of an account in wei.

##### Example

```bash
$ cast balance --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
4345868603562666975407
```

<br>

---

#### `basefee`

```ignore
cast basefee --rpc-url <RPC_URL> [BLOCK]
```

env: `ETH_RPC_URL`

Where `[BLOCK]` is the block you want to query, can also be `earliest`,`latest`,`pending`

Print the basefee of a block.

##### Example

```bash
$ cast basefee --rpc-url <your_rpc_url>
75171909348
```

<br>

---

#### `block`

```ignore
cast block [OPTIONS] --rpc-url <RPC_URL> <BLOCK> [FIELD]
```

env: `ETH_RPC_URL`

Where:
- `[OPTIONS]` are `--full` and `--json`
- `<BLOCK>` is the block you want to query, can also be `earliest`,`latest`,`pending`

Print information about a block or only one of its fields.

##### Example

```bash
$ cast block --rpc-url <your_rpc_url> latest
baseFeePerGas        "0x1823d83b1f"
difficulty           "0x2d3af62284c2ab"
extraData            "0x466c6578706f6f6c2f53312f55532d57657374202d204d656c626f75726e65"
gasLimit             "0x...
...
```

<br>

---

#### `block-number`

```ignore
cast block-number --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Print latest block number.

##### Example

```bash
$ cast block-number --rpc-url <your_rpc_url>
14100150
```

<br>

---

#### `call`

```ignore
cast call [OPTIONS] <ADDRESS> <SIG> [ARGS] --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet) env: `CHAIN`
- `--etherscan-api-key <ETHERSCAN_API_KEY>` env: `ETHERSCAN_API_KEY`
- `--from <FROM>` (the sender account) env: `ETH_FROM`
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file) env: `ETH_KEYSTORE`
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Perform a local smart contract call.

##### Example

```bash
$ cast call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url <your_rpc_url>
9086622410684231497979028744
```

<br>

---

#### `calldata`

```ignore
cast calldata <SIG> [ARGS]
```

Pack a function signature and arguments into hexadecimal calldata.

##### Example

```bash
$ cast calldata "fulfillRandomness(bytes32,uint256)" 0x676d000000000000000000000000000000000000000000000000000000000000 999
0x1f1f897f676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
```

<br>

---

#### `chain`

```ignore
cast chain --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Print symbolic name of current blockchain by checking genesis hash.

##### Example

```bash
$ cast chain --rpc-url <your_rpc_url>
ethlive
```

<br>

---

#### `chain-id`

```ignore
cast chain-id --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Return chain ID.

##### Example

```bash
$ cast chain-id --rpc-url <your_rpc_url>
1
```

<br>

---

#### `client`

```ignore
cast client --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Return the node's client version

##### Example

```bash
$ cast client --rpc-url <your_rpc_url>
Geth/v1.10.15-omnibus-hotfix-f4decf48/linux-amd64/go1.17.6
```

<br>

---

#### `code`

```ignore
cast code [OPTIONS] --rpc-url <RPC_URL> <WHO>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Print the bytecode at an address.

##### Example

```bash
$ cast code --rpc-url <your_rpc_url> 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
0x60806040523480156100...
```

<br>

---

#### `completions`

```ignore
cast completions <SHELL>
```

Where `<SHELL>` can be `bash`, `elvish`, `fish`, `powershell`, `zsh`

Generate shell completions script.

##### Example

```bash
$ cast completions bash
prints the bash completions script here...
```

<br>

---

#### `compute-address`

```ignore
cast compute-address [OPTIONS] --rpc-url <RPC_URL> <ADDRESS>
```

Where `[OPTIONS]` is `--nonce`.  
 (If a nonce is given, calculates from that nonce instead of fetching `<ADDRESS>`'s nonce from the node. )

Computes the resulting address if `<ADDRESS>` were to create a new contract.    


##### Example

```bash
$ cast compute-address --rpc-url <your_rpc_url>  0xd8da6bf26964af9d7eed9e03e53415d37aa96045 --nonce 3
Computed Address: 0xa62d8f8b880086bfefc1cef636168c22403726d4
```

<br>

---

#### `estimate`

```ignore
cast estimate [OPTIONS] <ADDRESS> <SIG> [ARGS] --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet) env: `CHAIN`
- `--etherscan-api-key <ETHERSCAN_API_KEY>` env: `ETHERSCAN_API_KEY`
- `--from <FROM>` (the sender account) env: `ETH_FROM`
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file) env: `ETH_KEYSTORE`
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Estimate the gas cost of a transaction.

##### Example

```bash
$ cast estimate --from 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 0xc18360217d8f7ab5e7c516566761ea12ce7f9d72 "transfer(address,uint)(bool)" 0x15322B546e31F5Bfe144C4ae133A9Db6F0059fe3 1000000000000000000 --rpc-url <your_rpc_url>
90677
```

<br>

---

#### `etherscan-source`

```ignore
cast etherscan-source [OPTIONS] --etherscan-api-key <ETHERSCAN_API_KEY> <ADDRESS>
```

Where `[OPTIONS]` are:  
- `-c, --chain <INNER>` env: `CHAIN`   
    Possible values: 
    - `mainnet`
    - `ropsten`
    - `rinkeby`
    - `goerli`
    - `kovan`
    - `xdai`
    - `polygon`
    - `polygon_mumbai`
    - `avalanche`
    - `avalanche_fuji`
    - `sepolia`
    - `moonbeam`
    - `moonbeam_dev`
    - `moonriver`
    - `optimism`
    - `optimism-kovan`
- `-d <DIRECTORY>` (output directory to expand source tree)
- `--etherscan-api-key <ETHERSCAN_API_KEY>` env: `ETHERSCAN_API_KEY`

Prints the source code of the contract, fetched from Etherscan.

##### Example

```bash
$ cast etherscan-source --etherscan-api-key  <your_api_key> 0x6b175474e89094c44da98b954eedeac495271d0f
prints the DAI token code here...
```

<br>

---

#### `find-block`

```ignore
cast find-block --rpc-url <RPC_URL> <TIMESTAMP>
```

env: `ETH_RPC_URL`

Prints the block number closest to the provided timestamp

##### Example

```bash
$ cast find-block --rpc-url <RPC_URL> <TIMESTAMP>
13917761
```

<br>

---

#### `gas-price`

```ignore
cast gas-price --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Print current gas price of target chain.

##### Example

```bash
$ cast gas-price --rpc-url <your_rpc_url>
89367836498
```

<br>

---

#### `help`

```ignore
cast help <SUBCOMMAND>
```

Print the `cast` help message or the help message of `<SUBCOMMAND>` if provided.  
`cast help` is also also available with the `--help` flag

##### Examples

```ignore
$ cast help --max-uint
cast---max-uint 
Maximum u256 value

USAGE:
    cast --max-uint

OPTIONS:
    -h, --help    Print help information
```
```ignore
$ cast --max-uint --help
same as above ...
```

<br>

---

#### `index`

```ignore
cast index <FROM_TYPE> <TO_TYPE> <FROM_VALUE> <SLOT_NUMBER>
```

Get the storage slot value for a solidity-style mapping.

Where:   
- `<FROM_TYPE>`      is the mapping key type,  
- `<TO_TYPE>`        is the mapping value type,  
- `<FROM_VALUE>`     is the value,  
- `<SLOT_NUMBER>`    is the storage slot of the mapping  

##### Example

```bash
$ cast index uint uint 1 1
0xcc69885fda6bcc1a4ace058b4a62bf5e179ea78fd58a1ccd71c22cc9b688792f
```

<br>

---

#### `interface`

```ignore
cast interface [OPTIONS] <PATH_OR_ADDRESS>
```

Where `[OPTIONS]` are:  
- `-c, --chain <INNER>` env: `CHAIN`   
    Possible values: 
    - `mainnet`
    - `ropsten`
    - `rinkeby`
    - `goerli`
    - `kovan`
    - `xdai`
    - `polygon`
    - `polygon_mumbai`
    - `avalanche`
    - `avalanche_fuji`
    - `sepolia`
    - `moonbeam`
    - `moonbeam_dev`
    - `moonriver`
    - `optimism`
    - `optimism-kovan`
- `-e <ETHERSCAN_API_KEY>` (etherscan API key) env:` ETHERSCAN_API_KEY`
- `-h, --help` (Print help information)
- -`o <OUTPUT_LOCATION>` (Path to output file. Defaults to stdout)
- `-p, --pragma <PRAGMA>` (pragma version [default: ^0.8.10])  


Generate a contract's interface from ABI.

##### Example

```bash
$ cast interface -e <your_etherscan_api_key> 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
pragma solidity ^0.8.10;

interface WETH9 {
    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Transfer(address indexed src, address indexed dst, 
prints the rest of the WETH interface ...
```

<br>

---

#### `keccak`

```ignore
cast keccak <DATA>
```

Keccak-256-hash arbitrary data.

##### Example

```bash
$ cast keccak gm
0x71b78290913af2addd8fcbe5766de306af2c8afbc466ca891e207f73638c7270
```

<br>

---

#### `lookup-address`

```ignore
cast lookup-address [OPTIONS] --rpc-url <RPC_URL> <WHO>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--verify` (do a forward resolution to ensure the address is correct)

Get the ENS name an address resolves to.

##### Example

```bash
$ cast lookup-address --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
vitalik.eth
```

<br>

---

#### `namehash`

```ignore
cast namehash <NAME>
```

Print ENS namehash of a ENS name.

##### Example

```bash
$ cast namehash "vitalik.eth"
0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835
```

<br>

---

#### `nonce`

```ignore
cast nonce [OPTIONS] --rpc-url <RPC_URL> <WHO>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Get the number of transactions sent from an address.

##### Example

```bash
$ cast nonce --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
750
```

<br>

---

#### `pretty-calldata`

```ignore
cast pretty-calldata [OPTIONS] <CALLDATA>
```

Where `[OPTIONS]` is `-o, --offline` (Skips the 4byte directory lookup)

Pretty prints calldata and gets the function signature from 4byte.directoy

##### Example

```bash
$ cast pretty-calldata 0xa9059cbb0000000000000000000000000cfb686e114d478b055ce8614621f8bb62f70360000000000000000000000000000000000000000000000002b5e3af16b1880000 -o

 Method: a9059cbb
 ------------
 [0]:  0000000000000000000000000cfb686e114d478b055ce8614621f8bb62f70360
 [1]:  000000000000000000000000000000000000000000000002b5e3af16b1880000
```

<br>

---

#### `proof`

````ignore
cast proof [OPTIONS] --rpc-url <RPC_URL> <ADDRESS> [SLOTS]...
````
env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Generate a storage proof for a given slot

##### Example 

```bash
$ cast proof --rpc-url <rpc-url> 0xED5AF388653567Af2F388E6224dC7C4b3241C544 1
```

This will output a JSON object of the storage proof (inluding the `key`, `proof`, and `value`) as well as other information such as the `address`, `balance`, and `nonce`.

<br>

---

#### `publish`

````ignore
cast publish [OPTIONS] <RAW_TX>
````
env: `ETH_RPC_URL`

Where `[OPTIONS]` are:
- `--cast-async` env: `CAST_ASYNC`
- `--chain <CHAIN>` (default: mainnet) env: `CHAIN`
- `--etherscan-api-key <ETHERSCAN_API_KEY>` env: `ETHERSCAN_API_KEY`
- `--from <FROM>` (the sender account) env: `ETH_FROM`
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file) env: `ETH_KEYSTORE`
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--rpc-url <RPC_URL>` (The tracing / archival node's URL) env: `ETH_RPC_URL`
- `--trezor` (use your Trezor hardware wallet)

Publish a pre-signed transaction to the network.

##### Example 

```bash
$ cast publish --from <your_address> $(cast call <address> <sig> <args> --rpc-url <your_rpc_url>) --rpc-url <your_rpc_url> 

prints the transaction receipt...
```

<br>

---

#### `receipt`

```ignore
cast receipt [OPTIONS] --rpc-url <RPC_URL> <HASH> [FIELD]
```

Where `[OPTIONS]` are:
- -c, --confirmations <CONFIRMATIONS>  (the number of confirmations until the receipt is fetched [default: 1])
- --cast-async env: [CAST_ASYNC]
- -h, --help  (Print help information)
- -j, --json   
- --rpc-url <RPC_URL> env: [ETH_RPC_URL]

env: `ETH_RPC_URL`, `CAST_ASYNC`

Prints out the transaction receipt information for tx `<HASH>`

##### Example

```bash
$ cast receipt --rpc-url <your_rpc_url> 0xc31d7e7e85cab1d38ce1b8ac17e821ccd47dbde00f9d57f2bd8613bff9428396 gasUsed
0x2e8777
```

<br>

---

#### `resolve-name`

```ignore
cast resolve-name [OPTIONS] --rpc-url <RPC_URL> [WHO]
```

env: `ETH_RPC_URL`

Get the address an ENS name resolves to.

##### Example

```bash
$ cast resolve-name --rpc-url <your_rpc_url> "vitalik.eth"
0xd8da6bf26964af9d7eed9e03e53415d37aa96045
```

<br>

---

#### `send`

```ignore
cast send [OPTIONS] <ADDRESS> <SIG> [ARGS] --rpc-url <RPC_URL>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet) env: `CHAIN`
- `--etherscan-api-key <ETHERSCAN_API_KEY>` env: `ETHERSCAN_API_KEY`
- `--from <FROM>` (the sender account) env: `ETH_FROM`
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file) env: `ETH_KEYSTORE`
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Publish a transaction.

##### Example

```bash
$ cast send --chain kovan --from <your_address> --interactive 0xd0A1E359811322d97991E03f863a0C30C2cF029C "deposit()" --value 0.1ether --rpc-url <your_rpc_url>
Insert private key:

prints the transaction receipt...
```

<br>

---

#### `sig`

```ignore
cast sig <SIG>
```

Prints the 4 byte function selector of the given human readable function signature.

##### Example

```bash
$ cast sig "transfer(address,uint)"
0xa9059cbb
```

<br>

---

#### `storage`

```ignore
cast storage [OPTIONS] --rpc-url <RPC_URL> <ADDRESS> <SLOT>
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Get the raw value of a contract's storage slot.

##### Example

```bash
$ cast storage --rpc-url <your_rpc_url> 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
0x577261707065642045746865720000000000000000000000000000000000001a
```

<br>

---

#### `tx`

```ignore
cast tx [OPTIONS] --rpc-url <RPC_URL> <HASH> [FIELD]
```

env: `ETH_RPC_URL`

Where `[OPTIONS]` are `--json`

Print information about a transaction or only one of its fields.

##### Example

```bash
$ cast tx --rpc-url <your_rpc_url> 0xf85ece86f9dec5bfa0357606a6afe0d696290cefe117194c8226ed4adfe228e7
accessList           []
blockHash            "0x185fc0bf17167beb2a82311ec3739d560cc9107bc109f0e8ab73daf86573d5b8"
blockNumber          "0xd6e090"
chainId              "0x...
...
```

<br>

---

#### `wallet`

```ignore
cast wallet <SUBCOMMAND>
```

Where `<SUBCOMMAND>` can be:
- `address` (convert a private key to an address)
- `new` (create and output a new random keypair)
- `sign` (sign the message with provided private key)
- `vanity` (generate a vanity address)
- `verify` (verify the signature on the message)

Set of wallet management utilities.

Convert a private key to an address with `address`.

```ignore
cast wallet address [OPTIONS]
```

Where `[OPTIONS]` are:
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file) env: `ETH_KEYSTORE`
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

##### Example

```bash
cast wallet address --interactive
Insert private key: <PRIVATE_KEY>

Address: 0xBC084F73B100b50057a5175816a8ce8CfaF43b1C
```

Create a new public / private keypair with `new`.

##### Example

```bash
$ cast wallet new
Successfully created new keypair.
Address: 0x19F4aB0c5ae1245F1E06798856815D82018AFE93
Private Key: <PRIVATE_KEY>
```

Sign a message with `sign`.

##### Example

```bash
$ cast wallet sign --interactive "gm"
Insert private key:

Signature: 0x22e3ad614cf53211b2ab164b4b46a39f878606f0c9e7b412c3ceb525f039fd1d50e72bdabaef42c295be0914d8c2b720001227d8c9f8d5e13103be65a0392acd1c
```

Create a new public / private keypair with a specific prefix with `vanity`.

##### Example

```bash
$ cast wallet vanity --starts-with beef
Starting to generate vanity address...
Successfully created new keypair in 3 seconds.
Address: 0xBEEf111188257c2008271dBD193999FD1516d787
Private Key: <PRIVATE_KEY>
```

Verify the signature on a message with `verify`.

##### Example

```bash
$ cast wallet verify --address 0xBEEf111188257c2008271dBD193999FD1516d787 "gm" 0x22e3ad614cf53211b2ab164b4b46a39f878606f0c9e7b412c3ceb525f0
39fd1d50e72bdabaef42c295be0914d8c2b720001227d8c9f8d5e13103be65a0392acd1c
Validation success. Address 0xBEEf111188257c2008271dBD193999FD1516d787 signed this message.
```

<br>
<br>

> ℹ️ **Information**
>
> Print help for any subcommand (or their subcommands) by adding `--help` at the end.
