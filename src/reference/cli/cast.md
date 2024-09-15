# cast

Perform Ethereum RPC calls from the comfort of your command line

```bash
$ cast --help
Usage: cast <COMMAND>

Commands:
  4byte                  Get the function signatures for the given selector from
                         https://openchain.xyz [aliases: 4, 4b]
  4byte-decode           Decode ABI-encoded calldata using https://openchain.xyz [aliases: 4d, 4bd]
  4byte-event            Get the event signature for a given topic 0 from https://openchain.xyz
                         [aliases: 4e, 4be, topic0-event, t0e]
  abi-decode             Decode ABI-encoded input or output data [aliases: ad, --abi-decode]
  abi-encode             ABI encode the given function argument, excluding the selector [aliases:
                         ae]
  access-list            Create an access list for a transaction [aliases: ac, acl]
  address-zero           Prints the zero address [aliases: --address-zero, az]
  admin                  Fetch the EIP-1967 admin account [aliases: adm]
  age                    Get the timestamp of a block [aliases: a]
  balance                Get the balance of an account in wei [aliases: b]
  base-fee               Get the basefee of a block [aliases: ba, fee, basefee]
  bind                   Generate a rust binding from a given ABI [aliases: bi]
  block                  Get information about a block [aliases: bl]
  block-number           Get the latest block number [aliases: bn]
  call                   Perform a call on an account without publishing a transaction [aliases: c]
  calldata               ABI-encode a function with arguments [aliases: cd]
  calldata-decode        Decode ABI-encoded input data [aliases: --calldata-decode, cdd]
  chain                  Get the symbolic name of the current chain
  chain-id               Get the Ethereum chain ID [aliases: ci, cid]
  client                 Get the current client version [aliases: cl]
  code                   Get the runtime bytecode of a contract [aliases: co]
  codehash               Get the codehash for an account
  codesize               Get the runtime bytecode size of a contract [aliases: cs]
  completions            Generate shell completions script [aliases: com]
  compute-address        Compute the contract address from a given nonce and deployer address
                         [aliases: ca]
  concat-hex             Concatenate hex strings [aliases: --concat-hex, ch]
  create2                Generate a deterministic contract address using CREATE2 [aliases: c2]
  decode-eof             Decodes EOF container bytes
  decode-transaction     Decodes a raw signed EIP 2718 typed transaction [aliases: dt, decode-tx]
  disassemble            Disassembles hex encoded bytecode into individual / human readable opcodes
                         [aliases: da]
  estimate               Estimate the gas cost of a transaction [aliases: e]
  etherscan-source       Get the source code of a contract from Etherscan [aliases: et, src]
  find-block             Get the block number closest to the provided timestamp [aliases: f]
  format-bytes32-string  Formats a string into bytes32 encoding [aliases: --format-bytes32-string]
  from-bin               Convert binary data into hex data [aliases: --from-bin, from-binx, fb]
  from-fixed-point       Convert a fixed point number into an integer [aliases: --from-fix, ff]
  from-rlp               Decodes RLP hex-encoded data [aliases: --from-rlp]
  from-utf8              Convert UTF8 text to hex [aliases: --from-ascii, --from-utf8, from-ascii,
                         fu, fa]
  from-wei               Convert wei into an ETH amount [aliases: --from-wei, fw]
  gas-price              Get the current gas price [aliases: g]
  generate-fig-spec      Generate Fig autocompletion spec [aliases: fig]
  hash-message           Hash a message according to EIP-191 [aliases: --hash-message, hm]
  hash-zero              Prints the zero hash [aliases: --hash-zero, hz]
  help                   Print this message or the help of the given subcommand(s)
  implementation         Fetch the EIP-1967 implementation account [aliases: impl]
  index                  Compute the storage slot for an entry in a mapping [aliases: in]
  index-erc7201          Compute storage slots as specified by `ERC-7201: Namespaced Storage Layout`
                         [aliases: index7201, in7201]
  interface              Generate a Solidity interface from a given ABI [aliases: i]
  keccak                 Hash arbitrary data using Keccak-256 [aliases: k, keccak256]
  logs                   Get logs by signature or topic [aliases: l]
  lookup-address         Perform an ENS reverse lookup [aliases: la]
  max-int                Prints the maximum value of the given integer type [aliases: --max-int,
                         maxi]
  max-uint               Prints the maximum value of the given integer type [aliases: --max-uint,
                         maxu]
  min-int                Prints the minimum value of the given integer type [aliases: --min-int,
                         mini]
  mktx                   Build and sign a transaction [aliases: m]
  namehash               Calculate the ENS namehash of a name [aliases: na, nh]
  nonce                  Get the nonce for an account [aliases: n]
  parse-bytes32-address  Parses a checksummed address from bytes32 encoding. [aliases:
                         --parse-bytes32-address]
  parse-bytes32-string   Parses a string from bytes32 encoding [aliases: --parse-bytes32-string]
  pretty-calldata        Pretty print calldata [aliases: pc]
  proof                  Generate a storage proof for a given storage slot [aliases: pr]
  publish                Publish a raw transaction to the network [aliases: p]
  receipt                Get the transaction receipt for a transaction [aliases: re]
  resolve-name           Perform an ENS lookup [aliases: rn]
  rpc                    Perform a raw JSON-RPC request [aliases: rp]
  run                    Runs a published transaction in a local environment and prints the trace
                         [aliases: r]
  selectors              Extracts function selectors and arguments from bytecode [aliases: sel]
  send                   Sign and publish a transaction [aliases: s]
  shl                    Perform a left shifting operation
  shr                    Perform a right shifting operation
  sig                    Get the selector for a function [aliases: si]
  sig-event              Generate event signatures from event string [aliases: se]
  storage                Get the raw value of a contract's storage slot [aliases: st]
  storage-root           Get the storage root for an account [aliases: sr]
  to-ascii               Convert hex data to an ASCII string [aliases: --to-ascii, tas, 2as]
  to-base                Converts a number of one base to another [aliases: --to-base, --to-radix,
                         to-radix, tr, 2r]
  to-bytes32             Right-pads hex data to 32 bytes [aliases: --to-bytes32, tb, 2b]
  to-check-sum-address   Convert an address to a checksummed format (EIP-55) [aliases:
                         --to-checksum-address, --to-checksum, to-checksum, ta, 2a]
  to-dec                 Converts a number of one base to decimal [aliases: --to-dec, td, 2d]
  to-fixed-point         Convert an integer into a fixed point number [aliases: --to-fix, tf, 2f]
  to-hex                 Converts a number of one base to another [aliases: --to-hex, th, 2h]
  to-hexdata             Normalize the input to lowercase, 0x-prefixed hex [aliases: --to-hexdata,
                         thd, 2hd]
  to-int256              Convert a number to a hex-encoded int256 [aliases: --to-int256, ti, 2i]
  to-rlp                 RLP encodes hex data, or an array of hex data [aliases: --to-rlp]
  to-uint256             Convert a number to a hex-encoded uint256 [aliases: --to-uint256, tu, 2u]
  to-unit                Convert an ETH amount into another unit (ether, gwei or wei) [aliases:
                         --to-unit, tun, 2un]
  to-utf8                Convert hex data to a utf-8 string [aliases: --to-utf8, tu8, 2u8]
  to-wei                 Convert an ETH amount to wei [aliases: --to-wei, tw, 2w]
  tx                     Get information about a transaction [aliases: t]
  upload-signature       Upload the given signatures to https://openchain.xyz [aliases: ups]
  wallet                 Wallet management utilities [aliases: w]

Options:
  -h, --help     Print help
  -V, --version  Print version

Find more information in the book: http://book.getfoundry.sh/reference/cast/cast.html
```