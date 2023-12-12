# cast

Perform Ethereum RPC calls from the comfort of your command line

```bash
$ cast --help
Usage: cast <COMMAND>

Commands:
  4byte                  Get the function signatures for the given selector from
                             https://openchain.xyz [aliases: 4, 4b]
  4byte-decode           Decode ABI-encoded calldata using https://openchain.xyz
                             [aliases: 4d, 4bd]
  4byte-event            Get the event signature for a given topic 0 from
                             https://openchain.xyz [aliases: 4e, 4be, topic0-event,
                             t0e]
  abi-decode             Decode ABI-encoded input or output data [aliases: ad,
                             --abi-decode]
  abi-encode             ABI encode the given function argument, excluding the
                             selector [aliases: ae]
  access-list            Create an access list for a transaction [aliases: ac,
                             acl]
  address-zero           Prints the zero address [aliases: --address-zero, az]
  admin                  Fetch the EIP-1967 admin account [aliases: adm]
  age                    Get the timestamp of a block [aliases: a]
  balance                Get the balance of an account in wei [aliases: b]
  base-fee               Get the basefee of a block [aliases: ba, fee, basefee]
  bind                   Generate a rust binding from a given ABI [aliases: bi]
  block                  Get information about a block [aliases: bl]
  block-number           Get the latest block number [aliases: bn]
  call                   Perform a call on an account without publishing a
                             transaction [aliases: c]
  calldata               ABI-encode a function with arguments [aliases: cd]
  calldata-decode        Decode ABI-encoded input data [aliases:
                             --calldata-decode, cdd]
  chain                  Get the symbolic name of the current chain
  chain-id               Get the Ethereum chain ID [aliases: ci, cid]
  client                 Get the current client version [aliases: cl]
  code                   Get the runtime bytecode of a contract [aliases: co]
  codesize               Get the runtime bytecode size of a contract [aliases:
                             cs]
  completions            Generate shell completions script [aliases: com]
  compute-address        Compute the contract address from a given nonce and
                             deployer address [aliases: ca]
  concat-hex             Concatenate hex strings [aliases: --concat-hex, ch]
  create2                Generate a deterministic contract address using CREATE2
                             [aliases: c2]
  decode-transaction     Decodes a raw signed EIP 2718 typed transaction
                             [aliases: dt]
  disassemble            Disassembles hex encoded bytecode into individual /
                             human readable opcodes [aliases: da]
  estimate               Estimate the gas cost of a transaction [aliases: e]
  etherscan-source       Get the source code of a contract from Etherscan
                             [aliases: et, src]
  find-block             Get the block number closest to the provided timestamp
                             [aliases: f]
  format-bytes32-string  Formats a string into bytes32 encoding [aliases:
                             --format-bytes32-string]
  from-bin               Convert binary data into hex data [aliases: --from-bin,
                             from-binx, fb]
  from-fixed-point       Convert a fixed point number into an integer [aliases:
                             --from-fix, ff]
  from-rlp               Decodes RLP encoded data [aliases: --from-rlp]
  from-utf8              Convert UTF8 text to hex [aliases: --from-ascii,
                             --from-utf8, from-ascii, fu, fa]
  from-wei               Convert wei into an ETH amount [aliases: --from-wei, fw]
  gas-price              Get the current gas price [aliases: g]
  generate-fig-spec      Generate Fig autocompletion spec [aliases: fig]
  hash-zero              Prints the zero hash [aliases: --hash-zero, hz]
  help                   Print this message or the help of the given
                             subcommand(s)
  implementation         Fetch the EIP-1967 implementation account [aliases:
                             impl]
  index                  Compute the storage slot for an entry in a mapping
                             [aliases: in]
  interface              Generate a Solidity interface from a given ABI [aliases:
                             i]
  keccak                 Hash arbitrary data using Keccak-256 [aliases: k]
  logs                   Get logs by signature or topic [aliases: l]
  lookup-address         Perform an ENS reverse lookup [aliases: la]
  max-int                Prints the maximum value of the given integer type
                             [aliases: --max-int, maxi]
  max-uint               Prints the maximum value of the given integer type
                             [aliases: --max-uint, maxu]
  min-int                Prints the minimum value of the given integer type
                             [aliases: --min-int, mini]
  namehash               Calculate the ENS namehash of a name [aliases: na, nh]
  nonce                  Get the nonce for an account [aliases: n]
  parse-bytes32-address  Parses a checksummed address from bytes32 encoding.
                             [aliases: --parse-bytes32-address]
  parse-bytes32-string   Parses a string from bytes32 encoding [aliases:
                             --parse-bytes32-string]
  pretty-calldata        Pretty print calldata [aliases: pc]
  proof                  Generate a storage proof for a given storage slot
                             [aliases: pr]
  publish                Publish a raw transaction to the network [aliases: p]
  receipt                Get the transaction receipt for a transaction [aliases:
                             re]
  resolve-name           Perform an ENS lookup [aliases: rn]
  rpc                    Perform a raw JSON-RPC request [aliases: rp]
  run                    Runs a published transaction in a local environment and
                             prints the trace [aliases: r]
  send                   Sign and publish a transaction [aliases: s]
  shl                    Perform a left shifting operation
  shr                    Perform a right shifting operation
  sig                    Get the selector for a function [aliases: si]
  sig-event              Generate event signatures from event string [aliases:
                             se]
  storage                Get the raw value of a contract's storage slot [aliases:
                             st]
  to-ascii               Convert hex data to an ASCII string [aliases:
                             --to-ascii, tas, 2as]
  to-base                Converts a number of one base to another [aliases:
                             --to-base, --to-radix, to-radix, tr, 2r]
  to-bytes32             Right-pads hex data to 32 bytes [aliases: --to-bytes32,
                             tb, 2b]
  to-check-sum-address   Convert an address to a checksummed format (EIP-55)
                             [aliases: --to-checksum-address, --to-checksum,
                             to-checksum, ta, 2a]
  to-dec                 Converts a number of one base to decimal [aliases:
                             --to-dec, td, 2d]
  to-fixed-point         Convert an integer into a fixed point number [aliases:
                             --to-fix, tf, 2f]
  to-hex                 Converts a number of one base to another [aliases:
                             --to-hex, th, 2h]
  to-hexdata             Normalize the input to lowercase, 0x-prefixed hex
                             [aliases: --to-hexdata, thd, 2hd]
  to-int256              Convert a number to a hex-encoded int256 [aliases:
                             --to-int256, ti, 2i]
  to-rlp                 RLP encodes hex data, or an array of hex data [aliases:
                             --to-rlp]
  to-uint256             Convert a number to a hex-encoded uint256 [aliases:
                             --to-uint256, tu, 2u]
  to-unit                Convert an ETH amount into another unit (ether, gwei or
                             wei) [aliases: --to-unit, tun, 2un]
  to-wei                 Convert an ETH amount to wei [aliases: --to-wei, tw, 2w]
  tx                     Get information about a transaction [aliases: t]
  upload-signature       Upload the given signatures to https://openchain.xyz
                             [aliases: ups]
  wallet                 Wallet management utilities [aliases: w]

Options:
  -h, --help     Print help
  -V, --version  Print version

Find more information in the book: http://book.getfoundry.sh/reference/cast/cast.html
```

## cast 4byte

Get the function signatures for the given selector from https://openchain.xyz

```bash
$ cast 4byte --help
Usage: cast 4byte [SELECTOR]

Arguments:
  [SELECTOR]  The function selector

Options:
  -h, --help  Print help
```

## cast 4byte-decode

Decode ABI-encoded calldata using https://openchain.xyz

```bash
$ cast 4byte-decode --help
Usage: cast 4byte-decode [CALLDATA]

Arguments:
  [CALLDATA]  The ABI-encoded calldata

Options:
  -h, --help  Print help
```

## cast 4byte-event

Get the event signature for a given topic 0 from https://openchain.xyz

```bash
$ cast 4byte-event --help
Usage: cast 4byte-event [TOPIC_0]

Arguments:
  [TOPIC_0]  Topic 0

Options:
  -h, --help  Print help
```

## cast abi-decode

Decode ABI-encoded input or output data.

```bash
$ cast abi-decode --help
Usage: cast abi-decode [OPTIONS] <SIG> <CALLDATA>

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  <CALLDATA>
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')

Decode input data instead of output data:
  -i, --input
          Whether to decode the input or output data
```

## cast abi-encode

ABI encode the given function argument, excluding the selector

```bash
$ cast abi-encode --help
Usage: cast abi-encode <SIG> [ARGS]...

Arguments:
  <SIG>      The function signature
  [ARGS]...  The arguments of the function

Options:
  -h, --help  Print help
```

## cast access-list

Create an access list for a transaction

```bash
$ cast access-list --help
Usage: cast access-list [OPTIONS] [TO] [SIG] [ARGS]...

Arguments:
  [TO]
          The destination of the transaction

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
      --data <DATA>
          The data for the transaction

  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the access list as JSON

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559
          transactions
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string
          with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

## cast address-zero

Prints the zero address

```bash
$ cast address-zero --help
Usage: cast address-zero

Options:
  -h, --help  Print help
```

## cast admin

Fetch the EIP-1967 admin account

```bash
$ cast admin --help
Usage: cast admin [OPTIONS] <WHO>

Arguments:
  <WHO>
          The address to get the nonce for

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast age

Get the timestamp of a block

```bash
$ cast age --help
Usage: cast age [OPTIONS] [BLOCK]

Arguments:
  [BLOCK]
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast balance

Get the balance of an account in wei

```bash
$ cast balance --help
Usage: cast balance [OPTIONS] <WHO>

Arguments:
  <WHO>
          The account to query

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -e, --ether
          Format the balance in ether

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast base-fee

Get the basefee of a block

```bash
$ cast base-fee --help
Usage: cast base-fee [OPTIONS] [BLOCK]

Arguments:
  [BLOCK]
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast bind

Generate a rust binding from a given ABI

```bash
$ cast bind --help
Usage: cast bind [OPTIONS] <PATH_OR_ADDRESS>

Arguments:
  <PATH_OR_ADDRESS>
          The contract address, or the path to an ABI Directory
          
          If an address is specified, then the ABI is fetched from Etherscan.

Options:
  -o, --output-dir <PATH>
          Path to where bindings will be stored

      --crate-name <NAME>
          The name of the Rust crate to generate.
          
          This should be a valid crates.io crate name. However, this is currently not
          validated by this command.
          
          [default: foundry-contracts]

      --crate-version <VERSION>
          The version of the Rust crate to generate.
          
          This should be a standard semver version string. However, it is not
          currently validated by this command.
          
          [default: 0.0.1]

      --separate-files
          Generate bindings as separate files

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast block

Get information about a block

```bash
$ cast block --help
Usage: cast block [OPTIONS] [BLOCK]

Arguments:
  [BLOCK]
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

Options:
  -f, --field <FIELD>
          If specified, only get the given field of the block

      --full
          [env: CAST_FULL_BLOCK=]

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the block as JSON
```

## cast block-number

Get the latest block number

```bash
$ cast block-number --help
Usage: cast block-number [OPTIONS]

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast call

Perform a call on an account without publishing a transaction

```bash
$ cast call --help
Usage: cast call [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  ignores the address field and simulates creating a contract
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
      --data <DATA>
          Data for the transaction

      --trace
          Forks the remote rpc, executes the transaction locally and prints a trace

      --debug
          Can only be used with "--trace"
          
          opens an interactive debugger

      --verbose
          Can only be used with "--trace"
          
          prints a more verbose trace

      --labels <LABELS>
          Can only be used with "--trace" Labels to apply to the traces.
          
          Format: `address:label`

      --evm-version <EVM_VERSION>
          Can only be used with "--trace"
          
          The EVM Version to use.

  -b, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -h, --help
          Print help (see a summary with '-h')

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559
          transactions
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string
          with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

### cast call --create

ignores the address field and simulates creating a contract

```bash
$ cast call --create --help
Usage: cast call --create [OPTIONS] <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>
          Bytecode of contract

  [SIG]
          The signature of the constructor

  [ARGS]...
          The arguments of the constructor

Options:
      --value <VALUE>
          Ether to send in the transaction.
          
          Either specified in wei, or as a string with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

  -h, --help
          Print help (see a summary with '-h')
```

## cast calldata

ABI-encode a function with arguments

```bash
$ cast calldata --help
Usage: cast calldata <SIG> [ARGS]...

Arguments:
  <SIG>      The function signature in the format `<name>(<in-types>)(<out-types>)`
  [ARGS]...  The arguments to encode

Options:
  -h, --help  Print help
```

## cast calldata-decode

Decode ABI-encoded input data.

```bash
$ cast calldata-decode --help
Usage: cast calldata-decode <SIG> <CALLDATA>

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  <CALLDATA>
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast chain

Get the symbolic name of the current chain

```bash
$ cast chain --help
Usage: cast chain [OPTIONS]

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast chain-id

Get the Ethereum chain ID

```bash
$ cast chain-id --help
Usage: cast chain-id [OPTIONS]

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast client

Get the current client version

```bash
$ cast client --help
Usage: cast client [OPTIONS]

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast code

Get the runtime bytecode of a contract

```bash
$ cast code --help
Usage: cast code [OPTIONS] <WHO>

Arguments:
  <WHO>
          The contract address

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -d, --disassemble
          Disassemble bytecodes into individual opcodes

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast codesize

Get the runtime bytecode size of a contract

```bash
$ cast codesize --help
Usage: cast codesize [OPTIONS] <WHO>

Arguments:
  <WHO>
          The contract address

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast completions

Generate shell completions script

```bash
$ cast completions --help
Usage: cast completions <SHELL>

Arguments:
  <SHELL>  [possible values: bash, elvish, fish, powershell, zsh]

Options:
  -h, --help  Print help
```

## cast compute-address

Compute the contract address from a given nonce and deployer address

```bash
$ cast compute-address --help
Usage: cast compute-address [OPTIONS] [ADDRESS]

Arguments:
  [ADDRESS]
          The deployer address

Options:
      --nonce <NONCE>
          The nonce of the deployer address

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast concat-hex

Concatenate hex strings

```bash
$ cast concat-hex --help
Usage: cast concat-hex [DATA]...

Arguments:
  [DATA]...  The data to concatenate

Options:
  -h, --help  Print help
```

## cast create2

Generate a deterministic contract address using CREATE2

```bash
$ cast create2 --help
Usage: cast create2 [OPTIONS]

Options:
  -s, --starts-with <HEX>      Prefix for the contract address
  -e, --ends-with <HEX>        Suffix for the contract address
  -m, --matching <HEX>         Sequence that the address has to match
  -c, --case-sensitive         Case sensitive matching
  -d, --deployer <ADDRESS>     Address of the contract deployer [default:
                               0x4e59b44847b379578588920ca78fbf26c0b4956c]
  -i, --init-code <HEX>        Init code of the contract to be deployed
      --init-code-hash <HASH>  Init code hash of the contract to be deployed
  -j, --jobs <JOBS>            Number of threads to use. Defaults to and caps at the
                               number of logical cores
      --caller <ADDRESS>       Address of the caller. Used for the first 20 bytes of
                               the salt
      --seed <HEX>             The random number generator's seed, used to initialize
                               the salt
      --no-random              Don't initialize the salt with a random value, and
                               instead use the default value of 0
  -h, --help                   Print help
```

## cast decode-transaction

Decodes a raw signed EIP 2718 typed transaction

```bash
$ cast decode-transaction --help
Usage: cast decode-transaction [TX]

Arguments:
  [TX]  

Options:
  -h, --help  Print help
```

## cast disassemble

Disassembles hex encoded bytecode into individual / human readable opcodes

```bash
$ cast disassemble --help
Usage: cast disassemble <BYTECODE>

Arguments:
  <BYTECODE>  The hex encoded bytecode

Options:
  -h, --help  Print help
```

## cast estimate

Estimate the gas cost of a transaction

```bash
$ cast estimate --help
Usage: cast estimate [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  Estimate gas cost to deploy a smart contract
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
  -f, --from <FROM>
          The sender account
          
          [env: ETH_FROM=]
          [default: 0x0000000000000000000000000000000000000000]

      --value <VALUE>
          Ether to send in the transaction.
          
          Either specified in wei, or as a string with a unit type:
          
          Examples: 1ether, 10gwei, 0.01ether

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')
```

### cast estimate --create

Estimate gas cost to deploy a smart contract

```bash
$ cast estimate --create --help
Usage: cast estimate --create [OPTIONS] <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>
          The bytecode of contract

  [SIG]
          The signature of the constructor

  [ARGS]...
          Constructor arguments

Options:
      --value <VALUE>
          Ether to send in the transaction
          
          Either specified in wei, or as a string with a unit type:
          
          Examples: 1ether, 10gwei, 0.01ether

  -h, --help
          Print help (see a summary with '-h')
```

## cast etherscan-source

Get the source code of a contract from Etherscan

```bash
$ cast etherscan-source --help
Usage: cast etherscan-source [OPTIONS] <ADDRESS>

Arguments:
  <ADDRESS>  The contract's address

Options:
  -d <DIRECTORY>                 The output directory to expand source tree into
  -e, --etherscan-api-key <KEY>  The Etherscan (or equivalent) API key [env:
                                 ETHERSCAN_API_KEY=]
  -c, --chain <CHAIN>            The chain name or EIP-155 chain ID [env: CHAIN=]
  -h, --help                     Print help
```

## cast find-block

Get the block number closest to the provided timestamp

```bash
$ cast find-block --help
Usage: cast find-block [OPTIONS] <TIMESTAMP>

Arguments:
  <TIMESTAMP>
          The UNIX timestamp to search for, in seconds

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast format-bytes32-string

Formats a string into bytes32 encoding

```bash
$ cast format-bytes32-string --help
Usage: cast format-bytes32-string [STRING]

Arguments:
  [STRING]  The string to format

Options:
  -h, --help  Print help
```

## cast from-bin

Convert binary data into hex data

```bash
$ cast from-bin --help
Usage: cast from-bin

Options:
  -h, --help  Print help
```

## cast from-fixed-point

Convert a fixed point number into an integer

```bash
$ cast from-fixed-point --help
Usage: cast from-fixed-point [DECIMALS] [VALUE]

Arguments:
  [DECIMALS]  The number of decimals to use
  [VALUE]     The value to convert

Options:
  -h, --help  Print help
```

## cast from-rlp

Decodes RLP encoded data.

```bash
$ cast from-rlp --help
Usage: cast from-rlp [VALUE]

Arguments:
  [VALUE]
          The value to convert

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast from-utf8

Convert UTF8 text to hex

```bash
$ cast from-utf8 --help
Usage: cast from-utf8 [TEXT]

Arguments:
  [TEXT]  The text to convert

Options:
  -h, --help  Print help
```

## cast from-wei

Convert wei into an ETH amount.

```bash
$ cast from-wei --help
Usage: cast from-wei [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert from (ether, gwei, wei)
          
          [default: eth]

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast gas-price

Get the current gas price

```bash
$ cast gas-price --help
Usage: cast gas-price [OPTIONS]

Options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast generate-fig-spec

Generate Fig autocompletion spec

```bash
$ cast generate-fig-spec --help
Usage: cast generate-fig-spec

Options:
  -h, --help  Print help
```

## cast hash-zero

Prints the zero hash

```bash
$ cast hash-zero --help
Usage: cast hash-zero

Options:
  -h, --help  Print help
```

## cast implementation

Fetch the EIP-1967 implementation account

```bash
$ cast implementation --help
Usage: cast implementation [OPTIONS] <WHO>

Arguments:
  <WHO>
          The address to get the nonce for

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast index

Compute the storage slot for an entry in a mapping

```bash
$ cast index --help
Usage: cast index <KEY_TYPE> <KEY> <SLOT_NUMBER>

Arguments:
  <KEY_TYPE>     The mapping key type
  <KEY>          The mapping key
  <SLOT_NUMBER>  The storage slot of the mapping

Options:
  -h, --help  Print help
```

## cast interface

Generate a Solidity interface from a given ABI.

```bash
$ cast interface --help
Usage: cast interface [OPTIONS] <PATH_OR_ADDRESS>

Arguments:
  <PATH_OR_ADDRESS>
          The contract address, or the path to an ABI file.
          
          If an address is specified, then the ABI is fetched from Etherscan.

Options:
  -n, --name <NAME>
          The name to use for the generated interface

  -p, --pragma <VERSION>
          Solidity pragma version
          
          [default: ^0.8.4]

  -o, --output <PATH>
          The path to the output file.
          
          If not specified, the interface will be output to stdout.

  -j, --json
          If specified, the interface will be output as JSON rather than Solidity

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast keccak

Hash arbitrary data using Keccak-256

```bash
$ cast keccak --help
Usage: cast keccak [DATA]

Arguments:
  [DATA]  The data to hash

Options:
  -h, --help  Print help
```

## cast logs

Get logs by signature or topic

```bash
$ cast logs --help
Usage: cast logs [OPTIONS] [SIG_OR_TOPIC] [TOPICS_OR_ARGS]...

Arguments:
  [SIG_OR_TOPIC]
          The signature of the event to filter logs by which will be converted to the
          first topic or a topic to filter on

  [TOPICS_OR_ARGS]...
          If used with a signature, the indexed fields of the event to filter by.
          Otherwise, the remaining topics of the filter

Options:
      --from-block <FROM_BLOCK>
          The block height to start query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

      --to-block <TO_BLOCK>
          The block height to stop query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

      --address <ADDRESS>
          The contract address to filter on

      --subscribe
          If the RPC type and endpoints supports `eth_subscribe` stream logs instead
          of printing and exiting. Will continue until interrupted or TO_BLOCK is
          reached

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the logs as JSON.s

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

## cast lookup-address

Perform an ENS reverse lookup

```bash
$ cast lookup-address --help
Usage: cast lookup-address [OPTIONS] [WHO]

Arguments:
  [WHO]
          The account to perform the lookup for

Options:
  -v, --verify
          Perform a normal lookup to verify that the address is correct

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast max-int

Prints the maximum value of the given integer type

```bash
$ cast max-int --help
Usage: cast max-int [TYPE]

Arguments:
  [TYPE]  The integer type to get the maximum value of [default: int256]

Options:
  -h, --help  Print help
```

## cast max-uint

Prints the maximum value of the given integer type

```bash
$ cast max-uint --help
Usage: cast max-uint [TYPE]

Arguments:
  [TYPE]  The unsigned integer type to get the maximum value of [default: uint256]

Options:
  -h, --help  Print help
```

## cast min-int

Prints the minimum value of the given integer type

```bash
$ cast min-int --help
Usage: cast min-int [TYPE]

Arguments:
  [TYPE]  The integer type to get the minimum value of [default: int256]

Options:
  -h, --help  Print help
```

## cast namehash

Calculate the ENS namehash of a name

```bash
$ cast namehash --help
Usage: cast namehash [NAME]

Arguments:
  [NAME]  

Options:
  -h, --help  Print help
```

## cast nonce

Get the nonce for an account

```bash
$ cast nonce --help
Usage: cast nonce [OPTIONS] <WHO>

Arguments:
  <WHO>
          The address to get the nonce for

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast parse-bytes32-address

Parses a checksummed address from bytes32 encoding.

```bash
$ cast parse-bytes32-address --help
Usage: cast parse-bytes32-address [BYTES]

Arguments:
  [BYTES]  

Options:
  -h, --help  Print help
```

## cast parse-bytes32-string

Parses a string from bytes32 encoding

```bash
$ cast parse-bytes32-string --help
Usage: cast parse-bytes32-string [BYTES]

Arguments:
  [BYTES]  The string to parse

Options:
  -h, --help  Print help
```

## cast pretty-calldata

Pretty print calldata.

```bash
$ cast pretty-calldata --help
Usage: cast pretty-calldata [OPTIONS] [CALLDATA]

Arguments:
  [CALLDATA]
          The calldata

Options:
  -o, --offline
          Skip the https://openchain.xyz lookup

  -h, --help
          Print help (see a summary with '-h')
```

## cast proof

Generate a storage proof for a given storage slot

```bash
$ cast proof --help
Usage: cast proof [OPTIONS] <ADDRESS> [SLOTS]...

Arguments:
  <ADDRESS>
          The contract address

  [SLOTS]...
          The storage slot numbers (hex or decimal)

Options:
  -B, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast publish

Publish a raw transaction to the network

```bash
$ cast publish --help
Usage: cast publish [OPTIONS] <RAW_TX>

Arguments:
  <RAW_TX>
          The raw transaction

Options:
      --async
          Only print the transaction hash and exit immediately
          
          [env: CAST_ASYNC=]

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast receipt

Get the transaction receipt for a transaction

```bash
$ cast receipt --help
Usage: cast receipt [OPTIONS] <TX_HASH> [FIELD]

Arguments:
  <TX_HASH>
          The transaction hash

  [FIELD]
          If specified, only get the given field of the transaction

Options:
      --confirmations <CONFIRMATIONS>
          The number of confirmations until the receipt is fetched
          
          [default: 1]

      --async
          Exit immediately if the transaction was not found
          
          [env: CAST_ASYNC=]

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print as JSON
```

## cast resolve-name

Perform an ENS lookup

```bash
$ cast resolve-name --help
Usage: cast resolve-name [OPTIONS] [WHO]

Arguments:
  [WHO]
          The name to lookup

Options:
  -v, --verify
          Perform a reverse lookup to verify that the name is correct

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast rpc

Perform a raw JSON-RPC request

```bash
$ cast rpc --help
Usage: cast rpc [OPTIONS] <METHOD> [PARAMS]...

Arguments:
  <METHOD>
          RPC method name

  [PARAMS]...
          RPC parameters
          
          Interpreted as JSON:
          
          cast rpc eth_getBlockByNumber 0x123 false => {"method":
          "eth_getBlockByNumber", "params": ["0x123", false] ... }

Options:
  -w, --raw
          Send raw JSON parameters
          
          The first param will be interpreted as a raw JSON array of params. If no
          params are given, stdin will be used. For example:
          
          cast rpc eth_getBlockByNumber '["0x123", false]' --raw => {"method":
          "eth_getBlockByNumber", "params": ["0x123", false] ... }

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')
```

## cast run

Runs a published transaction in a local environment and prints the trace

```bash
$ cast run --help
Usage: cast run [OPTIONS] <TX_HASH>

Arguments:
  <TX_HASH>
          The transaction hash

Options:
  -d, --debug
          Opens the transaction in the debugger

  -t, --trace-printer
          Print out opcode traces

  -q, --quick
          Executes the transaction only with the state from the previous block.
          
          May result in different results than the live execution!

  -v, --verbose
          Prints the full address of the contract

  -l, --label <LABEL>
          Label addresses in the trace.
          
          Example: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045:vitalik.eth

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --evm-version <EVM_VERSION>
          The evm version to use.
          
          Overrides the version specified in the config.

      --compute-units-per-second <CUPS>
          Sets the number of assumed available compute units per second for this
          provider
          
          default value: 330
          
          See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second

      --no-rate-limit
          Disables rate limiting for this node's provider.
          
          default value: false
          
          See also,
          https://docs.alchemy.com/reference/compute-units#what-are-cups-compute-units-per-second
          
          [aliases: no-rpc-rate-limit]

  -h, --help
          Print help (see a summary with '-h')
```

## cast send

Sign and publish a transaction

```bash
$ cast send --help
Usage: cast send [OPTIONS] [TO] [SIG] [ARGS]... [COMMAND]

Commands:
  --create  Use to deploy raw contract bytecode
  help      Print this message or the help of the given subcommand(s)

Arguments:
  [TO]
          The destination of the transaction.
          
          If not provided, you must use cast send --create.

  [SIG]
          The signature of the function to call

  [ARGS]...
          The arguments of the function to call

Options:
      --async
          Only print the transaction hash and exit immediately
          
          [env: CAST_ASYNC=]

      --confirmations <CONFIRMATIONS>
          The number of confirmations until the receipt is fetched
          
          [default: 1]

      --resend
          Reuse the latest nonce for the sender account

      --unlocked
          Send via `eth_sendTransaction using the `--from` argument or $ETH_FROM as
          sender

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the transaction receipt as JSON

Transaction options:
      --gas-limit <GAS_LIMIT>
          Gas limit for the transaction
          
          [env: ETH_GAS_LIMIT=]

      --gas-price <PRICE>
          Gas price for legacy transactions, or max fee per gas for EIP1559
          transactions
          
          [env: ETH_GAS_PRICE=]

      --priority-gas-price <PRICE>
          Max priority fee per gas for EIP1559 transactions
          
          [env: ETH_PRIORITY_GAS_PRICE=]

      --value <VALUE>
          Ether to send in the transaction, either specified in wei, or as a string
          with a unit type.
          
          Examples: 1ether, 10gwei, 0.01ether

      --nonce <NONCE>
          Nonce for the transaction

      --legacy
          Send a legacy transaction instead of an EIP1559 transaction.
          
          This is automatically enabled for common networks without EIP1559.

Ethereum options:
  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

### cast send --create

Use to deploy raw contract bytecode

```bash
$ cast send --create --help
Usage: cast send --create <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>     The bytecode of the contract to deploy
  [SIG]      The signature of the function to call
  [ARGS]...  The arguments of the function to call

Options:
  -h, --help  Print help
```

## cast shl

Perform a left shifting operation

```bash
$ cast shl --help
Usage: cast shl [OPTIONS] <VALUE> <BITS>

Arguments:
  <VALUE>  The value to shift
  <BITS>   The number of bits to shift

Options:
      --base-in <BASE_IN>    The input base
      --base-out <BASE_OUT>  The output base [default: 16]
  -h, --help                 Print help
```

## cast shr

Perform a right shifting operation

```bash
$ cast shr --help
Usage: cast shr [OPTIONS] <VALUE> <BITS>

Arguments:
  <VALUE>  The value to shift
  <BITS>   The number of bits to shift

Options:
      --base-in <BASE_IN>    The input base,
      --base-out <BASE_OUT>  The output base, [default: 16]
  -h, --help                 Print help
```

## cast sig

Get the selector for a function

```bash
$ cast sig --help
Usage: cast sig [SIG] [OPTIMIZE]

Arguments:
  [SIG]       The function signature, e.g. transfer(address,uint256)
  [OPTIMIZE]  Optimize signature to contain provided amount of leading zeroes in
              selector

Options:
  -h, --help  Print help
```

## cast sig-event

Generate event signatures from event string

```bash
$ cast sig-event --help
Usage: cast sig-event [EVENT_STRING]

Arguments:
  [EVENT_STRING]  The event string

Options:
  -h, --help  Print help
```

## cast storage

Get the raw value of a contract's storage slot

```bash
$ cast storage --help
Usage: cast storage [OPTIONS] <ADDRESS> [SLOT]

Arguments:
  <ADDRESS>
          The contract address

  [SLOT]
          The storage slot number

Options:
  -b, --block <BLOCK>
          The block height to query at.
          
          Can also be the tags earliest, finalized, safe, latest, or pending.

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')

Cache options:
      --force
          Clear the cache and artifacts folder and recompile

Build options:
      --no-cache
          Disable the cache

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Compiler options:
      --ignored-error-codes <ERROR_CODES>
          Ignore solc warnings by error code

      --deny-warnings
          Warnings will trigger a compiler error

      --no-auto-detect
          Do not auto-detect the `solc` version

      --use <SOLC_VERSION>
          Specify the solc version, or a path to a local solc, to build with.
          
          Valid values are in the format `x.y.z`, `solc:x.y.z` or `path/to/solc`.

      --offline
          Do not access the network.
          
          Missing solc versions will not be installed.

      --via-ir
          Use the Yul intermediate representation compilation pipeline

      --silent
          Don't print anything on startup

      --evm-version <VERSION>
          The target EVM version

      --optimize
          Activate the Solidity optimizer

      --optimizer-runs <RUNS>
          The number of optimizer runs

      --extra-output <SELECTOR>...
          Extra output to include in the contract's artifact.
          
          Example keys: evm.assembly, ewasm, ir, irOptimized, metadata
          
          For a full description, see
          https://docs.soliditylang.org/en/v0.8.13/using-the-compiler.html#input-description

      --extra-output-files <SELECTOR>...
          Extra output to write to separate files.
          
          Valid values: metadata, ir, irOptimized, ewasm, evm.assembly

Project options:
  -o, --out <PATH>
          The path to the contract artifacts folder

      --revert-strings <REVERT>
          Revert string configuration.
          
          Possible values are "default", "strip" (remove), "debug"
          (Solidity-generated revert strings) and "verboseDebug"

      --build-info
          Generate build info files

      --build-info-path <PATH>
          Output path to directory that build info files will be written to

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working
          directory.

  -C, --contracts <PATH>
          The contracts source directory

  -R, --remappings <REMAPPINGS>
          The project's remappings

      --remappings-env <ENV>
          The project's remappings from the environment

      --cache-path <PATH>
          The path to the compiler cache

      --lib-paths <PATH>
          The path to the library folder

      --hardhat
          Use the Hardhat-style project layout.
          
          This is the same as using: `--contracts contracts --lib-paths
          node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```

## cast to-ascii

Convert hex data to an ASCII string

```bash
$ cast to-ascii --help
Usage: cast to-ascii [HEXDATA]

Arguments:
  [HEXDATA]  The hex data to convert

Options:
  -h, --help  Print help
```

## cast to-base

Converts a number of one base to another

```bash
$ cast to-base --help
Usage: cast to-base [OPTIONS] [VALUE] [BASE]

Arguments:
  [VALUE]  The value to convert
  [BASE]   The output base

Options:
  -i, --base-in <BASE_IN>  The input base
  -h, --help               Print help
```

## cast to-bytes32

Right-pads hex data to 32 bytes

```bash
$ cast to-bytes32 --help
Usage: cast to-bytes32 [BYTES]

Arguments:
  [BYTES]  The hex data to convert

Options:
  -h, --help  Print help
```

## cast to-check-sum-address

Convert an address to a checksummed format (EIP-55)

```bash
$ cast to-check-sum-address --help
Usage: cast to-check-sum-address [ADDRESS]

Arguments:
  [ADDRESS]  The address to convert

Options:
  -h, --help  Print help
```

## cast to-dec

Converts a number of one base to decimal

```bash
$ cast to-dec --help
Usage: cast to-dec [OPTIONS] [VALUE]

Arguments:
  [VALUE]  The value to convert

Options:
  -i, --base-in <BASE_IN>  The input base
  -h, --help               Print help
```

## cast to-fixed-point

Convert an integer into a fixed point number

```bash
$ cast to-fixed-point --help
Usage: cast to-fixed-point [DECIMALS] [VALUE]

Arguments:
  [DECIMALS]  The number of decimals to use
  [VALUE]     The value to convert

Options:
  -h, --help  Print help
```

## cast to-hex

Converts a number of one base to another

```bash
$ cast to-hex --help
Usage: cast to-hex [OPTIONS] [VALUE]

Arguments:
  [VALUE]  The value to convert

Options:
  -i, --base-in <BASE_IN>  The input base
  -h, --help               Print help
```

## cast to-hexdata

Normalize the input to lowercase, 0x-prefixed hex.

```bash
$ cast to-hexdata --help
Usage: cast to-hexdata [INPUT]

Arguments:
  [INPUT]
          The input to normalize

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast to-int256

Convert a number to a hex-encoded int256

```bash
$ cast to-int256 --help
Usage: cast to-int256 [VALUE]

Arguments:
  [VALUE]  The value to convert

Options:
  -h, --help  Print help
```

## cast to-rlp

RLP encodes hex data, or an array of hex data

```bash
$ cast to-rlp --help
Usage: cast to-rlp [VALUE]

Arguments:
  [VALUE]  The value to convert

Options:
  -h, --help  Print help
```

## cast to-uint256

Convert a number to a hex-encoded uint256

```bash
$ cast to-uint256 --help
Usage: cast to-uint256 [VALUE]

Arguments:
  [VALUE]  The value to convert

Options:
  -h, --help  Print help
```

## cast to-unit

Convert an ETH amount into another unit (ether, gwei or wei).

```bash
$ cast to-unit --help
Usage: cast to-unit [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert to (ether, gwei, wei)
          
          [default: wei]

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast to-wei

Convert an ETH amount to wei.

```bash
$ cast to-wei --help
Usage: cast to-wei [VALUE] [UNIT]

Arguments:
  [VALUE]
          The value to convert

  [UNIT]
          The unit to convert from (ether, gwei, wei)
          
          [default: eth]

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast tx

Get information about a transaction

```bash
$ cast tx --help
Usage: cast tx [OPTIONS] <TX_HASH> [FIELD]

Arguments:
  <TX_HASH>
          The transaction hash

  [FIELD]
          If specified, only get the given field of the transaction. If "raw", the
          RLP encoded transaction will be printed

Options:
      --raw
          Print the raw RLP encoded transaction

  -r, --rpc-url <URL>
          The RPC endpoint
          
          [env: ETH_RPC_URL=]

      --flashbots
          Use the Flashbots RPC URL (https://rpc.flashbots.net)

      --jwt-secret <JWT_SECRET>
          JWT Secret for the RPC endpoint.
          
          The JWT secret will be used to create a JWT for a RPC. For example, the
          following can be used to simulate a CL `engine_forkchoiceUpdated` call:
          
          cast rpc --jwt-secret <JWT_SECRET> engine_forkchoiceUpdatedV2
          '["0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc",
          "0x6bb38c26db65749ab6e472080a3d20a2f35776494e72016d1e339593f21c59bc"]'
          
          [env: ETH_RPC_JWT_SECRET=]

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print as JSON
```

## cast upload-signature

Upload the given signatures to https://openchain.xyz.

```bash
$ cast upload-signature --help
Usage: cast upload-signature [SIGNATURES]...

Arguments:
  [SIGNATURES]...
          The signatures to upload.
          
          Prefix with 'function', 'event', or 'error'. Defaults to function if no
          prefix given. Can also take paths to contract artifact JSON.

Options:
  -h, --help
          Print help (see a summary with '-h')
```

## cast wallet

Wallet management utilities

```bash
$ cast wallet --help
Usage: cast wallet <COMMAND>

Commands:
  new           Create a new random keypair [aliases: n]
  new-mnemonic  Generates a random BIP39 mnemonic phrase [aliases: nm]
  vanity        Generate a vanity address [aliases: va]
  address       Convert a private key to an address [aliases: a, addr]
  sign          Sign a message or typed data [aliases: s]
  verify        Verify the signature of a message [aliases: v]
  import        Import a private key into an encrypted keystore [aliases: i]
  list          List all the accounts in the keystore default directory [aliases:
                    ls]
  help          Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

### cast wallet new

Create a new random keypair

```bash
$ cast wallet new --help
Usage: cast wallet new [OPTIONS] [PATH]

Arguments:
  [PATH]
          If provided, then keypair will be written to an encrypted JSON keystore

Options:
  -p, --password
          Triggers a hidden password prompt for the JSON keystore.
          
          Deprecated: prompting for a hidden password is now the default.

      --unsafe-password <PASSWORD>
          Password for the JSON keystore in cleartext.
          
          This is UNSAFE to use and we recommend using the --password.
          
          [env: CAST_PASSWORD=]

  -n, --number <NUMBER>
          Number of wallets to generate
          
          [default: 1]

  -j, --json
          Output generated wallets as JSON

  -h, --help
          Print help (see a summary with '-h')
```

### cast wallet new-mnemonic

Generates a random BIP39 mnemonic phrase

```bash
$ cast wallet new-mnemonic --help
Usage: cast wallet new-mnemonic [OPTIONS]

Options:
  -w, --words <WORDS>        Number of words for the mnemonic [default: 12]
  -a, --accounts <ACCOUNTS>  Number of accounts to display [default: 1]
  -h, --help                 Print help
```

### cast wallet vanity

Generate a vanity address

```bash
$ cast wallet vanity --help
Usage: cast wallet vanity [OPTIONS]

Options:
      --starts-with <HEX>
          Prefix for the vanity address

      --ends-with <HEX>
          Suffix for the vanity address

      --nonce <NONCE>
          Generate a vanity contract address created by the generated keypair with
          the specified nonce

      --save-path <PATH>
          Path to save the generated vanity contract address to.
          
          If provided, the generated vanity addresses will appended to a JSON array
          in the specified file.

  -h, --help
          Print help (see a summary with '-h')
```

### cast wallet address

Convert a private key to an address

```bash
$ cast wallet address --help
Usage: cast wallet address [OPTIONS] [PRIVATE_KEY]

Arguments:
  [PRIVATE_KEY]
          If provided, the address will be derived from the specified private key

Options:
  -h, --help
          Print help (see a summary with '-h')

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

### cast wallet sign

Sign a message or typed data

```bash
$ cast wallet sign --help
Usage: cast wallet sign [OPTIONS] <MESSAGE>

Arguments:
  <MESSAGE>
          The message or typed data to sign.
          
          Messages starting with 0x are expected to be hex encoded, which get decoded
          before being signed. The message will be prefixed with the Ethereum Signed
          Message header and hashed before signing.
          
          Typed data can be provided as a json string or a file name. Use --data flag
          to denote the message is a string of typed data. Use --data --from-file to
          denote the message is a file name containing typed data. The data will be
          combined and hashed using the EIP712 specification before signing. The data
          should be formatted as JSON.

Options:
      --data
          If provided, the message will be treated as typed data

      --from-file
          If provided, the message will be treated as a file name containing typed
          data. Requires --data

  -h, --help
          Print help (see a summary with '-h')

Wallet options - raw:
  -f, --from <ADDRESS>
          The sender account
          
          [env: ETH_FROM=]

  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]

Wallet options - keystore:
      --keystore <PATH>
          Use the keystore in the given folder or file
          
          [env: ETH_KEYSTORE=]

      --account <ACCOUNT_NAME>
          Use a keystore from the default keystores folder (~/.foundry/keystores) by
          its filename
          
          [env: ETH_KEYSTORE_ACCOUNT=]

      --password <PASSWORD>
          The keystore password.
          
          Used with --keystore.

      --password-file <PASSWORD_FILE>
          The keystore password file path.
          
          Used with --keystore.
          
          [env: ETH_PASSWORD=]

Wallet options - hardware wallet:
  -l, --ledger
          Use a Ledger hardware wallet

  -t, --trezor
          Use a Trezor hardware wallet

Wallet options - AWS KMS:
      --aws
          Use AWS Key Management Service
```

### cast wallet verify

Verify the signature of a message

```bash
$ cast wallet verify --help
Usage: cast wallet verify --address <ADDRESS> <MESSAGE> <SIGNATURE>

Arguments:
  <MESSAGE>    The original message
  <SIGNATURE>  The signature to verify

Options:
  -a, --address <ADDRESS>  The address of the message signer
  -h, --help               Print help
```

### cast wallet import

Import a private key into an encrypted keystore

```bash
$ cast wallet import --help
Usage: cast wallet import [OPTIONS] <ACCOUNT_NAME>

Arguments:
  <ACCOUNT_NAME>
          The name for the account in the keystore

Options:
  -k, --keystore-dir <KEYSTORE_DIR>
          If provided, keystore will be saved here instead of the default keystores
          directory (~/.foundry/keystores)

  -h, --help
          Print help (see a summary with '-h')

Wallet options - raw:
  -i, --interactive
          Open an interactive prompt to enter your private key

      --private-key <RAW_PRIVATE_KEY>
          Use the provided private key

      --mnemonic <MNEMONIC>
          Use the mnemonic phrase of mnemonic file at the specified path

      --mnemonic-passphrase <PASSPHRASE>
          Use a BIP39 passphrase for the mnemonic

      --mnemonic-derivation-path <PATH>
          The wallet derivation path.
          
          Works with both --mnemonic-path and hardware wallets.

      --mnemonic-index <INDEX>
          Use the private key from the given mnemonic index.
          
          Used with --mnemonic-path.
          
          [default: 0]
```

### cast wallet list

List all the accounts in the keystore default directory

```bash
$ cast wallet list --help
Usage: cast wallet list

Options:
  -h, --help  Print help
```

