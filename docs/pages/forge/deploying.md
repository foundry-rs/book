---
description: Deploy smart contracts to any network using forge create or Solidity scripting with automatic verification support.
---

## Deploying

Forge can deploy smart contracts to a given network with the [`forge create`](/forge/reference/create) command.

Forge CLI can deploy only one contract at a time.

For deploying and verifying multiple smart contracts on multiple chains in one go, Forge's [Solidity scripting](/guides/scripting-with-solidity) would be the more efficient approach.

To deploy a contract, you must provide a RPC URL (env: `ETH_RPC_URL`) and the private key of the account that will deploy the contract. Additionally the `--broadcast` flag is responsible for publishing your transaction to the network as a safety precaution and mirrors the `--broadcast` flag of `forge script`. If you do not pass the `--broadcast` flag your transaction is a dry-run.

To deploy `MyContract` to a network:

```sh
forge create src/MyContract.sol:MyContract --rpc-url <YOUR_RPC_URL> --private-key <YOUR_PRIVATE_KEY> --broadcast
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

Additionally, we can tell Forge to verify our contract on Etherscan, Sourcify or Blockscout, if the network is supported, by passing `--verify`.

```sh
forge create src/MyToken.sol:MyToken --rpc-url <YOUR_RPC_URL> \
    --private-key <YOUR_PRIVATE_KEY> \
    --broadcast \
    --etherscan-api-key <YOUR_ETHERSCAN_API_KEY> \
    --verify \
    --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000
```

## Multi-chain deployments

Deploying and verifying multiple smart contracts on multiple chains in one go is possible by using forking cheatcodes.

For example, if you want to deploy a `Counter` contract on Sepolia Mainnet and Base Sepolia using a single command, you can configure RPC endpoints and verifiers as:

```toml
[rpc_endpoints]
sepolia = "${SEPOLIA_URL}"
base-sepolia = "${BASE_SEPOLIA_URL}"

[etherscan]
sepolia = { key = "${ETHERSCAN_API_KEY}" }
base-sepolia = { key = "${ETHERSCAN_API_KEY}" }
```

and create a `CounterScript` script as:

```solidity
contract CounterScript is Script {
    function run() public {
        vm.createSelectFork("sepolia");
        vm.startBroadcast();
        new Counter();
        vm.stopBroadcast();

        vm.createSelectFork("base-sepolia");
        vm.startBroadcast();
        new Counter();
        vm.stopBroadcast();
    }
}
```

When running:

```sh
forge script script/CounterScript.s.sol --slow --multi --broadcast --private-key <YOUR_PRIVATE_KEY> --verify
```

The script will create the Sepolia Mainnet fork (`vm.createSelectFork("sepolia")`), deploy and verify the `Counter` contract, and then move to Base Sepolia chain deployment (`vm.createSelectFork("base-sepolia")`).

For a list of all available forking cheatcodes see [`forking`](/reference/cheatcodes/forking) docs.

## Verifying a pre-existing contract

It is recommended to use the `--verify` flag with `forge create` to automatically verify the contract on explorer after a deployment.
Note that for Etherscan [`ETHERSCAN_API_KEY`](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics) must be set.

If you are verifying an already deployed contract, read on.

You can verify a contract on Etherscan, Sourcify, oklink or Blockscout with the [`forge verify-contract`](/forge/reference/verify-contract) command.

You must provide:

- the contract address
- the contract name or the path to the contract `<path>:<contractname>`
- your Etherscan API key (env: `ETHERSCAN_API_KEY`) (if verifying on Etherscan or similar explorers e.g. BscScan / BaseScan / Polygonscan).

Moreover, you may need to provide:

- the constructor arguments in the ABI-encoded format, if there are any
- external linked libraries in `src_file_path:library_name:library_address` format, if there are any
- [compiler version](https://etherscan.io/solcversions) used for build, with 8 hex digits from the commit version prefix (the commit will usually not be a nightly build). It is auto-detected if not specified.
- the number of optimizations, if the Solidity optimizer was activated. It is auto-detected if not specified.
- the [chain ID](https://evm-chainlist.netlify.app/), if the contract is not on Ethereum Mainnet

Let's say you want to verify `MyToken` (see above). You set the [number of optimizations](/config/reference/solidity-compiler#optimizer_runs) to 1 million, compiled it with v0.8.10, and deployed it, as shown above, to the Sepolia testnet (chain ID: 11155111). Note that `--num-of-optimizations` will default to 0 if not set on verification, while it defaults to 200 if not set on deployment, so make sure you pass `--num-of-optimizations 200` if you left the default compilation settings.

Here's how to verify it:

```bash
forge verify-contract \
    --chain-id 11155111 \
    --num-of-optimizations 1000000 \
    --watch \
    --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000) \
    --verifier etherscan \
    --etherscan-api-key <your_etherscan_api_key> \
    --compiler-version v0.8.10+commit.fc410830 \
    <CONTRACT_ADDRESS> \
    src/MyToken.sol:MyToken

Submitted contract for verification:
                Response: `OK`
                GUID: `a6yrbjp5prvakia6bqp5qdacczyfhkyi5j1r6qbds1js41ak1a`
                url: https://sepolia.etherscan.io//address/0x6a54…3a4c#code
```

> ℹ️ **Note:**
>
> External libraries can be specified with `--libraries` argument, one for each linked library. For example, to verify a contract with two linked libraries (`Maths` and `Utils`) the `forge verify-command` should be run with
>
> ```bash
> --libraries src/lib/Maths.sol:Maths:<maths_lib_address> \
> --libraries src/lib/Utils.sol:Utils:<utils_lib_address>
> ```
>
> arguments.

It is recommended to use the [`--watch`](/forge/reference/verify-contract#verify-contract-options) flag along
with `verify-contract` command in order to poll for the verification result.

If the `--watch` flag was not supplied, you can check
the verification status with the [`forge verify-check`](/forge/reference/verify-check) command:

```bash
forge verify-check --chain-id 11155111 <GUID> <YOUR_ETHERSCAN_API_KEY>
Contract successfully verified.
```

<br></br>

> 💡 **Tip**
>
> Use Cast's [`abi-encode`](/cast/reference/abi-encode) to ABI-encode arguments.
>
> In this example, we ran `cast abi-encode "constructor(string,string,uint8,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000` to ABI-encode the arguments.

<br></br>

### Troubleshooting

##### `missing hex prefix ("0x") for hex string`

Make sure the private key string begins with `0x`.

##### `EIP-1559 not activated`

EIP-1559 is not supported or not activated on the RPC server. Pass the `--legacy` flag to use legacy transactions instead of the EIP-1559 ones. If you do development in a local environment, you can use Hardhat instead of Ganache.

##### `Failed to parse tokens`

Make sure the passed arguments are of correct type.

##### `Signature error`

Make sure the private key is correct.

##### `Compiler version commit for verify`

If you want to check the exact commit you are running locally, try: ` ~/.svm/0.x.y/solc-0.x.y --version` where `x` and
`y` are major and minor version numbers respectively. The output of this will be something like:

```bash
solc, the solidity compiler commandline interface
Version: 0.8.12+commit.f00d7308.Darwin.appleclang
```

Note: You cannot just paste the entire string "0.8.12+commit.f00d7308.Darwin.appleclang" as the argument for the compiler-version. But you can use the 8 hex digits of the commit to look up exactly what you should copy and paste from [compiler version](https://etherscan.io/solcversions).

##### `Invalid API Key`

With [Etherscan API V2](https://docs.etherscan.io/etherscan-v2), only Etherscan keys are valid, this can be used for similar explorers eg BscScan/BaseScan/Polygonscan. Legacy keys from other explorers have been deprecated.

### Known Issues

#### Verifying Contracts With Ambiguous Import Paths

Forge passes source directories (`src`, `lib`, `test` etc) as `--include-path` arguments to the compiler.
This means that given the following project tree

```text
|- src
|-- folder
|--- Contract.sol
|--- IContract.sol
```

it is possible to import `IContract` inside the `Contract.sol` using `folder/IContract.sol` import path.

Etherscan is not able to recompile such sources. Consider changing the imports to use relative import path.
