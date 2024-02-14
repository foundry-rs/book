## Deploying

Spark can deploy smart contracts to a given network with the [`spark create`](../reference/spark/spark-create.md) command.

Spark can deploy only one contract at a time.

To deploy a contract, you must provide a RPC URL (env: `ETH_RPC_URL`) and the private key of the account that will deploy the contract.

To deploy `MyContract` to a network:

```sh
$ spark create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract
compiling...
success.
Deployer: 0xa735b3c25f...
Deployed to: 0x4054415432...
Transaction hash: 0x6b4e0ff93a...
```

Solidity files may contain multiple contracts. `:MyContract` above specifies which contract to deploy from the `src/MyContract.sol` file.

Use the `--constructor-args` flag to pass arguments to the constructor:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {ERC20} from "solmate/tokens/ERC20.sol";

contract MyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) ERC20(name, symbol, decimals) {
        _mint(msg.sender, initialSupply);
    }
}
```

Additionally, we can tell Spark to verify our contract on Etherscan, Sourcify or Blockscout, if the network is supported, by passing `--verify`.

```sh
$ spark create --rpc-url <your_rpc_url> \
    --constructor-args "SparkUSD" "FUSD" 18 1000000000000000000000 \
    --private-key <your_private_key> \
    --etherscan-api-key <your_etherscan_api_key> \
    --verify \
    src/MyToken.sol:MyToken
```

## Verifying a pre-existing contract

It is recommended to use the `--verify` flag with `spark create` to automatically verify the contract on explorer after a deployment.
Note that for Etherscan [`ETHERSCAN_API_KEY`](../reference/config/etherscan.md#etherscan_api_key) must be set.

If you are verifying an already deployed contract, read on.

You can verify a contract on Etherscan, Sourcify or Blockscout with the [`spark verify-contract`](../reference/spark/spark-verify-contract.md) command.

You must provide:
- the contract address
- the contract name or the path to the contract `<path>:<contractname>`
- your Etherscan API key (env: `ETHERSCAN_API_KEY`) (if verifying on Etherscan).

Moreover, you may need to provide:
- the constructor arguments in the ABI-encoded format, if there are any
- [compiler version](https://etherscan.io/solcversions) used for build, with 8 hex digits from the commit version prefix (the commit will usually not be a nightly build). It is auto-detected if not specified.
- the number of optimizations, if the Solidity optimizer was activated.  It is auto-detected if not specified.
- the [chain ID](https://evm-chainlist.netlify.app/), if the contract is not on Ethereum Mainnet

Let's say you want to verify `MyToken` (see above). You set the [number of optimizations](../reference/config/solidity-compiler.md#optimizer_runs) to 1 million, compiled it with v0.8.10, and deployed it, as shown above, to the Sepolia testnet (chain ID: 11155111). Note that `--num-of-optimizations` will default to 0 if not set on verification, while it defaults to 200 if not set on deployment, so make sure you pass `--num-of-optimizations 200` if you left the default compilation settings. 

Here's how to verify it:

```bash
spark verify-contract \
    --chain-id 11155111 \
    --num-of-optimizations 1000000 \
    --watch \
    --constructor-args $(probe abi-encode "constructor(string,string,uint256,uint256)" "SparkUSD" "FUSD" 18 1000000000000000000000) \
    --etherscan-api-key <your_etherscan_api_key> \
    --compiler-version v0.8.10+commit.fc410830 \
    <the_contract_address> \
    src/MyToken.sol:MyToken 

Submitted contract for verification:
                Response: `OK`
                GUID: `a6yrbjp5prvakia6bqp5qdacczyfhkyi5j1r6qbds1js41ak1a`
                url: https://sepolia.etherscan.io//address/0x6a54…3a4c#code
```

It is recommended to use the [`--watch`](../reference/spark/spark-verify-contract.md#verify-contract-options) flag along
with `verify-contract` command in order to poll for the verification result.

If the `--watch` flag was not supplied, you can check
the verification status with the [`spark verify-check`](../reference/spark/spark-verify-check.md) command:

```bash
$ spark verify-check --chain-id 11155111 <GUID> <your_etherscan_api_key>
Contract successfully verified.
```

<br>

> 💡 **Tip**
> 
> Use Probe's [`abi-encode`](../reference/probe/probe-abi-encode.md) to ABI-encode arguments.
>
> In this example, we ran `probe abi-encode "constructor(string,string,uint8,uint256)" "SparkUSD" "FUSD" 18 1000000000000000000000` to ABI-encode the arguments.

<br>

### Troubleshooting

##### `Invalid character 'x' at position 1`

Make sure the private key string does not begin with `0x`.

##### `EIP-1559 not activated`
EIP-1559 is not supported or not activated on the RPC server. Pass the `--legacy` flag to use legacy transactions instead of the EIP-1559 ones. If you do development in a local environment, you can use Hardhat instead of Ganache.

##### `Failed to parse tokens`
Make sure the passed arguments are of correct type.

##### `Signature error`
Make sure the private key is correct.

##### `Compiler version commit for verify`
If you want to check the exact commit you are running locally, try: ` ~/.svm/0.x.y/solc-0.x.y --version` where `x` and
`y` are major and minor version numbers respectively.  The output of this will be something like:

```ignore
solc, the solidity compiler commandline interface
Version: 0.8.12+commit.f00d7308.Darwin.appleclang
```

Note: You cannot just paste the entire string "0.8.12+commit.f00d7308.Darwin.appleclang" as the argument for the compiler-version.  But you can use the 8 hex digits of the commit to look up exactly what you should copy and paste from [compiler version](https://etherscan.io/solcversions).

### Known Issues

#### Verifying Contracts With Ambiguous Import Paths

Spark passes source directories (`src`, `lib`, `test` etc) as `--include-path` arguments to the compiler.
This means that given the following project tree
```text
|- src
|-- folder
|--- Contract.sol
|--- IContract.sol
```
it is possible to import `IContract` inside the `Contract.sol` using `folder/IContract.sol` import path.

Etherscan is not able to recompile such sources. Consider changing the imports to use relative import path.

#### Verifying Contracts With No Bytecode Hash

Currently, it's not possible to verify contracts on Etherscan with [`bytecode_hash`](../reference/config/solidity-compiler.md#bytecode_hash)
set to `none`.
Click [here](https://docs.soliditylang.org/en/v0.8.13/metadata.html#usage-for-source-code-verification) to learn more about
how metadata hash is used for source code verification. 
