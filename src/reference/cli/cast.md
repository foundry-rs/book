# Command-Line Help for `cast`

This document contains the help content for the `cast` command-line program.

**Command Overview:**

* [`cast`↴](#cast)
* [`cast max-int`↴](#cast-max-int)
* [`cast min-int`↴](#cast-min-int)
* [`cast max-uint`↴](#cast-max-uint)
* [`cast address-zero`↴](#cast-address-zero)
* [`cast hash-zero`↴](#cast-hash-zero)
* [`cast from-utf8`↴](#cast-from-utf8)
* [`cast concat-hex`↴](#cast-concat-hex)
* [`cast from-bin`↴](#cast-from-bin)
* [`cast to-hexdata`↴](#cast-to-hexdata)
* [`cast to-check-sum-address`↴](#cast-to-check-sum-address)
* [`cast to-ascii`↴](#cast-to-ascii)
* [`cast to-utf8`↴](#cast-to-utf8)
* [`cast from-fixed-point`↴](#cast-from-fixed-point)
* [`cast to-bytes32`↴](#cast-to-bytes32)
* [`cast to-fixed-point`↴](#cast-to-fixed-point)
* [`cast to-uint256`↴](#cast-to-uint256)
* [`cast to-int256`↴](#cast-to-int256)
* [`cast shl`↴](#cast-shl)
* [`cast shr`↴](#cast-shr)
* [`cast to-unit`↴](#cast-to-unit)
* [`cast parse-units`↴](#cast-parse-units)
* [`cast format-units`↴](#cast-format-units)
* [`cast to-wei`↴](#cast-to-wei)
* [`cast from-wei`↴](#cast-from-wei)
* [`cast to-rlp`↴](#cast-to-rlp)
* [`cast from-rlp`↴](#cast-from-rlp)
* [`cast to-hex`↴](#cast-to-hex)
* [`cast to-dec`↴](#cast-to-dec)
* [`cast to-base`↴](#cast-to-base)
* [`cast access-list`↴](#cast-access-list)
* [`cast logs`↴](#cast-logs)
* [`cast block`↴](#cast-block)
* [`cast block-number`↴](#cast-block-number)
* [`cast call`↴](#cast-call)
* [`cast call --create`↴](#cast-call---create)
* [`cast calldata`↴](#cast-calldata)
* [`cast chain`↴](#cast-chain)
* [`cast chain-id`↴](#cast-chain-id)
* [`cast client`↴](#cast-client)
* [`cast compute-address`↴](#cast-compute-address)
* [`cast disassemble`↴](#cast-disassemble)
* [`cast mktx`↴](#cast-mktx)
* [`cast mktx --create`↴](#cast-mktx---create)
* [`cast namehash`↴](#cast-namehash)
* [`cast tx`↴](#cast-tx)
* [`cast receipt`↴](#cast-receipt)
* [`cast send`↴](#cast-send)
* [`cast send --create`↴](#cast-send---create)
* [`cast publish`↴](#cast-publish)
* [`cast estimate`↴](#cast-estimate)
* [`cast estimate --create`↴](#cast-estimate---create)
* [`cast decode-calldata`↴](#cast-decode-calldata)
* [`cast decode-string`↴](#cast-decode-string)
* [`cast decode-event`↴](#cast-decode-event)
* [`cast decode-error`↴](#cast-decode-error)
* [`cast decode-abi`↴](#cast-decode-abi)
* [`cast abi-encode`↴](#cast-abi-encode)
* [`cast index`↴](#cast-index)
* [`cast index-erc7201`↴](#cast-index-erc7201)
* [`cast implementation`↴](#cast-implementation)
* [`cast admin`↴](#cast-admin)
* [`cast 4byte`↴](#cast-4byte)
* [`cast 4byte-calldata`↴](#cast-4byte-calldata)
* [`cast 4byte-event`↴](#cast-4byte-event)
* [`cast upload-signature`↴](#cast-upload-signature)
* [`cast pretty-calldata`↴](#cast-pretty-calldata)
* [`cast age`↴](#cast-age)
* [`cast balance`↴](#cast-balance)
* [`cast base-fee`↴](#cast-base-fee)
* [`cast code`↴](#cast-code)
* [`cast codesize`↴](#cast-codesize)
* [`cast gas-price`↴](#cast-gas-price)
* [`cast sig-event`↴](#cast-sig-event)
* [`cast keccak`↴](#cast-keccak)
* [`cast hash-message`↴](#cast-hash-message)
* [`cast resolve-name`↴](#cast-resolve-name)
* [`cast lookup-address`↴](#cast-lookup-address)
* [`cast storage`↴](#cast-storage)
* [`cast proof`↴](#cast-proof)
* [`cast nonce`↴](#cast-nonce)
* [`cast codehash`↴](#cast-codehash)
* [`cast storage-root`↴](#cast-storage-root)
* [`cast source`↴](#cast-source)
* [`cast wallet`↴](#cast-wallet)
* [`cast wallet new`↴](#cast-wallet-new)
* [`cast wallet new-mnemonic`↴](#cast-wallet-new-mnemonic)
* [`cast wallet vanity`↴](#cast-wallet-vanity)
* [`cast wallet address`↴](#cast-wallet-address)
* [`cast wallet sign`↴](#cast-wallet-sign)
* [`cast wallet sign-auth`↴](#cast-wallet-sign-auth)
* [`cast wallet verify`↴](#cast-wallet-verify)
* [`cast wallet import`↴](#cast-wallet-import)
* [`cast wallet list`↴](#cast-wallet-list)
* [`cast wallet remove`↴](#cast-wallet-remove)
* [`cast wallet private-key`↴](#cast-wallet-private-key)
* [`cast wallet public-key`↴](#cast-wallet-public-key)
* [`cast wallet decrypt-keystore`↴](#cast-wallet-decrypt-keystore)
* [`cast wallet change-password`↴](#cast-wallet-change-password)
* [`cast creation-code`↴](#cast-creation-code)
* [`cast artifact`↴](#cast-artifact)
* [`cast constructor-args`↴](#cast-constructor-args)
* [`cast interface`↴](#cast-interface)
* [`cast bind`↴](#cast-bind)
* [`cast sig`↴](#cast-sig)
* [`cast create2`↴](#cast-create2)
* [`cast find-block`↴](#cast-find-block)
* [`cast completions`↴](#cast-completions)
* [`cast generate-fig-spec`↴](#cast-generate-fig-spec)
* [`cast run`↴](#cast-run)
* [`cast rpc`↴](#cast-rpc)
* [`cast format-bytes32-string`↴](#cast-format-bytes32-string)
* [`cast parse-bytes32-string`↴](#cast-parse-bytes32-string)
* [`cast parse-bytes32-address`↴](#cast-parse-bytes32-address)
* [`cast decode-transaction`↴](#cast-decode-transaction)
* [`cast selectors`↴](#cast-selectors)
* [`cast decode-eof`↴](#cast-decode-eof)
* [`cast tx-pool`↴](#cast-tx-pool)
* [`cast tx-pool content`↴](#cast-tx-pool-content)
* [`cast tx-pool content-from`↴](#cast-tx-pool-content-from)
* [`cast tx-pool inspect`↴](#cast-tx-pool-inspect)
* [`cast tx-pool status`↴](#cast-tx-pool-status)

## `cast`

A Swiss Army knife for interacting with Ethereum applications from the command line

**Usage:** `cast [OPTIONS] <COMMAND>`

Find more information in the book: http://book.getfoundry.sh/reference/cast/cast.html

###### **Subcommands:**

* `max-int` — Prints the maximum value of the given integer type
* `min-int` — Prints the minimum value of the given integer type
* `max-uint` — Prints the maximum value of the given integer type
* `address-zero` — Prints the zero address
* `hash-zero` — Prints the zero hash
* `from-utf8` — Convert UTF8 text to hex
* `concat-hex` — Concatenate hex strings
* `from-bin` — Convert binary data into hex data
* `to-hexdata` — Normalize the input to lowercase, 0x-prefixed hex
* `to-check-sum-address` — Convert an address to a checksummed format (EIP-55)
* `to-ascii` — Convert hex data to an ASCII string
* `to-utf8` — Convert hex data to a utf-8 string
* `from-fixed-point` — Convert a fixed point number into an integer
* `to-bytes32` — Right-pads hex data to 32 bytes
* `to-fixed-point` — Convert an integer into a fixed point number
* `to-uint256` — Convert a number to a hex-encoded uint256
* `to-int256` — Convert a number to a hex-encoded int256
* `shl` — Perform a left shifting operation
* `shr` — Perform a right shifting operation
* `to-unit` — Convert an ETH amount into another unit (ether, gwei or wei)
* `parse-units` — Convert a number from decimal to smallest unit with arbitrary decimals
* `format-units` — Format a number from smallest unit to decimal with arbitrary decimals
* `to-wei` — Convert an ETH amount to wei
* `from-wei` — Convert wei into an ETH amount
* `to-rlp` — RLP encodes hex data, or an array of hex data
* `from-rlp` — Decodes RLP hex-encoded data
* `to-hex` — Converts a number of one base to another
* `to-dec` — Converts a number of one base to decimal
* `to-base` — Converts a number of one base to another
* `access-list` — Create an access list for a transaction
* `logs` — Get logs by signature or topic
* `block` — Get information about a block
* `block-number` — Get the latest block number
* `call` — Perform a call on an account without publishing a transaction
* `calldata` — ABI-encode a function with arguments
* `chain` — Get the symbolic name of the current chain
* `chain-id` — Get the Ethereum chain ID
* `client` — Get the current client version
* `compute-address` — Compute the contract address from a given nonce and deployer address
* `disassemble` — Disassembles a hex-encoded bytecode into a human-readable representation
* `mktx` — Build and sign a transaction
* `namehash` — Calculate the ENS namehash of a name
* `tx` — Get information about a transaction
* `receipt` — Get the transaction receipt for a transaction
* `send` — Sign and publish a transaction
* `publish` — Publish a raw transaction to the network
* `estimate` — Estimate the gas cost of a transaction
* `decode-calldata` — Decode ABI-encoded input data
* `decode-string` — Decode ABI-encoded string
* `decode-event` — Decode event data
* `decode-error` — Decode custom error data
* `decode-abi` — Decode ABI-encoded input or output data
* `abi-encode` — ABI encode the given function argument, excluding the selector
* `index` — Compute the storage slot for an entry in a mapping
* `index-erc7201` — Compute storage slots as specified by `ERC-7201: Namespaced Storage Layout`
* `implementation` — Fetch the EIP-1967 implementation for a contract Can read from the implementation slot or the beacon slot
* `admin` — Fetch the EIP-1967 admin account
* `4byte` — Get the function signatures for the given selector from <https://openchain.xyz>
* `4byte-calldata` — Decode ABI-encoded calldata using <https://openchain.xyz>
* `4byte-event` — Get the event signature for a given topic 0 from <https://openchain.xyz>
* `upload-signature` — Upload the given signatures to <https://openchain.xyz>
* `pretty-calldata` — Pretty print calldata
* `age` — Get the timestamp of a block
* `balance` — Get the balance of an account in wei
* `base-fee` — Get the basefee of a block
* `code` — Get the runtime bytecode of a contract
* `codesize` — Get the runtime bytecode size of a contract
* `gas-price` — Get the current gas price
* `sig-event` — Generate event signatures from event string
* `keccak` — Hash arbitrary data using Keccak-256
* `hash-message` — Hash a message according to EIP-191
* `resolve-name` — Perform an ENS lookup
* `lookup-address` — Perform an ENS reverse lookup
* `storage` — Get the raw value of a contract's storage slot
* `proof` — Generate a storage proof for a given storage slot
* `nonce` — Get the nonce for an account
* `codehash` — Get the codehash for an account
* `storage-root` — Get the storage root for an account
* `source` — Get the source code of a contract from a block explorer
* `wallet` — Wallet management utilities
* `creation-code` — Download a contract creation code from Etherscan and RPC
* `artifact` — Generate an artifact file, that can be used to deploy a contract locally
* `constructor-args` — Display constructor arguments used for the contract initialization
* `interface` — Generate a Solidity interface from a given ABI
* `bind` — Generate a rust binding from a given ABI
* `sig` — Get the selector for a function
* `create2` — Generate a deterministic contract address using CREATE2
* `find-block` — Get the block number closest to the provided timestamp
* `completions` — Generate shell completions script
* `generate-fig-spec` — Generate Fig autocompletion spec
* `run` — Runs a published transaction in a local environment and prints the trace
* `rpc` — Perform a raw JSON-RPC request
* `format-bytes32-string` — Formats a string into bytes32 encoding
* `parse-bytes32-string` — Parses a string from bytes32 encoding
* `parse-bytes32-address` — Parses a checksummed address from bytes32 encoding.
* `decode-transaction` — Decodes a raw signed EIP 2718 typed transaction
* `selectors` — Extracts function selectors and arguments from bytecode
* `decode-eof` — Decodes EOF container bytes
* `tx-pool` — Inspect the TxPool of a node

###### **Options:**

* `-v`, `--verbosity` — Verbosity level of the log messages.

   Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).

   Depending on the context the verbosity levels have different meanings.

   For example, the verbosity levels of the EVM are:
   - 2 (-vv): Print logs for all tests.
   - 3 (-vvv): Print execution traces for failing tests.
   - 4 (-vvvv): Print execution traces for all tests, and setup traces for failing tests.
   - 5 (-vvvvv): Print execution and setup traces for all tests, including storage changes.
* `-q`, `--quiet` — Do not print log messages
* `--json` — Format log messages as JSON
* `--color <COLOR>` — The color of the log messages

  Possible values:
  - `auto`:
    Intelligently guess whether to use color output (default)
  - `always`:
    Force color output
  - `never`:
    Force disable color output

* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores



## `cast max-int`

Prints the maximum value of the given integer type

**Usage:** `cast max-int [TYPE]`

###### **Arguments:**

* `<TYPE>` — The integer type to get the maximum value of

  Default value: `int256`



## `cast min-int`

Prints the minimum value of the given integer type

**Usage:** `cast min-int [TYPE]`

###### **Arguments:**

* `<TYPE>` — The integer type to get the minimum value of

  Default value: `int256`



## `cast max-uint`

Prints the maximum value of the given integer type

**Usage:** `cast max-uint [TYPE]`

###### **Arguments:**

* `<TYPE>` — The unsigned integer type to get the maximum value of

  Default value: `uint256`



## `cast address-zero`

Prints the zero address

**Usage:** `cast address-zero`



## `cast hash-zero`

Prints the zero hash

**Usage:** `cast hash-zero`



## `cast from-utf8`

Convert UTF8 text to hex

**Usage:** `cast from-utf8 [TEXT]`

###### **Arguments:**

* `<TEXT>` — The text to convert



## `cast concat-hex`

Concatenate hex strings

**Usage:** `cast concat-hex [DATA]...`

###### **Arguments:**

* `<DATA>` — The data to concatenate



## `cast from-bin`

Convert binary data into hex data

**Usage:** `cast from-bin`



## `cast to-hexdata`

Normalize the input to lowercase, 0x-prefixed hex.

The input can be: - mixed case hex with or without 0x prefix - 0x prefixed hex, concatenated with a ':' - an absolute path to file - @tag, where the tag is defined in an environment variable

**Usage:** `cast to-hexdata [INPUT]`

###### **Arguments:**

* `<INPUT>` — The input to normalize



## `cast to-check-sum-address`

Convert an address to a checksummed format (EIP-55)

**Usage:** `cast to-check-sum-address [ADDRESS]`

###### **Arguments:**

* `<ADDRESS>` — The address to convert



## `cast to-ascii`

Convert hex data to an ASCII string

**Usage:** `cast to-ascii [HEXDATA]`

###### **Arguments:**

* `<HEXDATA>` — The hex data to convert



## `cast to-utf8`

Convert hex data to a utf-8 string

**Usage:** `cast to-utf8 [HEXDATA]`

###### **Arguments:**

* `<HEXDATA>` — The hex data to convert



## `cast from-fixed-point`

Convert a fixed point number into an integer

**Usage:** `cast from-fixed-point [DECIMALS] [VALUE]`

###### **Arguments:**

* `<DECIMALS>` — The number of decimals to use
* `<VALUE>` — The value to convert



## `cast to-bytes32`

Right-pads hex data to 32 bytes

**Usage:** `cast to-bytes32 [BYTES]`

###### **Arguments:**

* `<BYTES>` — The hex data to convert



## `cast to-fixed-point`

Convert an integer into a fixed point number

**Usage:** `cast to-fixed-point [DECIMALS] [VALUE]`

###### **Arguments:**

* `<DECIMALS>` — The number of decimals to use
* `<VALUE>` — The value to convert



## `cast to-uint256`

Convert a number to a hex-encoded uint256

**Usage:** `cast to-uint256 [VALUE]`

###### **Arguments:**

* `<VALUE>` — The value to convert



## `cast to-int256`

Convert a number to a hex-encoded int256

**Usage:** `cast to-int256 [VALUE]`

###### **Arguments:**

* `<VALUE>` — The value to convert



## `cast shl`

Perform a left shifting operation

**Usage:** `cast shl [OPTIONS] <VALUE> <BITS>`

###### **Arguments:**

* `<VALUE>` — The value to shift
* `<BITS>` — The number of bits to shift

###### **Options:**

* `--base-in <BASE_IN>` — The input base
* `--base-out <BASE_OUT>` — The output base

  Default value: `16`



## `cast shr`

Perform a right shifting operation

**Usage:** `cast shr [OPTIONS] <VALUE> <BITS>`

###### **Arguments:**

* `<VALUE>` — The value to shift
* `<BITS>` — The number of bits to shift

###### **Options:**

* `--base-in <BASE_IN>` — The input base,
* `--base-out <BASE_OUT>` — The output base,

  Default value: `16`



## `cast to-unit`

Convert an ETH amount into another unit (ether, gwei or wei).

Examples: - 1ether wei - "1 ether" wei - 1ether - 1 gwei - 1gwei ether

**Usage:** `cast to-unit [VALUE] [UNIT]`

###### **Arguments:**

* `<VALUE>` — The value to convert
* `<UNIT>` — The unit to convert to (ether, gwei, wei)

  Default value: `wei`



## `cast parse-units`

Convert a number from decimal to smallest unit with arbitrary decimals.

Examples: - 1.0 6    (for USDC, result: 1000000) - 2.5 12   (for 12 decimals token, result: 2500000000000) - 1.23 3   (for 3 decimals token, result: 1230)

**Usage:** `cast parse-units [VALUE] [UNIT]`

###### **Arguments:**

* `<VALUE>` — The value to convert
* `<UNIT>` — The unit to convert to

  Default value: `18`



## `cast format-units`

Format a number from smallest unit to decimal with arbitrary decimals.

Examples: - 1000000 6       (for USDC, result: 1.0) - 2500000000000 12 (for 12 decimals, result: 2.5) - 1230 3          (for 3 decimals, result: 1.23)

**Usage:** `cast format-units [VALUE] [UNIT]`

###### **Arguments:**

* `<VALUE>` — The value to format
* `<UNIT>` — The unit to format to

  Default value: `18`



## `cast to-wei`

Convert an ETH amount to wei.

Consider using --to-unit.

**Usage:** `cast to-wei [VALUE] [UNIT]`

###### **Arguments:**

* `<VALUE>` — The value to convert
* `<UNIT>` — The unit to convert from (ether, gwei, wei)

  Default value: `eth`



## `cast from-wei`

Convert wei into an ETH amount.

Consider using --to-unit.

**Usage:** `cast from-wei [VALUE] [UNIT]`

###### **Arguments:**

* `<VALUE>` — The value to convert
* `<UNIT>` — The unit to convert from (ether, gwei, wei)

  Default value: `eth`



## `cast to-rlp`

RLP encodes hex data, or an array of hex data.

Accepts a hex-encoded string, or an array of hex-encoded strings. Can be arbitrarily recursive.

Examples: - `cast to-rlp "[]"` -> `0xc0` - `cast to-rlp "0x22"` -> `0x22` - `cast to-rlp "[\"0x61\"]"` -> `0xc161` - `cast to-rlp "[\"0xf1\", \"f2\"]"` -> `0xc481f181f2`

**Usage:** `cast to-rlp [VALUE]`

###### **Arguments:**

* `<VALUE>` — The value to convert.

   This is a hex-encoded string, or an array of hex-encoded strings. Can be arbitrarily recursive.



## `cast from-rlp`

Decodes RLP hex-encoded data

**Usage:** `cast from-rlp [OPTIONS] [VALUE]`

###### **Arguments:**

* `<VALUE>` — The RLP hex-encoded data

###### **Options:**

* `--as-int` — Decode the RLP data as int



## `cast to-hex`

Converts a number of one base to another

**Usage:** `cast to-hex [OPTIONS] [VALUE]`

###### **Arguments:**

* `<VALUE>` — The value to convert

###### **Options:**

* `-i`, `--base-in <BASE_IN>` — The input base



## `cast to-dec`

Converts a number of one base to decimal

**Usage:** `cast to-dec [OPTIONS] [VALUE]`

###### **Arguments:**

* `<VALUE>` — The value to convert

###### **Options:**

* `-i`, `--base-in <BASE_IN>` — The input base



## `cast to-base`

Converts a number of one base to another

**Usage:** `cast to-base [OPTIONS] [VALUE] [BASE]`

###### **Arguments:**

* `<VALUE>` — The value to convert
* `<BASE>` — The output base

###### **Options:**

* `-i`, `--base-in <BASE_IN>` — The input base



## `cast access-list`

Create an access list for a transaction

**Usage:** `cast access-list [OPTIONS] [TO] [SIG] [ARGS]...`

###### **Arguments:**

* `<TO>` — The destination of the transaction
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast logs`

Get logs by signature or topic

**Usage:** `cast logs [OPTIONS] [SIG_OR_TOPIC] [TOPICS_OR_ARGS]...`

###### **Arguments:**

* `<SIG_OR_TOPIC>` — The signature of the event to filter logs by which will be converted to the first topic or a topic to filter on
* `<TOPICS_OR_ARGS>` — If used with a signature, the indexed fields of the event to filter by. Otherwise, the remaining topics of the filter

###### **Options:**

* `--from-block <FROM_BLOCK>` — The block height to start query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--to-block <TO_BLOCK>` — The block height to stop query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--address <ADDRESS>` — The contract address to filter on
* `--subscribe` — If the RPC type and endpoints supports `eth_subscribe` stream logs instead of printing and exiting. Will continue until interrupted or TO_BLOCK is reached
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast block`

Get information about a block

**Usage:** `cast block [OPTIONS] [BLOCK]`

###### **Arguments:**

* `<BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.

###### **Options:**

* `-f`, `--field <FIELD>` — If specified, only get the given field of the block
* `--full`
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast block-number`

Get the latest block number

**Usage:** `cast block-number [OPTIONS] [BLOCK]`

###### **Arguments:**

* `<BLOCK>` — The hash or tag to query. If not specified, the latest number is returned

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast call`

Perform a call on an account without publishing a transaction

**Usage:** `cast call [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]`

###### **Subcommands:**

* `--create` — ignores the address field and simulates creating a contract

###### **Arguments:**

* `<TO>` — The destination of the transaction
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call

###### **Options:**

* `--data <DATA>` — Raw hex-encoded data for the transaction. Used instead of \[SIG\] and \[ARGS\]
* `--trace` — Forks the remote rpc, executes the transaction locally and prints a trace

  Default value: `false`
* `--debug` — Opens an interactive debugger. Can only be used with `--trace`
* `--decode-internal`
* `--labels <LABELS>` — Labels to apply to the traces; format: `address:label`. Can only be used with `--trace`
* `--evm-version <EVM_VERSION>` — The EVM Version to use. Can only be used with `--trace`
* `-b`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--odyssey` — Enable Odyssey features
* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet
* `--with-local-artifacts` — Use current project artifacts for trace decoding



## `cast call --create`

ignores the address field and simulates creating a contract

**Usage:** `cast call --create [OPTIONS] <CODE> [SIG] [ARGS]...`

###### **Arguments:**

* `<CODE>` — Bytecode of contract
* `<SIG>` — The signature of the constructor
* `<ARGS>` — The arguments of the constructor

###### **Options:**

* `--value <VALUE>` — Ether to send in the transaction.

   Either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether



## `cast calldata`

ABI-encode a function with arguments

**Usage:** `cast calldata <SIG> [ARGS]...`

###### **Arguments:**

* `<SIG>` — The function signature in the format `<name>(<in-types>)(<out-types>)`
* `<ARGS>` — The arguments to encode



## `cast chain`

Get the symbolic name of the current chain

**Usage:** `cast chain [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast chain-id`

Get the Ethereum chain ID

**Usage:** `cast chain-id [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast client`

Get the current client version

**Usage:** `cast client [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast compute-address`

Compute the contract address from a given nonce and deployer address

**Usage:** `cast compute-address [OPTIONS] [ADDRESS]`

###### **Arguments:**

* `<ADDRESS>` — The deployer address

###### **Options:**

* `--nonce <NONCE>` — The nonce of the deployer address
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast disassemble`

Disassembles a hex-encoded bytecode into a human-readable representation

**Usage:** `cast disassemble [BYTECODE]`

###### **Arguments:**

* `<BYTECODE>` — The hex-encoded bytecode



## `cast mktx`

Build and sign a transaction

**Usage:** `cast mktx [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]`

###### **Subcommands:**

* `--create` — Use to deploy raw contract bytecode

###### **Arguments:**

* `<TO>` — The destination of the transaction.

   If not provided, you must use `cast mktx --create`.
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call

###### **Options:**

* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `--path <BLOB_DATA_PATH>` — The path of blob data to be sent
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet
* `--raw-unsigned` — Generate a raw RLP-encoded unsigned transaction.

   Relaxes the wallet requirement.



## `cast mktx --create`

Use to deploy raw contract bytecode

**Usage:** `cast mktx --create <CODE> [SIG] [ARGS]...`

###### **Arguments:**

* `<CODE>` — The initialization bytecode of the contract to deploy
* `<SIG>` — The signature of the constructor
* `<ARGS>` — The constructor arguments



## `cast namehash`

Calculate the ENS namehash of a name

**Usage:** `cast namehash [NAME]`

###### **Arguments:**

* `<NAME>`



## `cast tx`

Get information about a transaction

**Usage:** `cast tx [OPTIONS] <TX_HASH> [FIELD]`

###### **Arguments:**

* `<TX_HASH>` — The transaction hash
* `<FIELD>` — If specified, only get the given field of the transaction. If "raw", the RLP encoded transaction will be printed

###### **Options:**

* `--raw` — Print the raw RLP encoded transaction
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast receipt`

Get the transaction receipt for a transaction

**Usage:** `cast receipt [OPTIONS] <TX_HASH> [FIELD]`

###### **Arguments:**

* `<TX_HASH>` — The transaction hash
* `<FIELD>` — If specified, only get the given field of the transaction

###### **Options:**

* `--confirmations <CONFIRMATIONS>` — The number of confirmations until the receipt is fetched

  Default value: `1`
* `--async` — Exit immediately if the transaction was not found
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast send`

Sign and publish a transaction

**Usage:** `cast send [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]`

###### **Subcommands:**

* `--create` — Use to deploy raw contract bytecode

###### **Arguments:**

* `<TO>` — The destination of the transaction.

   If not provided, you must use cast send --create.
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call

###### **Options:**

* `--async` — Only print the transaction hash and exit immediately
* `--confirmations <CONFIRMATIONS>` — The number of confirmations until the receipt is fetched

  Default value: `1`
* `--unlocked` — Send via `eth_sendTransaction` using the `--from` argument or $ETH_FROM as sender
* `--timeout <TIMEOUT>` — Timeout for sending the transaction
* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet
* `--path <BLOB_DATA_PATH>` — The path of blob data to be sent



## `cast send --create`

Use to deploy raw contract bytecode

**Usage:** `cast send --create <CODE> [SIG] [ARGS]...`

###### **Arguments:**

* `<CODE>` — The bytecode of the contract to deploy
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call



## `cast publish`

Publish a raw transaction to the network

**Usage:** `cast publish [OPTIONS] <RAW_TX>`

###### **Arguments:**

* `<RAW_TX>` — The raw transaction

###### **Options:**

* `--async` — Only print the transaction hash and exit immediately
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast estimate`

Estimate the gas cost of a transaction

**Usage:** `cast estimate [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]`

###### **Subcommands:**

* `--create` — Estimate gas cost to deploy a smart contract

###### **Arguments:**

* `<TO>` — The destination of the transaction
* `<SIG>` — The signature of the function to call
* `<ARGS>` — The arguments of the function to call

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--gas-limit <GAS_LIMIT>` — Gas limit for the transaction
* `--gas-price <PRICE>` — Gas price for legacy transactions, or max fee per gas for EIP1559 transactions, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--priority-gas-price <PRICE>` — Max priority fee per gas for EIP1559 transactions
* `--value <VALUE>` — Ether to send in the transaction, either specified in wei, or as a string with a unit type.

   Examples: 1ether, 10gwei, 0.01ether
* `--nonce <NONCE>` — Nonce for the transaction
* `--legacy` — Send a legacy transaction instead of an EIP1559 transaction.

   This is automatically enabled for common networks without EIP1559.
* `--blob` — Send a EIP-4844 blob transaction
* `--blob-gas-price <BLOB_PRICE>` — Gas price for EIP-4844 blob transaction
* `--auth <AUTH>` — EIP-7702 authorization list.

   Can be either a hex-encoded signed authorization or an address.
* `--access-list <ACCESS_LIST>` — EIP-2930 access list.

   Accepts either a JSON-encoded access list or an empty value to create the access list via an RPC call to `eth_createAccessList`. To retrieve only the access list portion, use the `cast access-list` command.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast estimate --create`

Estimate gas cost to deploy a smart contract

**Usage:** `cast estimate --create [OPTIONS] <CODE> [SIG] [ARGS]...`

###### **Arguments:**

* `<CODE>` — The bytecode of contract
* `<SIG>` — The signature of the constructor
* `<ARGS>` — Constructor arguments

###### **Options:**

* `--value <VALUE>` — Ether to send in the transaction

   Either specified in wei, or as a string with a unit type:

   Examples: 1ether, 10gwei, 0.01ether



## `cast decode-calldata`

Decode ABI-encoded input data.

Similar to `abi-decode --input`, but function selector MUST be prefixed in `calldata` string

**Usage:** `cast decode-calldata <SIG> <CALLDATA>`

###### **Arguments:**

* `<SIG>` — The function signature in the format `<name>(<in-types>)(<out-types>)`
* `<CALLDATA>` — The ABI-encoded calldata



## `cast decode-string`

Decode ABI-encoded string.

Similar to `calldata-decode --input`, but the function argument is a `string`

**Usage:** `cast decode-string <DATA>`

###### **Arguments:**

* `<DATA>` — The ABI-encoded string



## `cast decode-event`

Decode event data

**Usage:** `cast decode-event [OPTIONS] <DATA>`

###### **Arguments:**

* `<DATA>` — The event data to decode

###### **Options:**

* `--sig <SIG>` — The event signature. If none provided then tries to decode from local cache or <https://api.openchain.xyz>



## `cast decode-error`

Decode custom error data

**Usage:** `cast decode-error [OPTIONS] <DATA>`

###### **Arguments:**

* `<DATA>` — The error data to decode

###### **Options:**

* `--sig <SIG>` — The error signature. If none provided then tries to decode from local cache or <https://api.openchain.xyz>



## `cast decode-abi`

Decode ABI-encoded input or output data.

Defaults to decoding output data. To decode input data pass --input.

When passing `--input`, function selector must NOT be prefixed in `calldata` string

**Usage:** `cast decode-abi [OPTIONS] <SIG> <CALLDATA>`

###### **Arguments:**

* `<SIG>` — The function signature in the format `<name>(<in-types>)(<out-types>)`
* `<CALLDATA>` — The ABI-encoded calldata

###### **Options:**

* `-i`, `--input` — Whether to decode the input or output data



## `cast abi-encode`

ABI encode the given function argument, excluding the selector

**Usage:** `cast abi-encode [OPTIONS] <SIG> [ARGS]...`

###### **Arguments:**

* `<SIG>` — The function signature
* `<ARGS>` — The arguments of the function

###### **Options:**

* `--packed` — Whether to use packed encoding



## `cast index`

Compute the storage slot for an entry in a mapping

**Usage:** `cast index <KEY_TYPE> <KEY> <SLOT_NUMBER>`

###### **Arguments:**

* `<KEY_TYPE>` — The mapping key type
* `<KEY>` — The mapping key
* `<SLOT_NUMBER>` — The storage slot of the mapping



## `cast index-erc7201`

Compute storage slots as specified by `ERC-7201: Namespaced Storage Layout`

**Usage:** `cast index-erc7201 [OPTIONS] [ID]`

###### **Arguments:**

* `<ID>` — The arbitrary identifier

###### **Options:**

* `--formula-id <FORMULA_ID>` — The formula ID. Currently the only supported formula is `erc7201`

  Default value: `erc7201`



## `cast implementation`

Fetch the EIP-1967 implementation for a contract Can read from the implementation slot or the beacon slot

**Usage:** `cast implementation [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The address for which the implementation will be fetched

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `--beacon` — Fetch the implementation from the beacon slot.

   If not specified, the implementation slot is used.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast admin`

Fetch the EIP-1967 admin account

**Usage:** `cast admin [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The address from which the admin account will be fetched

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast 4byte`

Get the function signatures for the given selector from <https://openchain.xyz>

**Usage:** `cast 4byte [SELECTOR]`

###### **Arguments:**

* `<SELECTOR>` — The function selector



## `cast 4byte-calldata`

Decode ABI-encoded calldata using <https://openchain.xyz>

**Usage:** `cast 4byte-calldata [CALLDATA]`

###### **Arguments:**

* `<CALLDATA>` — The ABI-encoded calldata



## `cast 4byte-event`

Get the event signature for a given topic 0 from <https://openchain.xyz>

**Usage:** `cast 4byte-event [TOPIC_0]`

###### **Arguments:**

* `<TOPIC_0>` — Topic 0



## `cast upload-signature`

Upload the given signatures to <https://openchain.xyz>.

Example inputs: - "transfer(address,uint256)" - "function transfer(address,uint256)" - "function transfer(address,uint256)" "event Transfer(address,address,uint256)" - "./out/Contract.sol/Contract.json"

**Usage:** `cast upload-signature [SIGNATURES]...`

###### **Arguments:**

* `<SIGNATURES>` — The signatures to upload.

   Prefix with 'function', 'event', or 'error'. Defaults to function if no prefix given. Can also take paths to contract artifact JSON.



## `cast pretty-calldata`

Pretty print calldata.

Tries to decode the calldata using <https://openchain.xyz> unless --offline is passed.

**Usage:** `cast pretty-calldata [OPTIONS] [CALLDATA]`

###### **Arguments:**

* `<CALLDATA>` — The calldata

###### **Options:**

* `-o`, `--offline` — Skip the <https://openchain.xyz> lookup



## `cast age`

Get the timestamp of a block

**Usage:** `cast age [OPTIONS] [BLOCK]`

###### **Arguments:**

* `<BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast balance`

Get the balance of an account in wei

**Usage:** `cast balance [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The account to query

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-e`, `--ether` — Format the balance in ether
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `--erc20 <ERC20>` — erc20 address to query, with the method `balanceOf(address) return (uint256)`, alias with '--erc721'



## `cast base-fee`

Get the basefee of a block

**Usage:** `cast base-fee [OPTIONS] [BLOCK]`

###### **Arguments:**

* `<BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast code`

Get the runtime bytecode of a contract

**Usage:** `cast code [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The contract address

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-d`, `--disassemble` — Disassemble bytecodes
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast codesize`

Get the runtime bytecode size of a contract

**Usage:** `cast codesize [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The contract address

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast gas-price`

Get the current gas price

**Usage:** `cast gas-price [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast sig-event`

Generate event signatures from event string

**Usage:** `cast sig-event [EVENT_STRING]`

###### **Arguments:**

* `<EVENT_STRING>` — The event string



## `cast keccak`

Hash arbitrary data using Keccak-256

**Usage:** `cast keccak [DATA]`

###### **Arguments:**

* `<DATA>` — The data to hash



## `cast hash-message`

Hash a message according to EIP-191

**Usage:** `cast hash-message [MESSAGE]`

###### **Arguments:**

* `<MESSAGE>` — The message to hash



## `cast resolve-name`

Perform an ENS lookup

**Usage:** `cast resolve-name [OPTIONS] [WHO]`

###### **Arguments:**

* `<WHO>` — The name to lookup

###### **Options:**

* `--verify` — Perform a reverse lookup to verify that the name is correct
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast lookup-address`

Perform an ENS reverse lookup

**Usage:** `cast lookup-address [OPTIONS] [WHO]`

###### **Arguments:**

* `<WHO>` — The account to perform the lookup for

###### **Options:**

* `--verify` — Perform a normal lookup to verify that the address is correct
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast storage`

Get the raw value of a contract's storage slot

**Usage:** `cast storage [OPTIONS] <ADDRESS> [SLOT]`

###### **Arguments:**

* `<ADDRESS>` — The contract address
* `<SLOT>` — The storage slot number. If not provided, it gets the full storage layout

###### **Options:**

* `--proxy <PROXY>` — The known proxy address. If provided, the storage layout is retrieved from this address
* `-b`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--force` — Clear the cache and artifacts folder and recompile
* `--no-cache` — Disable the cache
* `--dynamic-test-linking` — Enable dynamic test linking
* `--libraries <LIBRARIES>` — Set pre-linked libraries
* `--ignored-error-codes <ERROR_CODES>` — Ignore solc warnings by error code
* `--deny-warnings` — Warnings will trigger a compiler error
* `--no-auto-detect` — Do not auto-detect the `solc` version
* `--use <SOLC_VERSION>` — Specify the solc version, or a path to a local solc, to build with.

   Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.
* `--offline` — Do not access the network.

   Missing solc versions will not be installed.
* `--via-ir` — Use the Yul intermediate representation compilation pipeline
* `--use-literal-content` — Changes compilation to only use literal content and not URLs
* `--no-metadata` — Do not append any metadata to the bytecode.

   This is equivalent to setting `bytecode_hash` to `none` and `cbor_metadata` to `false`.
* `-o`, `--out <PATH>` — The path to the contract artifacts folder
* `--revert-strings <REVERT>` — Revert string configuration.

   Possible values are "default", "strip" (remove), "debug" (Solidity-generated revert strings) and "verboseDebug"
* `--build-info` — Generate build info files
* `--build-info-path <PATH>` — Output path to directory that build info files will be written to
* `--eof` — Whether to compile contracts to EOF bytecode
* `--skip <SKIP>` — Skip building files whose names contain the given filter.

   `test` and `script` are aliases for `.t.sol` and `.s.sol`.
* `--ast` — Includes the AST as JSON in the compiler output
* `--evm-version <VERSION>` — The target EVM version
* `--optimize <OPTIMIZE>` — Activate the Solidity optimizer

  Possible values: `true`, `false`

* `--optimizer-runs <RUNS>` — The number of runs specifies roughly how often each opcode of the deployed code will be executed across the life-time of the contract. This means it is a trade-off parameter between code size (deploy cost) and code execution cost (cost after deployment). An `optimizer_runs` parameter of `1` will produce short but expensive code. In contrast, a larger `optimizer_runs` parameter will produce longer but more gas efficient code
* `--extra-output <SELECTOR>` — Extra output to include in the contract's artifact.

   Example keys: evm.assembly, ewasm, ir, irOptimized, metadata

   For a full description, see <https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description>
* `--extra-output-files <SELECTOR>` — Extra output to write to separate files.

   Valid values: metadata, ir, irOptimized, ewasm, evm.assembly
* `--root <PATH>` — The project's root path.

   By default root of the Git repository, if in one, or the current working directory.
* `-C`, `--contracts <PATH>` — The contracts source directory
* `-R`, `--remappings <REMAPPINGS>` — The project's remappings
* `--remappings-env <ENV>` — The project's remappings from the environment
* `--cache-path <PATH>` — The path to the compiler cache
* `--lib-paths <PATH>` — The path to the library folder
* `--hardhat` — Use the Hardhat-style project layout.

   This is the same as using: `--contracts contracts --lib-paths node_modules`.
* `--config-path <FILE>` — Path to the config file



## `cast proof`

Generate a storage proof for a given storage slot

**Usage:** `cast proof [OPTIONS] <ADDRESS> [SLOTS]...`

###### **Arguments:**

* `<ADDRESS>` — The contract address
* `<SLOTS>` — The storage slot numbers (hex or decimal)

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast nonce`

Get the nonce for an account

**Usage:** `cast nonce [OPTIONS] <WHO>`

###### **Arguments:**

* `<WHO>` — The address to get the nonce for

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast codehash`

Get the codehash for an account

**Usage:** `cast codehash [OPTIONS] <WHO> [SLOTS]...`

###### **Arguments:**

* `<WHO>` — The address to get the codehash for
* `<SLOTS>` — The storage slot numbers (hex or decimal)

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast storage-root`

Get the storage root for an account

**Usage:** `cast storage-root [OPTIONS] <WHO> [SLOTS]...`

###### **Arguments:**

* `<WHO>` — The address to get the storage root for
* `<SLOTS>` — The storage slot numbers (hex or decimal)

###### **Options:**

* `-B`, `--block <BLOCK>` — The block height to query at.

   Can also be the tags earliest, finalized, safe, latest, or pending.
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast source`

Get the source code of a contract from a block explorer

**Usage:** `cast source [OPTIONS] <ADDRESS>`

###### **Arguments:**

* `<ADDRESS>` — The contract's address

###### **Options:**

* `-f`, `--flatten` — Whether to flatten the source code
* `-d <DIRECTORY>` — The output directory/file to expand source tree into
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `--explorer-api-url <EXPLORER_API_URL>` — Alternative explorer API URL to use that adheres to the Etherscan API. If not provided, defaults to Etherscan
* `--explorer-url <EXPLORER_URL>` — Alternative explorer browser URL



## `cast wallet`

Wallet management utilities

**Usage:** `cast wallet <COMMAND>`

###### **Subcommands:**

* `new` — Create a new random keypair
* `new-mnemonic` — Generates a random BIP39 mnemonic phrase
* `vanity` — Generate a vanity address
* `address` — Convert a private key to an address
* `sign` — Sign a message or typed data
* `sign-auth` — EIP-7702 sign authorization
* `verify` — Verify the signature of a message
* `import` — Import a private key into an encrypted keystore
* `list` — List all the accounts in the keystore default directory
* `remove` — Remove a wallet from the keystore
* `private-key` — Derives private key from mnemonic
* `public-key` — Get the public key for the given private key
* `decrypt-keystore` — Decrypt a keystore file to get the private key
* `change-password` — Change the password of a keystore file



## `cast wallet new`

Create a new random keypair

**Usage:** `cast wallet new [OPTIONS] [PATH] [ACCOUNT_NAME]`

###### **Arguments:**

* `<PATH>` — If provided, then keypair will be written to an encrypted JSON keystore
* `<ACCOUNT_NAME>` — Account name for the keystore file. If provided, the keystore file will be named using this account name

###### **Options:**

* `-p`, `--password` — Triggers a hidden password prompt for the JSON keystore.

   Deprecated: prompting for a hidden password is now the default.
* `--unsafe-password <PASSWORD>` — Password for the JSON keystore in cleartext.

   This is UNSAFE to use and we recommend using the --password.
* `-n`, `--number <NUMBER>` — Number of wallets to generate

  Default value: `1`



## `cast wallet new-mnemonic`

Generates a random BIP39 mnemonic phrase

**Usage:** `cast wallet new-mnemonic [OPTIONS]`

###### **Options:**

* `-w`, `--words <WORDS>` — Number of words for the mnemonic

  Default value: `12`
* `-a`, `--accounts <ACCOUNTS>` — Number of accounts to display

  Default value: `1`
* `-e`, `--entropy <ENTROPY>` — Entropy to use for the mnemonic



## `cast wallet vanity`

Generate a vanity address

**Usage:** `cast wallet vanity [OPTIONS]`

###### **Options:**

* `--starts-with <PATTERN>` — Prefix regex pattern or hex string
* `--ends-with <PATTERN>` — Suffix regex pattern or hex string
* `--nonce <NONCE>` — Generate a vanity contract address created by the generated keypair with the specified nonce
* `--save-path <PATH>` — Path to save the generated vanity contract address to.

   If provided, the generated vanity addresses will appended to a JSON array in the specified file.



## `cast wallet address`

Convert a private key to an address

**Usage:** `cast wallet address [OPTIONS] [PRIVATE_KEY]`

###### **Arguments:**

* `<PRIVATE_KEY>` — If provided, the address will be derived from the specified private key

###### **Options:**

* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast wallet sign`

Sign a message or typed data

**Usage:** `cast wallet sign [OPTIONS] <MESSAGE>`

###### **Arguments:**

* `<MESSAGE>` — The message, typed data, or hash to sign.

   Messages starting with 0x are expected to be hex encoded, which get decoded before being signed.

   The message will be prefixed with the Ethereum Signed Message header and hashed before signing, unless `--no-hash` is provided.

   Typed data can be provided as a json string or a file name. Use --data flag to denote the message is a string of typed data. Use --data --from-file to denote the message is a file name containing typed data. The data will be combined and hashed using the EIP712 specification before signing. The data should be formatted as JSON.

###### **Options:**

* `--data` — Treat the message as JSON typed data
* `--from-file` — Treat the message as a file containing JSON typed data. Requires `--data`
* `--no-hash` — Treat the message as a raw 32-byte hash and sign it directly without hashing it again
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast wallet sign-auth`

EIP-7702 sign authorization

**Usage:** `cast wallet sign-auth [OPTIONS] <ADDRESS>`

###### **Arguments:**

* `<ADDRESS>` — Address to sign authorization for

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `--nonce <NONCE>`
* `--chain <CHAIN>`
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast wallet verify`

Verify the signature of a message

**Usage:** `cast wallet verify --address <ADDRESS> <MESSAGE> <SIGNATURE>`

###### **Arguments:**

* `<MESSAGE>` — The original message
* `<SIGNATURE>` — The signature to verify

###### **Options:**

* `-a`, `--address <ADDRESS>` — The address of the message signer



## `cast wallet import`

Import a private key into an encrypted keystore

**Usage:** `cast wallet import [OPTIONS] <ACCOUNT_NAME>`

###### **Arguments:**

* `<ACCOUNT_NAME>` — The name for the account in the keystore

###### **Options:**

* `-k`, `--keystore-dir <KEYSTORE_DIR>` — If provided, keystore will be saved here instead of the default keystores directory (~/.foundry/keystores)
* `--unsafe-password <PASSWORD>` — Password for the JSON keystore in cleartext This is unsafe, we recommend using the default hidden password prompt
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`



## `cast wallet list`

List all the accounts in the keystore default directory

**Usage:** `cast wallet list [OPTIONS]`

###### **Options:**

* `--dir <DIR>` — List all the accounts in the keystore directory. Default keystore directory is used if no path provided
* `-l`, `--ledger` — List accounts from a Ledger hardware wallet
* `-t`, `--trezor` — List accounts from a Trezor hardware wallet
* `--all` — List all configured accounts
* `-m`, `--max-senders <MAX_SENDERS>` — Max number of addresses to display from hardware wallets

  Default value: `3`



## `cast wallet remove`

Remove a wallet from the keystore.

This command requires the wallet alias and will prompt for a password to ensure that only an authorized user can remove the wallet.

**Usage:** `cast wallet cast wallet remove --name <NAME>`

###### **Options:**

* `--name <NAME>` — The alias (or name) of the wallet to remove
* `--dir <DIR>` — Optionally provide the keystore directory if not provided. default directory will be used (~/.foundry/keystores)
* `--unsafe-password <PASSWORD>` — Password for the JSON keystore in cleartext This is unsafe, we recommend using the default hidden password prompt



## `cast wallet private-key`

Derives private key from mnemonic

**Usage:** `cast wallet private-key [OPTIONS] [MNEMONIC] [MNEMONIC_INDEX_OR_DERIVATION_PATH]`

###### **Arguments:**

* `<MNEMONIC>` — If provided, the private key will be derived from the specified menomonic phrase
* `<MNEMONIC_INDEX_OR_DERIVATION_PATH>` — If provided, the private key will be derived using the specified mnemonic index (if integer) or derivation path

###### **Options:**

* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast wallet public-key`

Get the public key for the given private key

**Usage:** `cast wallet public-key [OPTIONS]`

###### **Options:**

* `--raw-private-key <PRIVATE_KEY>` — If provided, the public key will be derived from the specified private key
* `-f`, `--from <ADDRESS>` — The sender account
* `-i`, `--interactive` — Open an interactive prompt to enter your private key
* `--private-key <RAW_PRIVATE_KEY>` — Use the provided private key
* `--mnemonic <MNEMONIC>` — Use the mnemonic phrase of mnemonic file at the specified path
* `--mnemonic-passphrase <PASSPHRASE>` — Use a BIP39 passphrase for the mnemonic
* `--mnemonic-derivation-path <PATH>` — The wallet derivation path.

   Works with both --mnemonic-path and hardware wallets.
* `--mnemonic-index <INDEX>` — Use the private key from the given mnemonic index.

   Used with --mnemonic-path.

  Default value: `0`
* `--keystore <PATH>` — Use the keystore in the given folder or file
* `--account <ACCOUNT_NAME>` — Use a keystore from the default keystores folder (~/.foundry/keystores) by its filename
* `--password <PASSWORD>` — The keystore password.

   Used with --keystore.
* `--password-file <PASSWORD_FILE>` — The keystore password file path.

   Used with --keystore.
* `-l`, `--ledger` — Use a Ledger hardware wallet
* `-t`, `--trezor` — Use a Trezor hardware wallet



## `cast wallet decrypt-keystore`

Decrypt a keystore file to get the private key

**Usage:** `cast wallet decrypt-keystore [OPTIONS] <ACCOUNT_NAME>`

###### **Arguments:**

* `<ACCOUNT_NAME>` — The name for the account in the keystore

###### **Options:**

* `-k`, `--keystore-dir <KEYSTORE_DIR>` — If not provided, keystore will try to be located at the default keystores directory (~/.foundry/keystores)
* `--unsafe-password <PASSWORD>` — Password for the JSON keystore in cleartext This is unsafe, we recommend using the default hidden password prompt



## `cast wallet change-password`

Change the password of a keystore file

**Usage:** `cast wallet change-password [OPTIONS] <ACCOUNT_NAME>`

###### **Arguments:**

* `<ACCOUNT_NAME>` — The name for the account in the keystore

###### **Options:**

* `-k`, `--keystore-dir <KEYSTORE_DIR>` — If not provided, keystore will try to be located at the default keystores directory (~/.foundry/keystores)
* `--unsafe-password <PASSWORD>` — Current password for the JSON keystore in cleartext This is unsafe, we recommend using the default hidden password prompt
* `--unsafe-new-password <NEW_PASSWORD>` — New password for the JSON keystore in cleartext This is unsafe, we recommend using the default hidden password prompt



## `cast creation-code`

Download a contract creation code from Etherscan and RPC

**Usage:** `cast creation-code [OPTIONS] <CONTRACT>`

###### **Arguments:**

* `<CONTRACT>` — An Ethereum address, for which the bytecode will be fetched

###### **Options:**

* `--abi-path <ABI_PATH>` — Path to file containing the contract's JSON ABI. It's necessary if the target contract is not verified on Etherscan
* `--disassemble` — Disassemble bytecodes into individual opcodes
* `--without-args` — Return creation bytecode without constructor arguments appended
* `--only-args` — Return only constructor arguments
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast artifact`

Generate an artifact file, that can be used to deploy a contract locally

**Usage:** `cast artifact [OPTIONS] <CONTRACT>`

###### **Arguments:**

* `<CONTRACT>` — An Ethereum address, for which the artifact will be produced

###### **Options:**

* `--abi-path <ABI_PATH>` — Path to file containing the contract's JSON ABI. It's necessary if the target contract is not verified on Etherscan
* `-o`, `--output <PATH>` — The path to the output file.

   If not specified, the artifact will be output to stdout.
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast constructor-args`

Display constructor arguments used for the contract initialization

**Usage:** `cast constructor-args [OPTIONS] <CONTRACT>`

###### **Arguments:**

* `<CONTRACT>` — An Ethereum address, for which the bytecode will be fetched

###### **Options:**

* `--abi-path <ABI_PATH>` — Path to file containing the contract's JSON ABI. It's necessary if the target contract is not verified on Etherscan
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast interface`

Generate a Solidity interface from a given ABI.

Currently does not support ABI encoder v2.

**Usage:** `cast interface [OPTIONS] <CONTRACT>`

###### **Arguments:**

* `<CONTRACT>` — The target contract, which can be one of: - A file path to an ABI JSON file. - A contract identifier in the form `<path>:<contractname>` or just `<contractname>`. - An Ethereum address, for which the ABI will be fetched from Etherscan

###### **Options:**

* `-n`, `--name <NAME>` — The name to use for the generated interface.

   Only relevant when retrieving the ABI from a file.
* `-p`, `--pragma <VERSION>` — Solidity pragma version

  Default value: `^0.8.4`
* `-o`, `--output <PATH>` — The path to the output file.

   If not specified, the interface will be output to stdout.
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID



## `cast bind`

Generate a rust binding from a given ABI

**Usage:** `cast bind [OPTIONS] <PATH_OR_ADDRESS>`

###### **Arguments:**

* `<PATH_OR_ADDRESS>` — The contract address, or the path to an ABI Directory

   If an address is specified, then the ABI is fetched from Etherscan.

###### **Options:**

* `-o`, `--output-dir <PATH>` — Path to where bindings will be stored
* `--crate-name <NAME>` — The name of the Rust crate to generate.

   This should be a valid crates.io crate name. However, this is currently not validated by this command.

  Default value: `foundry-contracts`
* `--crate-version <VERSION>` — The version of the Rust crate to generate.

   This should be a standard semver version string. However, it is not currently validated by this command.

  Default value: `0.0.1`
* `--separate-files` — Generate bindings as separate files
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID



## `cast sig`

Get the selector for a function

**Usage:** `cast sig [SIG] [OPTIMIZE]`

###### **Arguments:**

* `<SIG>` — The function signature, e.g. transfer(address,uint256)
* `<OPTIMIZE>` — Optimize signature to contain provided amount of leading zeroes in selector



## `cast create2`

Generate a deterministic contract address using CREATE2

**Usage:** `cast create2 [OPTIONS]`

###### **Options:**

* `-s`, `--starts-with <HEX>` — Prefix for the contract address
* `-e`, `--ends-with <HEX>` — Suffix for the contract address
* `-m`, `--matching <HEX>` — Sequence that the address has to match
* `-c`, `--case-sensitive` — Case sensitive matching
* `-d`, `--deployer <ADDRESS>` — Address of the contract deployer

  Default value: `0x4e59b44847b379578588920ca78fbf26c0b4956c`
* `--salt <HEX>` — Salt to be used for the contract deployment. This option separate from the default salt mining with filters
* `-i`, `--init-code <HEX>` — Init code of the contract to be deployed
* `--init-code-hash <HASH>` — Init code hash of the contract to be deployed
* `-j`, `--threads <THREADS>` — Number of threads to use. Specifying 0 defaults to the number of logical cores
* `--caller <ADDRESS>` — Address of the caller. Used for the first 20 bytes of the salt
* `--seed <HEX>` — The random number generator's seed, used to initialize the salt
* `--no-random` — Don't initialize the salt with a random value, and instead use the default value of 0



## `cast find-block`

Get the block number closest to the provided timestamp

**Usage:** `cast find-block [OPTIONS] <TIMESTAMP>`

###### **Arguments:**

* `<TIMESTAMP>` — The UNIX timestamp to search for, in seconds

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast completions`

Generate shell completions script

**Usage:** `cast completions <SHELL>`

###### **Arguments:**

* `<SHELL>`

  Possible values: `bash`, `elvish`, `fish`, `powershell`, `zsh`




## `cast generate-fig-spec`

Generate Fig autocompletion spec

**Usage:** `cast generate-fig-spec`



## `cast run`

Runs a published transaction in a local environment and prints the trace

**Usage:** `cast run [OPTIONS] <TX_HASH>`

###### **Arguments:**

* `<TX_HASH>` — The transaction hash

###### **Options:**

* `-d`, `--debug` — Opens the transaction in the debugger
* `--decode-internal` — Whether to identify internal functions in traces
* `-t`, `--trace-printer` — Print out opcode traces
* `--quick` — Executes the transaction only with the state from the previous block.

   May result in different results than the live execution!
* `-l`, `--label <LABEL>` — Label addresses in the trace.

   Example: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045:vitalik.eth
* `-e`, `--etherscan-api-key <KEY>` — The Etherscan (or equivalent) API key
* `-c`, `--chain <CHAIN>` — The chain name or EIP-155 chain ID
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests
* `--evm-version <EVM_VERSION>` — The EVM version to use.

   Overrides the version specified in the config.
* `--compute-units-per-second <CUPS>` — Sets the number of assumed available compute units per second for this provider

   default value: 330

   See also, <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--no-rate-limit` — Disables rate limiting for this node's provider.

   default value: false

   See also, <https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second>
* `--odyssey` — Enables Odyssey features
* `--with-local-artifacts` — Use current project artifacts for trace decoding
* `--disable-block-gas-limit` — Disable block gas limit check



## `cast rpc`

Perform a raw JSON-RPC request

**Usage:** `cast rpc [OPTIONS] <METHOD> [PARAMS]...`

###### **Arguments:**

* `<METHOD>` — RPC method name
* `<PARAMS>` — RPC parameters

   Interpreted as JSON:

   cast rpc eth_getBlockByNumber 0x123 false => {"method": "eth_getBlockByNumber", "params": ["0x123", false] ... }

###### **Options:**

* `-w`, `--raw` — Send raw JSON parameters

   The first param will be interpreted as a raw JSON array of params. If no params are given, stdin will be used. For example:

   cast rpc eth_getBlockByNumber '["0x123", false]' --raw => {"method": "eth_getBlockByNumber", "params": ["0x123", false] ... }
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast format-bytes32-string`

Formats a string into bytes32 encoding

**Usage:** `cast format-bytes32-string [STRING]`

###### **Arguments:**

* `<STRING>` — The string to format



## `cast parse-bytes32-string`

Parses a string from bytes32 encoding

**Usage:** `cast parse-bytes32-string [BYTES]`

###### **Arguments:**

* `<BYTES>` — The string to parse



## `cast parse-bytes32-address`

Parses a checksummed address from bytes32 encoding.

**Usage:** `cast parse-bytes32-address [BYTES]`

###### **Arguments:**

* `<BYTES>`



## `cast decode-transaction`

Decodes a raw signed EIP 2718 typed transaction

**Usage:** `cast decode-transaction [TX]`

###### **Arguments:**

* `<TX>`



## `cast selectors`

Extracts function selectors and arguments from bytecode

**Usage:** `cast selectors [OPTIONS] [BYTECODE]`

###### **Arguments:**

* `<BYTECODE>` — The hex-encoded bytecode

###### **Options:**

* `-r`, `--resolve` — Resolve the function signatures for the extracted selectors using <https://openchain.xyz>



## `cast decode-eof`

Decodes EOF container bytes

**Usage:** `cast decode-eof [EOF]`

###### **Arguments:**

* `<EOF>`



## `cast tx-pool`

Inspect the TxPool of a node

**Usage:** `cast tx-pool <COMMAND>`

###### **Subcommands:**

* `content` — Fetches the content of the transaction pool
* `content-from` — Fetches the content of the transaction pool filtered by a specific address
* `inspect` — Fetches a textual summary of each transaction in the pool
* `status` — Fetches the current status of the transaction pool



## `cast tx-pool content`

Fetches the content of the transaction pool

**Usage:** `cast tx-pool content [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast tx-pool content-from`

Fetches the content of the transaction pool filtered by a specific address

**Usage:** `cast tx-pool content-from [OPTIONS] --from <FROM>`

###### **Options:**

* `-f`, `--from <FROM>` — The Signer to filter the transactions by
* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast tx-pool inspect`

Fetches a textual summary of each transaction in the pool

**Usage:** `cast tx-pool inspect [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



## `cast tx-pool status`

Fetches the current status of the transaction pool

**Usage:** `cast tx-pool status [OPTIONS]`

###### **Options:**

* `-r`, `--rpc-url <URL>` — The RPC endpoint, default value is http://localhost:8545
* `--flashbots` — Use the Flashbots RPC URL with fast mode (<https://rpc.flashbots.net/fast>).

   This shares the transaction privately with all registered builders.

   See: <https://docs.flashbots.net/flashbots-protect/quick-start#faster-transactions>
* `--jwt-secret <JWT_SECRET>` — JWT Secret for the RPC endpoint.

   The JWT secret will be used to create a JWT for a RPC. For example, the following can be used to simulate a CL `engine_forkchoiceUpdated` call:

   cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2 '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc", "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
* `--rpc-timeout <RPC_TIMEOUT>` — Timeout for the RPC request in seconds.

   The specified timeout will be used to override the default timeout for RPC requests.

   Default value: 45
* `--rpc-headers <RPC_HEADERS>` — Specify custom headers for RPC requests



<hr/>

<small><i>
    This document was generated automatically by
    <a href="https://crates.io/crates/clap-markdown"><code>clap-markdown</code></a>.
</i></small>

