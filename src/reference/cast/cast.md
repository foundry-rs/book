## cast

### NAME

cast - Perform Ethereum RPC calls from the comfort of your command line.

### SYNOPSIS

`cast` [*options*] *command* [*args*]
`cast` [*options*] `--version`
`cast` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to interact with Ethereum and perform conversions.

### COMMANDS

#### General Commands

[cast help](./cast-help.md)
&nbsp;&nbsp;&nbsp;&nbsp;Display help information about Cast.

[cast completions](./cast-completions.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate shell autocompletions for Cast.

#### Chain Commands

[cast chain-id](./cast-chain-id.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the Ethereum chain ID.

[cast chain](./cast-chain.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the symbolic name of the current chain.

[cast client](./cast-client.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the current client version.

#### Transaction Commands

[cast publish](./cast-publish.md)
&nbsp;&nbsp;&nbsp;&nbsp;Publish a raw transaction to the network.

[cast receipt](./cast-receipt.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the transaction receipt for a transaction.

[cast send](./cast-send.md)
&nbsp;&nbsp;&nbsp;&nbsp;Sign and publish a transaction.

[cast call](./cast-call.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a call on an account without publishing a transaction.

[cast rpc](./cast-rpc.md)
&nbsp;&nbsp;&nbsp;&nbsp; Perform a raw JSON-RPC request [aliases: rp]

[cast tx](./cast-tx.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get information about a transaction.

[cast run](./cast-run.md)
&nbsp;&nbsp;&nbsp;&nbsp;Runs a published transaction in a local environment and prints the trace.

[cast estimate](./cast-estimate.md)
&nbsp;&nbsp;&nbsp;&nbsp;Estimate the gas cost of a transaction.

[cast access-list](./cast-access-list.md)
&nbsp;&nbsp;&nbsp;&nbsp;Create an access list for a transaction.

#### Block Commands

[cast find-block](./cast-find-block.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the block number closest to the provided timestamp.

[cast gas-price](./cast-gas-price.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the current gas price.

[cast block-number](./cast-block-number.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the latest block number.

[cast basefee](./cast-basefee.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the basefee of a block.

[cast block](./cast-block.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get information about a block.

[cast age](./cast-age.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the timestamp of a block.

#### Account Commands

[cast balance](./cast-balance.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the balance of an account in wei.

[cast storage](./cast-storage.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the raw value of a contract's storage slot.

[cast proof](./cast-proof.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a storage proof for a given storage slot.

[cast nonce](./cast-nonce.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the nonce for an account.

[cast code](./cast-code.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the bytecode of a contract.

#### ENS Commands

[cast lookup-address](./cast-lookup-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform an ENS reverse lookup.

[cast resolve-name](./cast-resolve-name.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform an ENS lookup.

[cast namehash](./cast-namehash.md)
&nbsp;&nbsp;&nbsp;&nbsp;Calculate the ENS namehash of a name.

#### Etherscan Commands

[cast etherscan-source](./cast-etherscan-source.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the source code of a contract from Etherscan.

#### ABI Commands

[cast abi-encode](./cast-abi-encode.md)
&nbsp;&nbsp;&nbsp;&nbsp;ABI encode the given function arguments, excluding the selector.

[cast 4byte](./cast-4byte.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the function signatures for the given selector from <https://sig.eth.samczsun.com>.

[cast 4byte-decode](./cast-4byte-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

[cast 4byte-event](./cast-4byte-event.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

[cast calldata](./cast-calldata.md)
&nbsp;&nbsp;&nbsp;&nbsp;ABI-encode a function with arguments.

[cast pretty-calldata](./cast-pretty-calldata.md)
&nbsp;&nbsp;&nbsp;&nbsp;Pretty print calldata.

[cast --abi-decode](./cast--abi-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded input or output data.

[cast --calldata-decode](./cast--calldata-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded input data.

[cast upload-signature](./cast-upload-signature.md)
&nbsp;&nbsp;&nbsp;&nbsp;Upload the given signatures to https://sig.eth.samczsun.com.

#### Conversion Commands

[cast --format-bytes32-string](./cast--format-bytes32-string.md)
&nbsp;&nbsp;&nbsp;&nbsp;Formats a string into bytes32 encoding.

[cast --from-bin](./cast--from-bin.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert binary data into hex data.

[cast --from-fix](./cast--from-fix.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a fixed point number into an integer.

[cast --from-utf8](./cast--from-utf8.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert UTF8 to hex.

[cast --parse-bytes32-string](./cast--parse-bytes32-string.md)
&nbsp;&nbsp;&nbsp;&nbsp;Parses a string from bytes32 encoding.

[cast --to-ascii](./cast--to-ascii.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert hex data to an ASCII string.

[cast --to-base](./cast--to-base.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number of one base to another.

[cast --to-bytes32](./cast--to-bytes32.md)
&nbsp;&nbsp;&nbsp;&nbsp;Right-pads hex data to 32 bytes.

[cast --to-fix](./cast--to-fix.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an integer into a fixed point number.

[cast --to-hexdata](./cast--to-hexdata.md)
&nbsp;&nbsp;&nbsp;&nbsp;Normalize the input to lowercase, 0x-prefixed hex.

[cast --to-int256](./cast--to-int256.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number to a hex-encoded int256.

[cast --to-uint256](./cast--to-uint256.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number to a hex-encoded uint256.

[cast --to-unit](./cast--to-unit.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an ETH amount into another unit (ether, gwei, wei).

[cast --to-wei](./cast--to-wei.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an ETH amount to wei.

[cast shl](./cast-shl.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a left shifting operation.

[cast shr](./cast-shr.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a right shifting operation.

#### Utility Commands

[cast sig](./cast-sig.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the selector for a function.

[cast sig-event](./cast-sig-event.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate event signatures from event string.

[cast keccak](./cast-keccak.md)
&nbsp;&nbsp;&nbsp;&nbsp;Hash arbitrary data using keccak-256.

[cast compute-address](./cast-compute-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Compute the contract address from a given nonce and deployer address.

[cast create2](./cast-create2.md)
&nbsp;&nbsp;&nbsp;&nbsp; Generate a deterministic contract address using CREATE2

[cast interface](./cast-interface.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a Solidity interface from a given ABI.

[cast index](./cast-index.md)
&nbsp;&nbsp;&nbsp;&nbsp;Compute the storage slot for an entry in a mapping.

[cast --concat-hex](./cast--concat-hex.md)
&nbsp;&nbsp;&nbsp;&nbsp;Concatenate hex strings.

[cast --max-int](./cast--max-int.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the maximum i256 value.

[cast --min-int](./cast--min-int.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the minimum i256 value.

[cast --max-uint](./cast--max-uint.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the maximum u256 value.

[cast --to-checksum-address](./cast--to-checksum-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an address to a checksummed format (EIP-55).

#### Wallet Commands

[cast wallet](./cast-wallet.md)
&nbsp;&nbsp;&nbsp;&nbsp;Wallet management utilities.

[cast wallet new](./cast-wallet-new.md)
&nbsp;&nbsp;&nbsp;&nbsp;Create a new random keypair.

[cast wallet address](./cast-wallet-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a private key to an address.

[cast wallet sign](./cast-wallet-sign.md)
&nbsp;&nbsp;&nbsp;&nbsp;Sign a message.

[cast wallet vanity](./cast-wallet-vanity.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity address.

[cast wallet verify](./cast-wallet-verify.md)
&nbsp;&nbsp;&nbsp;&nbsp;Verify the signature of a message.

### OPTIONS

#### Special Options

`-V`
`--version`
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}

### EXAMPLES

1. Call a function on a contract:

    ```sh
    cast call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      "balanceOf(address)(uint256)" 0x...
    ```

2. Decode raw calldata:

    ```sh
    cast --calldata-decode "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

3. Encode calldata:
    ```sh
    cast calldata "someFunc(address,uint256)" 0x... 1
    ```

### BUGS

See <https://github.com/foundry-rs/foundry/issues> for issues.
