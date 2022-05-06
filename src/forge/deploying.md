## Deploying

Forge can deploy smart contracts to a given network with the [`forge create`](../reference/forge/forge-create.md) command.

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
$ forge create --rpc-url <your_rpc_url> \
    --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 \
    --private-key <your_private_key> src/MyToken.sol:MyToken
```

## Verifying

You can verify a contract on Etherscan with the [`forge verify-contract`](../reference/forge/forge-verify-contract.md) command.

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
$ forge verify-contract --chain-id 42 --num-of-optimizations 1000000 --constructor-args \ 
    (cast abi-encode "constructor(string,string,uint256,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000) \
    --compiler-version v0.8.10+commit.fc410830 <the_contract_address> src/MyToken.sol:MyToken <your_etherscan_api_key>

Submitted contract for verification:
                Response: `OK`
                GUID: `a6yrbjp5prvakia6bqp5qdacczyfhkyi5j1r6qbds1js41ak1a`
                url: https://kovan.etherscan.io//address/0x6a54…3a4c#code
```

You can check verification status with the [`forge verify-check`](../reference/forge/forge-verify-check.md) command:

```bash
$ forge verify-check --chain-id 42 <GUID> <your_etherscan_api_key>
Contract successfully verified.
```

<br>

> 💡 **Tip**
> 
> Use Cast's [`abi-encode`](../reference/cast/cast-abi-encode.md) to ABI-encode arguments.
>
> In this example, we ran `cast abi-encode "constructor(string,string,uint8,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000` to ABI-encode the arguments.

<br>

# Semi-automated deployment approach

Running the above three commands manually each time can be bothersome and can lead to input errors. To relieve oneself of such frustation, one can utlise a Makefile.

Create a file in your project root called 'Makefile'. There is no file extension.

Populate the file with your forge deployment commands, like so:

```bash
# include .env file and export its env vars (-include to ignore error if it does not exist)
-include .env

deploy-wmd:
	forge create src/WMDToken.sol:WMDToken --private-key ${PRIVATE_KEY_EDGE} --rpc-url ${RINKEBY_RPC_URL}

verify-wmd:
	forge verify-contract --chain-id ${RINKEBY_CHAINID} --compiler-version v0.8.13+commit.abaa5c0e ${WMD_CONTRACT_ADDRESS} src/WMDToken.sol:WMDToken ${ETHERSCAN_API_KEY} --num-of-optimizations 200 --flatten
	
verify-check-wmd:
	forge verify-check --chain-id ${RINKEBY_CHAINID} ${WMD_GUID} ${ETHERSCAN_API_KEY}
```

Makefile will reference the .env file, that should exist in the project root, for env variables, e.g. ${RINKEBY_RPC_URL}.


### Application
To deploy the WMDToken.sol contract, run `make deploy-wmd` in terminal.

Output:
```bash
 $ make deploy
 > forge create src/WMDToken.sol:WMDToken --private-key 0x122...56789 --rpc-url https://rinkeby.infura.io/v3/8f4d69691d4a4636acb00ec3c933291b
```
Now you will only need to run:
1. make deploy
2. make verify
3. make verify-check

**User is freed from repeatedly crafting long statements - particularly for multiple deployments consisting of multiple contracts!**


### Updating the .env file
```bash
export PRIVATE_KEY_EDGE = 0x57979d527794c1adbe2dc140d0aad4f1adada194aba46b5175a395fe71887c25
export ETHERSCAN_API_KEY = I5CK8CJ7FZ6BWQ6YGFD4U3E7CFTNWQJ3A3

//Chain info
export RINKEBY_CHAINID = 4
export RINKEBY_RPC_URL = https://rinkeby.infura.io/v3/8f4d69691d4a4636acb00ec3c933291b

// Token Deployment
export WMD_CONTRACT = src/WMDToken.sol:WMDToken
export WMD_CONTRACT_ADDRESS = 0x944403ee436a6dff974983a2fa84ff37c587bad1
export WMD_GUID = 62h8tg2r61vcusbzcva8q53bus2ixmyr7apkt24hk3uzwai7nz
```
Please note that as part of the deployment-verification flow, you will have to manually update the following in the .env file:
1. Deployment address
2. GUID
 
> Be sure to update the contract address and GUID values in .env for each sepereate deployment, as they would change. 

#### Installing make on Windows:
https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows

---

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

