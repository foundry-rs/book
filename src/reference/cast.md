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

convert integers into fixed point with specified decimals

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

> abi-encode \<SIG\> \<PARAMS\>

Endcode the arguments with the function signature using ABI, exculding the selector.

```bash
$ cast abi-encode "fulfillRandomness(bytes32,uint256)" 0x676d000000000000000000000000000000000000000000000000000000000000 999
0x676d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e7
```
<br>

> age --rpc-url <RPC_URL> [BLOCK]

Prints the timestamp of a block.

```bash
$ cast age --rpc-url <your_rpc_url> 1
Thu Jul 30 15:26:28 2015
```
<br>

> 🚧 Work in progress
>
> This chapter is under active development and is not completed yet!