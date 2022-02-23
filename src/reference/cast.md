## `cast` Reference

`cast` lets you perform Ethereum RPC calls from the comfort of your command line.

### Cast CLI

This is a complete overview of all the available `cast` subcommands. For detailed descriptions and example usage, see below.

```text
--abi-decode             Decode ABI-encoded hex output data. Pass --input to decode as input, or use
                            `--calldata-decode`
--calldata-decode        Decode ABI-encoded hex input data. Use `--abi-decode` to decode output data
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
--to-uint256             convert a number into uint256 hex string with 0x prefix
--to-wei                 convert an ETH amount into wei
4byte                    Fetches function signatures given the selector from 4byte.directory
4byte-decode             Decodes transaction calldata by fetching the signature using 4byte.directory
abi-encode
age                      Prints the timestamp of a block
balance                  Print the balance of <account> in wei
basefee                  Print the basefee of a block
block                    Prints information about <block>. If <field> is given, print only the value of that
                            field
block-number             Prints latest block number
call                     Perform a local call to <to> without publishing a transaction.
calldata                 Pack a signature and an argument list into hexadecimal calldata.
chain                    Prints symbolic name of current blockchain by checking genesis hash
chain-id                 returns ethereum chain id
code                     Prints the bytecode at <address>
completions              generate shell completions script
estimate                 Estimate the gas cost of a transaction from <from> to <to> with <data>
gas-price                Prints current gas price of target chain
help                     Print this message or the help of the given subcommand(s)
keccak                   Keccak-256 hashes arbitrary data
lookup-address           Returns the name the provided address resolves to
namehash                 returns ENS namehash of provided name
nonce                    Prints the number of transactions sent from <address>
resolve-name             Returns the address the provided ENS name resolves to
send                     Publish a transaction signed by <from> to call <to> with <data>
storage                  Show the raw value of a contract's storage slot
tx                       Show information about the transaction <tx-hash>
wallet                   Set of wallet management utilities
```

### `cast` Subcommands
This section documents all `cast` subcommands and provides usage examples.
<br>
<br>

> --abi-decode \[OPTIONS\] \<SIG\> \<CALLDATA\>

Where `[OPTIONS]` is `--input`

Decode ABI-encoded hexadecimal output. Pass `--input` to decode as input, or use `--calldata-decode`.

```bash
$ cast --abi-decode --input "fulfillRandomness(bytes32,uint256)" 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
0x676d000000000000000000000000000000000000000000000000000000000000
999
```
<br>

> --calldata-decode \<SIG\> \<CALLDATA\>

Decode ABI-encoded hexadecimal input. Use `--abi-decode` to decode output data.

```bash
$ cast --calldata-decode "fulfillRandomness(bytes32,uint256)" 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
0x676d000000000000000000000000000000000000000000000000000000000000
999
```
<br>

> --from-utf8 \[TEXT\]

Convert from UTF8 to hexadecimal.

```bash
$ cast --from-utf8 "gm"
0x676d
```
<br>

> --from-wei \[ARGS\]

Where `[ARGS]` are `<VALUE>` and `<UNIT>`

Convert from `wei` to `ether`.

```bash
$ cast --from-wei 100000000000000000
0.1
```
<br>

> --max-int

Maximum `int256` value.

```bash
$ cast --max-int
57896044618658097711785492504343953926634992332820282019728792003956564819967
```
<br>

> --max-uint

Maximum `uint256` value.

```bash
$ cast --max-uint
115792089237316195423570985008687907853269984665640564039457584007913129639935
```
<br>

> --min-int

Minimum `int256` value.

```bash
$ cast --min-int
-57896044618658097711785492504343953926634992332820282019728792003956564819968
```
<br>

> --to-ascii \[HEXDATA\]

Convert from hexadecimal to ASCII.

```bash
$ cast --to-ascii 0x676d
gm
```
<br>

> --to-bytes32 \[BYTES\]

Left pad hexadecimal to `bytes32`.

```bash
$ cast --to-bytes32 0x676d
0x676d000000000000000000000000000000000000000000000000000000000000
```
<br>

> --to-checksum-address \[ADDRESS\]

Convert an address to a checksummed format (EIP-55)

```bash
$ cast --to-checksum-address 0x6b175474e89094c44da98b954eedeac495271d0f
0x6B175474E89094C44Da98b954EedeAC495271d0F
```
<br>

> --to-dec \[HEXVALUE\]

Convert from hexadecimal to decimal.

```bash
$ cast --to-dec 0xf
15
```
<br>

> --to-fix \[ARGS\]

Where `[ARGS]` are `<DECIMALS>` and `<VALUE>`

Convert from integer to fixed-point.

```bash
cast --to-fix 18 1
0.000000000000000001
```
<br>

> --to-hex \[DECIMAL\]

Convert from decimal to hexadecimal.

```bash
$ cast --to-hex 15
0xf
```
<br>

> --to-hexdata \[INPUT\]

Where `[INPUT]` can be:
- mixed case hex with or without `0x` prefix
- `0x` prefixed hex, concatenated with a `:`
- absolute path to file
- `@<$TAG>`, where `$TAG` is defined in environment variables

Convert input to lowercase, `0x`-prefixed hexadecimal.

```bash
$ export EXAMPLE_INPUT=gm
$ cast --to-hexdata @EXAMPLE_INPUT
0x676d
```
<br>

> --to-uint256 \[VALUE\]

Convert a number into `uint256` hexadecimal.

```bash
$ cast --to-uint256 15
0x000000000000000000000000000000000000000000000000000000000000000f
```
<br>

> --to-wei \[ARGS\]

Where `[ARGS]` are `<VALUE>` and `<UNIT>`

Convert from `ether` to `wei`.

```bash
$ cast --to-wei 1
1000000000000000000
```
<br>

> 4byte \<SELECTOR\>

Fetch function signature using the selector.

```bash
$ cast 4byte 0x1F1F897F
fulfillRandomness(bytes32,uint256)
```
<br>

> 4byte-decode \[OPTIONS\] \<CALLDATA\>

Where `[OPTIONS]` is `--id <ID>` (the 4byte selector id to use, can also be `earliest` or `latest`)

Decode calldata by fetching the signature.

```bash
$ cast 4byte-decode 0x1F1F897F676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
1) "fulfillRandomness(bytes32,uint256)"
0x676d000000000000000000000000000000000000000000000000000000000000
999
```
<br>

> abi-encode \<SIG\> \<ARGS\>

Endcode the arguments with the function signature using ABI, exculding the selector.

```bash
$ cast abi-encode "fulfillRandomness(bytes32,uint256)" 0x676d000000000000000000000000000000000000000000000000000000000000 999
0x676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
```
<br>

> age --rpc-url <RPC_URL> [BLOCK]

Print the timestamp of a block.

```bash
$ cast age --rpc-url <your_rpc_url> 1
Thu Jul 30 15:26:28 2015
```
<br>

> balance \[OPTIONS\] --rpc-url \<RPC_URL\> \<WHO\>

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Print the balance of an account in wei.

```bash
$ cast balance --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
4345868603562666975407
```
<br>

> basefee --rpc-url <RPC_URL> \[BLOCK\]

Where `[BLOCK]` is the block you want to query, can also be `earliest`,`latest`,`pending`

Print the basefee of a block.

```bash
$ cast basefee --rpc-url <your_rpc_url>
75171909348
```
<br>

> block \[OPTIONS\] --rpc-url \<RPC_URL\> \<BLOCK\> \[FIELD\]

Where:
- `[OPTIONS]` are `--full` and `--json`
- `<BLOCK>` is the block you want to query, can also be `earliest`,`latest`,`pending`

Print information about a block or only one of its fields.

```bash
$ cast block --rpc-url <your_rpc_url> latest
baseFeePerGas        "0x1823d83b1f"
difficulty           "0x2d3af62284c2ab"
extraData            "0x466c6578706f6f6c2f53312f55532d57657374202d204d656c626f75726e65"
gasLimit             "0x...
...
```
<br>

> block-number --rpc-url \<RPC_URL\>

Print latest block number.

```bash
$ cast block-number --rpc-url <your_rpc_url>
14100150
```
<br>

> call \[OPTIONS\] \<ADDRESS\> \<SIG\> \[ARGS\] --rpc-url \<RPC_URL\>

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet)
- `--etherscan-api-key <ETHERSCAN_API_KEY>`
- `--from <FROM>` (the sender account)
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file)
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Perform a local smart contract call.

```bash
$ cast call 0x6b175474e89094c44da98b954eedeac495271d0f "totalSupply()(uint256)" --rpc-url <your_rpc_url>
9086622410684231497979028744
```
<br>

> calldata \<SIG\> \[ARGS\]

Pack a function signature and arguments into hexadecimal calldata.

```bash
$ cast calldata "fulfillRandomness(bytes32,uint256)" 0x676d000000000000000000000000000000000000000000000000000000000000 999
0x1f1f897f676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
```
<br>

> chain --rpc-url \<RPC_URL\>

Print symbolic name of current blockchain by checking genesis hash.

```bash
$ cast chain --rpc-url <your_rpc_url>
ethlive
```
<br>

> chain-id --rpc-url \<RPC_URL\>

Return chain ID.

```bash
$ cast chain-id --rpc-url <your_rpc_url>
1
```
<br>

> code \[OPTIONS\] --rpc-url \<RPC_URL\> \<WHO\>

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Print the bytecode at an address.

```bash
$ cast code --rpc-url <your_rpc_url> 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
0x60806040523480156100...
```
<br>

> completions \<SHELL\>

Where `<SHELL>` can be `bash`, `elvish`, `fish`, `powershell`, `zsh`

Generate shell completions script.

```bash
$ cast completions bash
prints the bash completions script here...
```
<br>

> estimate \[OPTIONS\] \<ADDRESS\> \<SIG\> \[ARGS\] --rpc-url \<RPC_URL\>

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet)
- `--etherscan-api-key <ETHERSCAN_API_KEY>`
- `--from <FROM>` (the sender account)
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file)
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Estimate the gas cost of a transaction.

```bash
$ cast estimate --from 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 0xc18360217d8f7ab5e7c516566761ea12ce7f9d72 "transfer(address,uint)(bool)" 0x15322B546e31F5Bfe144C4ae133A9Db6F0059fe3 1000000000000000000 --rpc-url <your_rpc_url>
90677
```
<br>

> gas-price --rpc-url \<RPC_URL\>

Print current gas price of target chain.

```bash
$ cast gas-price --rpc-url <your_rpc_url>
89367836498
```
<br>

> keccak \<DATA\>

Keccak-256-hash arbitrary data.

```bash
$ cast keccak gm
0x71b78290913af2addd8fcbe5766de306af2c8afbc466ca891e207f73638c7270
```
<br>

> lookup-address \[OPTIONS\] --rpc-url \<RPC_URL\> \<WHO\>

Where `[OPTIONS]` is `--verify` (do a forward resolution to ensure the address is correct)

Get the ENS name an address resolves to.

```bash
$ cast lookup-address --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
vitalik.eth
```
<br>

> namehash \<NAME\>

Print ENS namehash of a ENS name.

```bash
$ cast namehash "vitalik.eth"
0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835
```
<br>

> nonce \[OPTIONS\] --rpc-url \<RPC_URL\> \<WHO\>

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Get the number of transactions sent from an address.

```bash
$ cast nonce --rpc-url <your_rpc_url> 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
750
```
<br>

> resolve-name \[OPTIONS\] --rpc-url \<RPC_URL\> \[WHO\]

Get the address an ENS name resolves to.

```bash
$ cast resolve-name --rpc-url <your_rpc_url> "vitalik.eth"
0xd8da6bf26964af9d7eed9e03e53415d37aa96045
```
<br>

> send \[OPTIONS\] \<ADDRESS\> \<SIG\> \[ARGS\] --rpc-url \<RPC_URL\>

Where `[OPTIONS]` are:
- `--chain <CHAIN>` (default: mainnet)
- `--etherscan-api-key <ETHERSCAN_API_KEY>`
- `--from <FROM>` (the sender account)
- `--flashbots` (to use a flashbots RPC URL: https://rpc.flashbots.net)
- `--hd-path <HD_PATH>` (derivation path for your hardware wallet, trezor or ledger)
- `--interactive` (interactive prompt to insert your private key)
- `--keystore <KEYSTORE_PATH>` (path to your keystore folder / file)
- `--ledger` (use your Ledger hardware wallet)
- `--mnemonic-path <MNEMONIC_PATH>` (path to your mnemonic file)
- `--mnemonic_index <MNEMONIC_INDEX>` (your index in the standard hd path, default: 0)
- `--password <KEYSTORE_PASSWORD>` (your keystore password)
- `--private-key <PRIVATE_KEY>` (your private key string)
- `--trezor` (use your Trezor hardware wallet)

Publish a transaction.

```bash
$ cast send --chain kovan --from <your_address> --interactive 0xd0A1E359811322d97991E03f863a0C30C2cF029C "withdraw(uint256)" 10000000000000000 --rpc-url <your_rpc_url>
Insert private key:

prints the transaction receipt...
```
<br>

> storage \[OPTIONS\] --rpc-url \<RPC_URL\> \<ADDRESS\> \<SLOT\>

Where `[OPTIONS]` is `--block <BLOCK>` (the block you want to query, can also be `earliest`,`latest`,`pending`)

Get the raw value of a contract's storage slot.

```bash
$ cast storage --rpc-url <your_rpc_url> 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
0x577261707065642045746865720000000000000000000000000000000000001a
```
<br>

> tx \[OPTIONS\] --rpc-url \<RPC_URL\> \<HASH\> \[FIELD\]

Where `[OPTIONS]` are `--json`

Print information about a transaction or only one of its fields.

```bash
$ cast tx --rpc-url <your_rpc_url> 0xf85ece86f9dec5bfa0357606a6afe0d696290cefe117194c8226ed4adfe228e7
accessList           []
blockHash            "0x185fc0bf17167beb2a82311ec3739d560cc9107bc109f0e8ab73daf86573d5b8"
blockNumber          "0xd6e090"
chainId              "0x...
...
```
<br>

> wallet \<SUBCOMMAND\>

Where `<SUBCOMMAND>` can be:
- `address` (convert a private key to an address)
- `new` (create and output a new random keypair)
- `sign` (sign the message with provided private key)
- `vanity` (generate a vanity address)
- `verify` (verify the signature on the message)

Set of wallet management utilities.

Convert a private key to an address.

```bash
cast wallet address --interactive
Insert private key: <PRIVATE_KEY>

Address: 0xBC084F73B100b50057a5175816a8ce8CfaF43b1C
```

Create a new public / private keypair.

```bash
$ cast wallet new
Successfully created new keypair.
Address: 0x19F4aB0c5ae1245F1E06798856815D82018AFE93
Private Key: <PRIVATE_KEY>
```

Sign a message.

```bash
$ cast wallet sign --interactive "gm"
Insert private key:

Signature: 0x22e3ad614cf53211b2ab164b4b46a39f878606f0c9e7b412c3ceb525f039fd1d50e72bdabaef42c295be0914d8c2b720001227d8c9f8d5e13103be65a0392acd1c
```

Create a new public / private keypair with a specific prefix.

```bash
$ cast wallet vanity --starts-with beef
Starting to generate vanity address...
Successfully created new keypair in 3 seconds.
Address: 0xBEEf111188257c2008271dBD193999FD1516d787
Private Key: <PRIVATE_KEY>
```

Verify the signature on a message.

```bash
$ cast wallet verify --address 0xBEEf111188257c2008271dBD193999FD1516d787 "gm" 0x22e3ad614cf53211b2ab164b4b46a39f878606f0c9e7b412c3ceb525f0
39fd1d50e72bdabaef42c295be0914d8c2b720001227d8c9f8d5e13103be65a0392acd1c
Validation success. Address 0xBEEf111188257c2008271dBD193999FD1516d787 signed this message.
```
<br><br>

> ℹ️ **Information**
>
> You can print help for any subcommand (or their subcommands) by adding `--help` at the end.
