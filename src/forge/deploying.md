## Deploying

Forge can deploy smart contracts to a given network with the `forge create` command.

Forge can deploy only one contract at a time.

To deploy a contract, you must provide a RPC URL (env: `ETH_RPC_URL`) and the private key of the account that will deploy the contract.

To deploy `MyContract` to a network:

```sh
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract
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

```sh
$ forge create --rpc-url <your_rpc_url> --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 --private-key <your_private_key> src/MyToken.sol:MyToken
```

## Verifying

You can verify a contract on Etherscan with the `forge verify-contract` command.

You must provide:
- [compiler version](https://etherscan.io/solcversions) used for build, with 8 hex digits from the commit version prefix (the commit will usually not be a nightly build)
- the contract address
- the path to the contract `<path>:<contractname>`
- your Etherscan API key (env: `ETHERSCAN_API_KEY`).

Moreover, you may need to provide:
- the constructor arguments in the ABI-encoded format, if there are any
- the number of optimizations, if the Solidity optimizer was activated
- the [chain ID](https://evm-chainlist.netlify.app/), if the contract is not on Ethereum Mainnet

Let's say you want to verify `MyToken` (see above). You set the [number of optimizations](../reference/config.md#optimizer_runs) to 1 million, compiled it with v0.8.10, and deployed it, as shown above, to the Kovan testnet (chain ID: 42). Note that `--num-of-optimizations` will default to 0 if not set on verification, while it defaults to 200 if not set on deployment, so make sure you pass `--num-of-optimizations 200` if you left the default compilation settings. 

Here's how to verify it:

```bash
$ forge verify-contract --chain-id 42 --num-of-optimizations 1000000 --constructor-args 000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000003635c9adc5dea000000000000000000000000000000000000000000000000000000000000000000008466f72676555534400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044655534400000000000000000000000000000000000000000000000000000000 --compiler-version v0.8.10+commit.fc410830 <the_contract_address> src/MyToken.sol:MyToken <your_etherscan_api_key>
Submitted contract for verification:
                Response: `OK`
                GUID: `a6yrbjp5prvakia6bqp5qdacczyfhkyi5j1r6qbds1js41ak1a`
                url: https://kovan.etherscan.io//address/0x6a54…3a4c#code
```

You can check verification status with the `forge verify-check` command:

```bash
$ forge verify-check --chain-id 42 <GUID> <your_etherscan_api_key>
Contract successfully verified.
```

<br>

> 💡 **Tip**
> 
> Use Cast's [`abi-encode`](../reference/cast.md#abi-encode) to ABI-encode arguments.
>
> In this example, we ran `cast abi-encode "constructor(string,string,uint8,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000` to ABI-encode the arguments.

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

