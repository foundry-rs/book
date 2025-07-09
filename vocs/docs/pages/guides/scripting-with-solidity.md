---
description: Deploy contracts declaratively using Solidity scripts with simulation, broadcasting, and verification capabilities.
---

## Scripting with Solidity

Solidity scripting is a way to declaratively deploy contracts using Solidity, instead of using the more limiting and less user friendly [`forge create`](/forge/reference/forge-create).

Solidity scripts are like the scripts you write when working with tools like Hardhat; what makes Solidity scripting different is that they are written in Solidity instead of JavaScript, and they are run on the fast Foundry EVM backend, which provides advanced simulation with dry-run capabilities.

## Overview

`forge script` does not work in an asynchronous manner. First, it collects all transactions from the script, and only then does it broadcast them all. It can essentially be split into 4 phases:

1. Local Simulation - The contract script is run in a local evm. If a rpc/fork url has been provided, it will execute the script in that context. Any **external call** (not static, not internal) from a `vm.broadcast` and/or `vm.startBroadcast` will be appended to a list.
2. Onchain Simulation - Optional. If a rpc/fork url has been provided, then it will sequentially execute all the collected transactions from the previous phase here.
3. Broadcasting - Optional. If the `--broadcast` flag is provided and the previous phases have succeeded, it will broadcast the transactions collected at step `1`. and simulated at step `2`.
4. Verification - Optional. If the `--verify` flag is provided, there's an API key, and the previous phases have succeeded it will attempt to verify the contract. (eg. etherscan).

:::tip
Transactions that previously failed or timed-out can be submitted again by providing `--resume` flag.
:::

Given this flow, it's important to be aware that transactions whose behaviour can be influenced by external state/actors might have a different result than what was simulated on step `2`, e.g. front running.

## Getting started

Let's try to deploy the basic `Counter` contract Foundry provides:

```sh
forge init Counter
```

Next let's try compiling our contracts to make sure everything is in order.

```sh
forge build
```

## Deploying our contract

We are going to deploy the `Counter` contract to the Sepolia testnet but in order to do so we will need to complete a few prerequisites:

1. Get a Sepolia RPC URL.

You can either grab an RPC URL from [Chainlist](https://chainlist.org/chain/11155111) or use an RPC provider like [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/).

2. Get a one-time use private key for deploying.

```sh
`cast wallet new`
```

```
Successfully created new keypair.
Address:     <PUBLIC KEY>
Private key: <PRIVATE_KEY>
```

3. Fund the private key.

Grab some Sepolia testnet ETH, available in different faucets:

- [Proof of work faucet](https://sepolia-faucet.pk910.de/)
- [Alchemy](https://sepoliafaucet.com/)
- [Quicknode](https://faucet.quicknode.com/ethereum/sepolia)
- [Chainstack](https://faucet.chainstack.com/)

Some faucets require you to have a balance on Ethereum mainnet.

If so, claim the testnet ETH on a wallet you control and transfer the testnet ETH to your newly created deployer keypair.

4. Get a Sepolia Etherscan API key.

### Configuring `foundry.toml`

Once you have all that create a `.env` file and add the variables. Foundry automatically loads in a `.env` file present in your project directory.

The .env file should follow this format:

```sh
SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
```

We now need to edit the `foundry.toml` file. There should already be one in the root of the project.

Add the following lines to the end of the file:

```toml
[rpc_endpoints]
sepolia = "${SEPOLIA_RPC_URL}"

[etherscan]
sepolia = { key = "${ETHERSCAN_API_KEY}" }
```

This creates a [RPC alias](/reference/cheatcodes/rpc) for Sepolia and loads the Etherscan API key.

However this does not affect the `getChain` method.

### Writing the script

Next, navigate to the `script` folder and locate the `CounterScript`.

Modify the contents so it looks like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        counter = new Counter();

        vm.stopBroadcast();
    }
}
```

Now let's read through the code and figure out what it actually means and does.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
```

Remember even if it's a script it still works like a smart contract, but is never deployed, so just like any other smart contract written in Solidity the `pragma version` has to be specified.

```solidity
import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";
```

Just like we may import Forge Std to get testing utilities when writing tests, it also provides some scripting utilities.

The next line just imports the `Counter` contract.

```solidity
contract CounterScript is Script {
```

We have created a contract called `CounterScript` and it inherits `Script` from Forge Std.

```solidity
function run() external {
```

By default, scripts are executed by calling the function named `run`, our entrypoint.

This loads in the private key from our `.env` file. **Note:** you must be careful when exposing private keys in a `.env` file and loading them into programs. This is only recommended for use with non-privileged deployers or for local / test setups. For production setups please review the various [wallet options](/forge/reference/forge-script#wallet-options---raw) that Foundry supports.

```solidity
vm.startBroadcast();
```

This is a special cheatcode that records calls and contract creations made by our main script contract. The private key of the sender we will pass in will instruct it to use that key for signing the transactions. Later, we will broadcast these transactions to deploy our `Counter` contract.

```solidity
Counter counter = new Counter();
```

Here we have just created our `Counter` contract. Because we called `vm.startBroadcast()` before this line, the contract creation will be recorded by Forge, and as mentioned previously, we can broadcast the transaction to deploy the contract on-chain. The broadcast transaction logs will be stored in the `broadcast` directory by default. You can change the logs location by setting [`broadcast`](/config/reference/project#broadcast) in your `foundry.toml` file.

The broadcasting sender is determined by checking the following in order:

1. If `--sender` argument was provided, that address is used.
2. If exactly one signer (e.g. private key, hardware wallet, keystore) is set, that signer is used.
3. Otherwise, the default Foundry sender (`0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`) is attempted to be used.

Now that you're up to speed about what the script smart contract does, let's run it.

### Deploying to a testnet

You should have added the variables we mentioned earlier to the `.env` for this next part to work.

At the root of the project run:

```sh
# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script --chain sepolia script/Counter.s.sol:CounterScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv --interactives 1
```

Note the `--interactives 1`, this will open an interactive prompt to enter your private key. For anything beyond a simple testnet deployment in a development setting you are **STRONGLY** [recommended to use a hardware wallet or a password protected keystore](/guides/best-practices/key-management).

```
Enter private key: <PRIVATE_KEY>
```

Forge is going to run our script and broadcast the transactions for us - this can take a little while, since Forge will also wait for the transaction receipts. You should see something like this after a minute or so:

```
[⠊] Compiling...
No files changed, compilation skipped
Enter private key:
Traces:
  [137029] CounterScript::run()
    ├─ [0] VM::startBroadcast()
    │   └─ ← [Return]
    ├─ [96345] → new Counter@<ADDRESS>
    │   └─ ← [Return] 481 bytes of code
    ├─ [0] VM::stopBroadcast()
    │   └─ ← [Return]
    └─ ← [Stop]


Script ran successfully.

## Setting up 1 EVM.
==========================
Simulated On-chain Traces:

  [96345] → new Counter@<ADDRESS>
    └─ ← [Return] 481 bytes of code


==========================

Chain 11155111

Estimated gas price: <GAS_PRICE> gwei

Estimated total gas used for script: <GAS>

Estimated amount required: <GAS_AMOUNT> ETH

==========================

##### sepolia
✅  [Success] Hash: <HASH>
Contract Address: <ADDRESS>
Block: <BLOCK>
Paid: <GAS>

✅ Sequence #1 on sepolia | Total Paid: <GAS>


==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
##
Start verification for (1) contracts
Start verifying contract `<ADDRESS>` deployed on sepolia
Compiler version: 0.8.28

Submitting verification for [src/Counter.sol:Counter] <ADDRESS>.
Submitted contract for verification:
	Response: `OK`
	GUID: `<GUID>`
	URL: https://sepolia.etherscan.io/address/<ADDRESS>
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Warning: Verification is still pending...; waiting 15 seconds before trying again (7 tries remaining)
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
All (1) contracts were verified!

Transactions saved to: /home/user/counter/broadcast/Counter.s.sol/11155111/run-latest.json

Sensitive values saved to: /home/user/counter/cache/Counter.s.sol/11155111/run-latest.json
```

This confirms that you have successfully deployed the `Counter` contract to the Sepolia testnet and have also verified it on Etherscan, all with one command.

### Deploying to a local Anvil instance

You can deploy to Anvil, the local testnet, by configuring the `--fork-url`.

Let's start Anvil in one terminal window:

```sh
anvil
```

This will show you are list of default accounts.

```
Available Accounts
==================

(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000.000000000000000000 ETH)
...

Private Keys
==================

(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

Then run the following script in a different terminal window:

```sh
forge script script/Counter.s.sol:CounterScript --fork-url http://localhost:8545 --broadcast --interactives 1
```

Next enter the private key, pick one from the list.

```
Enter private key: <PRIVATE_KEY>
```

```
[⠊] Compiling...
No files changed, compilation skipped
Enter private key:
Script ran successfully.

## Setting up 1 EVM.

==========================

Chain 31337

Estimated gas price: 2.000000001 gwei

Estimated total gas used for script: 203856

Estimated amount required: 0.000407712000203856 ETH

==========================

##### anvil-hardhat
✅  [Success] Hash: 0x6795deaad7fd483eda4b16af7d8b871c7f6e49beb50709ce1cf0ca81c29247d1
Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Block: 1
Paid: 0.000156813000156813 ETH (156813 gas * 1.000000001 gwei)

✅ Sequence #1 on anvil-hardhat | Total Paid: 0.000156813000156813 ETH (156813 gas * avg 1.000000001 gwei)


==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.

Transactions saved to: /home/user/counter/broadcast/Counter.s.sol/31337/run-latest.json

Sensitive values saved to: /home/user/counter/cache/Counter.s.sol/31337/run-latest.json
```
