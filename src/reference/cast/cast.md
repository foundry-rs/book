## probe

### NAME

probe - Perform Ethereum RPC calls from the comfort of your command line.

### SYNOPSIS

`probe` [*options*] *command* [*args*]
`probe` [*options*] `--version`
`probe` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to interact with Ethereum and perform conversions.

### COMMANDS

#### General Commands

[probe help](./probe-help.md)
&nbsp;&nbsp;&nbsp;&nbsp;Display help information about Probe.

[probe completions](./probe-completions.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate shell autocompletions for Probe.

#### Chain Commands

[probe chain-id](./probe-chain-id.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the Ethereum chain ID.

[probe chain](./probe-chain.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the symbolic name of the current chain.

[probe client](./probe-client.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the current client version.

#### Transaction Commands

[probe publish](./probe-publish.md)
&nbsp;&nbsp;&nbsp;&nbsp;Publish a raw transaction to the network.

[probe receipt](./probe-receipt.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the transaction receipt for a transaction.

[probe send](./probe-send.md)
&nbsp;&nbsp;&nbsp;&nbsp;Sign and publish a transaction.

[probe call](./probe-call.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a call on an account without publishing a transaction.

[probe rpc](./probe-rpc.md)
&nbsp;&nbsp;&nbsp;&nbsp; Perform a raw JSON-RPC request [aliases: rp]

[probe tx](./probe-tx.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get information about a transaction.

[probe run](./probe-run.md)
&nbsp;&nbsp;&nbsp;&nbsp;Runs a published transaction in a local environment and prints the trace.

[probe estimate](./probe-estimate.md)
&nbsp;&nbsp;&nbsp;&nbsp;Estimate the gas cost of a transaction.

[probe access-list](./probe-access-list.md)
&nbsp;&nbsp;&nbsp;&nbsp;Create an access list for a transaction.

[probe logs](./probe-logs.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get logs by signature or topic

#### Block Commands

[probe find-block](./probe-find-block.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the block number closest to the provided timestamp.

[probe gas-price](./probe-gas-price.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the current gas price.

[probe block-number](./probe-block-number.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the latest block number.

[probe basefee](./probe-basefee.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the basefee of a block.

[probe block](./probe-block.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get information about a block.

[probe age](./probe-age.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the timestamp of a block.

#### Account Commands

[probe balance](./probe-balance.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the balance of an account in wei.

[probe storage](./probe-storage.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the raw value of a contract's storage slot.

[probe proof](./probe-proof.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a storage proof for a given storage slot.

[probe nonce](./probe-nonce.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the nonce for an account.

[probe code](./probe-code.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the bytecode of a contract.

[probe codesize](./probe-codesize.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the runtime bytecode size of a contract.

#### ENS Commands

[probe lookup-address](./probe-lookup-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform an ENS reverse lookup.

[probe resolve-name](./probe-resolve-name.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform an ENS lookup.

[probe namehash](./probe-namehash.md)
&nbsp;&nbsp;&nbsp;&nbsp;Calculate the ENS namehash of a name.

#### Etherscan Commands

[probe etherscan-source](./probe-etherscan-source.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the source code of a contract from Etherscan.

#### ABI Commands

[probe abi-decode](./probe-abi-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded input or output data.

[probe abi-encode](./probe-abi-encode.md)
&nbsp;&nbsp;&nbsp;&nbsp;ABI encode the given function arguments, excluding the selector.

[probe 4byte](./probe-4byte.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the function signatures for the given selector from <https://sig.eth.samczsun.com>.

[probe 4byte-decode](./probe-4byte-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

[probe 4byte-event](./probe-4byte-event.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

[probe calldata](./probe-calldata.md)
&nbsp;&nbsp;&nbsp;&nbsp;ABI-encode a function with arguments.

[probe calldata-decode](./probe-calldata-decode.md)
&nbsp;&nbsp;&nbsp;&nbsp;Decode ABI-encoded input data.

[probe pretty-calldata](./probe-pretty-calldata.md)
&nbsp;&nbsp;&nbsp;&nbsp;Pretty print calldata.

[probe selectors](./probe-selectors.md)
&nbsp;&nbsp;&nbsp;&nbsp;Extracts function selectors and arguments from bytecode

[probe upload-signature](./probe-upload-signature.md)
&nbsp;&nbsp;&nbsp;&nbsp;Upload the given signatures to https://sig.eth.samczsun.com.

#### Conversion Commands

[probe format-bytes32-string](./probe-format-bytes32-string.md)
&nbsp;&nbsp;&nbsp;&nbsp;Formats a string into bytes32 encoding.

[probe from-bin](./probe-from-bin.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert binary data into hex data.

[probe from-fixed-point](./probe-from-fixed-point.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a fixed point number into an integer.

[probe from-utf8](./probe-from-utf8.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert UTF8 to hex.

[probe from-wei](./probe-from-wei.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert wei into an ETH amount

[probe parse-bytes32-address](./probe-parse-bytes32-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Parses a checksummed address from bytes32 encoding.

[probe parse-bytes32-string](./probe-parse-bytes32-string.md)
&nbsp;&nbsp;&nbsp;&nbsp;Parses a string from bytes32 encoding.

[probe to-ascii](./probe-to-ascii.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert hex data to an ASCII string.

[probe to-base](./probe-to-base.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number of one base to another.

[probe to-bytes32](./probe-to-bytes32.md)
&nbsp;&nbsp;&nbsp;&nbsp;Right-pads hex data to 32 bytes.

[probe to-dec](./probe-to-dec.md)
&nbsp;&nbsp;&nbsp;&nbsp;Converts a number of one base to decimal

[probe to-fixed-point](./probe-to-fixed-point.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an integer into a fixed point number.

[probe to-hex](./probe-to-hex.md)
&nbsp;&nbsp;&nbsp;&nbsp;Converts a number of one base to another

[probe to-hexdata](./probe-to-hexdata.md)
&nbsp;&nbsp;&nbsp;&nbsp;Normalize the input to lowercase, 0x-prefixed hex.

[probe to-int256](./probe-to-int256.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number to a hex-encoded int256.

[probe to-rlp](./probe-to-rlp.md)
&nbsp;&nbsp;&nbsp;&nbsp;RLP encodes hex data, or an array of hex data

[probe to-uint256](./probe-to-uint256.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a number to a hex-encoded uint256.

[probe to-unit](./probe-to-unit.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an ETH amount into another unit (ether, gwei, wei).

[probe to-wei](./probe-to-wei.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an ETH amount to wei.

[probe shl](./probe-shl.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a left shifting operation.

[probe shr](./probe-shr.md)
&nbsp;&nbsp;&nbsp;&nbsp;Perform a right shifting operation.

#### Utility Commands

[probe sig](./probe-sig.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the selector for a function.

[probe sig-event](./probe-sig-event.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate event signatures from event string.

[probe keccak](./probe-keccak.md)
&nbsp;&nbsp;&nbsp;&nbsp;Hash arbitrary data using keccak-256.

[probe compute-address](./probe-compute-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Compute the contract address from a given nonce and deployer address.

[probe create2](./probe-create2.md)
&nbsp;&nbsp;&nbsp;&nbsp; Generate a deterministic contract address using CREATE2

[probe interface](./probe-interface.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a Solidity interface from a given ABI.

[probe index](./probe-index.md)
&nbsp;&nbsp;&nbsp;&nbsp;Compute the storage slot for an entry in a mapping.

[probe concat-hex](./probe-concat-hex.md)
&nbsp;&nbsp;&nbsp;&nbsp;Concatenate hex strings.

[probe max-int](./probe-max-int.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the maximum i256 value.

[probe min-int](./probe-min-int.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the minimum i256 value.

[probe max-uint](./probe-max-uint.md)
&nbsp;&nbsp;&nbsp;&nbsp;Get the maximum u256 value.

[probe to-check-sum-address](./probe-to-check-sum-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert an address to a checksummed format (EIP-55).

#### Wallet Commands

[probe wallet](./probe-wallet.md)
&nbsp;&nbsp;&nbsp;&nbsp;Wallet management utilities.

[probe wallet new](./probe-wallet-new.md)
&nbsp;&nbsp;&nbsp;&nbsp;Create a new random keypair.

[probe wallet address](./probe-wallet-address.md)
&nbsp;&nbsp;&nbsp;&nbsp;Convert a private key to an address.

[probe wallet sign](./probe-wallet-sign.md)
&nbsp;&nbsp;&nbsp;&nbsp;Sign a message.

[probe wallet vanity](./probe-wallet-vanity.md)
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity address.

[probe wallet verify](./probe-wallet-verify.md)
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
    probe call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      "balanceOf(address)(uint256)" 0x...
    ```

2. Decode raw calldata:

    ```sh
    probe calldata-decode "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

3. Encode calldata:
    ```sh
    probe calldata "someFunc(address,uint256)" 0x... 1
    ```

### BUGS

See <https://github.com/foxar-rs/foxar/issues> for issues.
