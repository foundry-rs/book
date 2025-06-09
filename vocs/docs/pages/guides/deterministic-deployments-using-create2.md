---
description: Deploy smart contracts to predictable addresses across multiple networks using CREATE2 opcode for counterfactual interactions.
---

## Deterministic deployments using `CREATE2`

Enshrined into the EVM as part of the [Constantinople fork](https://ethereum.org/en/history/#constantinople) of 2019, `CREATE2` is an opcode that started its journey as [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014).
`CREATE2` allows you to deploy smart contracts to deterministic addresses, based on parameters controlled by the deployer.

As a result, it's often mentioned as enabling "counterfactual" deployments, where you can interact with an addresses that haven't been created yet because `CREATE2` guarantees known code can be placed at that address.

This is in contrast to the `CREATE` opcode, where the address of the deployed contract is a function of the deployer's nonce.
With `CREATE2`, you can use the same deployer account to deploy contracts to the same address across multiple networks, even if the address has varying nonces.

For the best user experience it is recommended to avoid having different addresses of the same deployment across different EVM chains.

## Getting started

> ℹ️ **Note**
>
> This guide is intended to help you get started with configuring deterministic deployments using `CREATE2`.
> By default, `new Counter{salt: salt}()` will use the deterministic deployer at [`0x4e59b44847b379578588920ca78fbf26c0b4956c`](https://github.com/Arachnid/deterministic-deployment-proxy). Note that the deployer may not be available on all EVM chains.
> A different deployer address can be configured by setting `create2_deployer` in `foundry.toml` or by using `--create2-deployer` argument.

## Configuring your `foundry.toml`

In order to reliably deploy to deterministic addresses we will need to make sure our bytecode stays the same. To do so configure our `foundry.toml` as follows:

```toml
[profile.default]
solc = "<SOLC_VERSION>"
evm_version = "<EVM_VERSION>"
bytecode_hash = "none"
cbor_metadata = false
```

### Solc version

It is required to pin your `solc` (Solidity) version. It is generally recommended to use a recent version or, if preferred, the latest version.

### EVM version

Next, configure your `evm_version`. It is generally recommended to use the most recent hardfork but depending on your deployment targets this may need to use an older hardfork due to opcode incompatibilities.

### Metadata and bytecode

By default the Solidity compiler appends the hash of the metadata file at end of the bytecode. This bytecode includes things like the compiler version and the ABI.

Since the source file hashes are included in the metadata file, even if a single byte of source files changes, the metadata hash changes too. That means, if we can compile a contract with given source files and the bytecode + the appended metadata hash are exactly the same as an on-chain contract, we can be sure that this is a byte-by-byte match of the same source files and the same compilation settings.

The metadata file may look something like this:

```json
{
  "compiler": {
    "version": "0.8.28+commit.7893614a"
  },
  "language": "Solidity",
  "output": {
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "increment"
      },
      {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "number",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "newNumber",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "setNumber"
      }
    ],
    "devdoc": {
      "kind": "dev",
      "methods": {},
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    }
  },
  "settings": {
    "remappings": ["forge-std/=lib/forge-std/src/"],
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "compilationTarget": {
      "src/Counter.sol": "Counter"
    },
    "evmVersion": "cancun",
    "libraries": {}
  },
  "sources": {
    "src/Counter.sol": {
      "keccak256": "0x09277f949d59a9521708c870dc39c2c434ad8f86a5472efda6a732ef728c0053",
      "urls": [
        "bzz-raw://94cd5258357da018bf911aeda60ed9f5b130dce27445669ee200313cd3389200",
        "dweb:/ipfs/QmNbEfWAqXCtfQpk6u7TpGa8sTHXFLpUz7uebz2FVbchSC"
      ],
      "license": "UNLICENSED"
    }
  },
  "version": 1
}
```

Click [here](https://playground.sourcify.dev/) to learn more about the metadata file.

By disabling the metadata as follows:

```toml
bytecode_hash = "none"
cbor_metadata = false
```

You are not including the metadata hash as part of the bytecode. This means that whilst your bytecode can now be deterministic you won't be able to have a [`full match`](https://docs.sourcify.dev/docs/full-vs-partial-match/#full-perfect-matches), only a [`partial match`](https://docs.sourcify.dev/docs/full-vs-partial-match/#partial-matches) when verifying your contracts. Depending on your requirements this may be acceptable.

### Optimizer

If you are enabling the `optimizer` make sure your `optimizer_runs` stay consistent.

### Create2 factory

By default, your contracts won't use the default (or specified using the `create2_deployer` configuration) create2 factory and will default to executing the create2 opcode from the contract it's executed on. For example, this behavior occurs when running tests or executing scripts without a private key.

You can use the following configuration:

```toml
always_use_create_2_factory = true
```

If you wish to always use the create2 factory. This comes handy if you wish to use the create2 factory deployment addresses in your tests for example.

## Deploying the contract

When using Solidity's default `CREATE` where the new address of a contract is determined by taking the `hash` of the `sender`'s address and the `sender`'s `nonce`:

```
new_contract_address = keccak256(rlp_encode([sender, nonce]))[12:]
```

```solidity
// Using the default CREATE opcode
Counter counter = new Counter();
```

Because the `nonce` can only be used a single time it on each chain it is an unreliable way of deploying to the same contract address.

Instead let's use `CREATE2`'s `salt` parameter.

The `salt` parameter in `CREATE2` is a key component that determines the final deployed contract address. It allows for flexibility and uniqueness in deterministic deployments. The address of the deployed contract is derived using the following formula:

```
new_contract_address = keccak256(0xff ++ deployer ++ salt ++ keccak256(init_code))
```

```solidity
// Passing the `salt` parameter to the CREATE2 opcode
Counter counter = new Counter{salt: salt}();
```

- `0xff` is a fixed prefix ensuring uniqueness.
- `deployer` is the address executing the CREATE2 operation.
- `salt` is a 32-byte value chosen by the deployer.
- `keccak256(bytecode)` is the hash of the contract's creation bytecode.

Given that `0xff` is fixed, the `deployer` is a deterministic deployer ([0x4e59b44847b379578588920ca78fbf26c0b4956c](https://github.com/Arachnid/deterministic-deployment-proxy)) and our bytecode is fixed we can use the `salt` parameter to fully control our new contract address.

## Additional resources

- [Contract Metadata](https://docs.soliditylang.org/en/latest/metadata.html)
- [Deterministic deployments agnostic to the initialization code](https://github.com/Vectorized/solady/blob/main/src/utils/CREATE3.sol)
