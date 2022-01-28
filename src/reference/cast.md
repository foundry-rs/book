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
