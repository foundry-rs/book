---
description: Using the zkUsePaymaster cheatcode with approval-based paymaster contracts in foundry-zksync.
---

# Using the zkUsePaymaster Cheatcode in Approval-Based Paymaster Contracts

This example covers the use of an approval-based paymaster contract. The paymaster contract used is the testnet paymaster of ZKsync documented [here](https://docs.zksync.io/build/start-coding/quick-start/paymasters-introduction).

## Steps Overview

1. Setup and Initialization
    - Create a custom ERC20 token contract.
    - Deploy the ERC20 contract.
    - Mint tokens to the address using the paymaster.
2. Approval and Paymaster Preparation
    - Create a paymaster contract.
    - Encode the paymaster call with the required parameters.
    - Use the zkUsePaymaster cheatcode.

## Step-by-Step

Let's start by deploying the ERC20 contract and minting tokens for the account using the paymaster. The approval-based paymaster allows users to transfer ERC20 tokens to the paymaster, which pays for the transaction.

This is the code for the ERC20 contract:
```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor() ERC20("SPITTE", "SPT") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

Now, in the script, we are going to run, we deploy the contract and mint some tokens to the account that is using the paymaster:

```solidity
import {Script} from "forge-std/Script.sol";
import {console2} from "../lib/forge-std/src/console2.sol";
// We need to import the TestExt to use the zkUsePaymaster cheatcode
// as this is a ZKsync specific cheatcode
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract PaymasterApprovalScript is Script, TestExt {
    function run() external {
        vm.startBroadcast();

        MyERC20 erc20 = new MyERC20();
        erc20.mint(address(tx.origin), 10);

        vm.stopBroadcast();
    }
}
```

Next, we prepare the encoded input for the paymaster:

```solidity
// Encode the paymaster input
bytes memory paymaster_encoded_input = abi.encodeWithSelector(
    bytes4(keccak256("approvalBased(address,uint256,bytes)")), 
    address(erc20),  // ERC20 token address
    uint256(1 ether), // Approval amount
    bytes("0x")       // Additional data (empty in this case)
);
```
Here, we are encoding the paymaster input with the approvalBased method signature and the required parameters. The second parameter is the address of the recently deployed ERC20 contract, the third parameter is the amount of tokens the paymaster consumes from the user to pay for the transaction, and the last one is empty bytes. 

With the encoded input prepared, we can now use the zkUsePaymaster cheatcode to prepare the next call to be executed using the paymaster:

```solidity
// Using zkUsePaymaster with the encoded input
vmExt.zkUsePaymaster(address(0x3cB2b87D10Ac01736A65688F3e0Fb1b070B3eeA3), paymaster_encoded_input);

Counter counter = new Counter();
counter.increment();
```

The `counter.increment()` call will be executed using the paymaster we set up in the encoded input.

## Complete code
Below is the complete code for the PaymasterTestScript demonstrating all the steps:

```solidity
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// We need to import the TestExt to use the zkUsePaymaster cheatcode
// as this is a ZKsync specific cheatcode
import {TestExt} from "forge-zksync-std/TestExt.sol";


contract PaymasterTestScript is Script, TestExt {
    function run() external {
        vm.startBroadcast();

        // Deploy the ERC20 contract
        MyERC20 erc20 = new MyERC20();

        // Mint some tokens 
        erc20.mint(address(tx.origin), 10);

        // Encode the paymaster input
        bytes memory paymaster_encoded_input = abi.encodeWithSelector(
            bytes4(keccak256("approvalBased(address,uint256,bytes)")), // Function selector
            address(erc20), // ERC20 address
            uint256(1 ether), // The uint256 value
            bytes("0x") // Empty bytes "0x"
        );

        // Create a new Counter contract
        Counter counter = new Counter();

        // Use the zkUsePaymaster cheatcode to prepare the next call to be executed using the paymaster
        vm.zkUsePaymaster(address(0x3cB2b87D10Ac01736A65688F3e0Fb1b070B3eeA3), paymaster_encoded_input);

        // Increment the counter
        counter.increment();

        vm.stopBroadcast();
    }
}

contract Counter {
    uint256 public count = 0;

    function increment() public {
        count++;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

contract MyERC20 is ERC20 {
    constructor() ERC20("SPITTE", "SPT") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```