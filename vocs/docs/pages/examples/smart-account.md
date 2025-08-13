---
description: Configuration and deployment of multisig smart accounts in foundry-zksync.
---

# Smart Account Example

This example demonstrates the configuration and deployment of a multisig smart account on ZKsync.

## Overview

Smart accounts on ZKsync provide enhanced functionality beyond traditional externally owned accounts (EOAs). This example covers:

- Setting up a multisig smart account
- Configuring multiple signers
- Deploying the account contract
- Performing transactions through the smart account

## Implementation

```solidity
// Example smart account implementation
contract MultiSigAccount {
    mapping(address => bool) public isOwner;
    uint256 public required;
    uint256 public ownerCount;
    
    constructor(address[] memory _owners, uint256 _required) {
        require(_required > 0 && _required <= _owners.length, "Invalid required number");
        
        for (uint256 i = 0; i < _owners.length; i++) {
            require(_owners[i] != address(0), "Invalid owner");
            isOwner[_owners[i]] = true;
        }
        
        ownerCount = _owners.length;
        required = _required;
    }
    
    // Additional smart account logic...
}
```

## Deployment Script

```solidity
import {Script} from "forge-std/Script.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract DeploySmartAccount is Script, TestExt {
    function run() external {
        vm.startBroadcast();
        
        address[] memory owners = new address[](3);
        owners[0] = address(0x1234...);
        owners[1] = address(0x5678...);
        owners[2] = address(0x9abc...);
        
        MultiSigAccount account = new MultiSigAccount(owners, 2);
        
        vm.stopBroadcast();
    }
}
```

This example shows how to deploy and configure a multisig smart account that requires 2 out of 3 signatures for transactions.