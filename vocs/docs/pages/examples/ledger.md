---
description: Using a Ledger hardware wallet to interact with ZKsync network through foundry-zksync.
---

# Ledger Integration Example

This example demonstrates how to use a Ledger hardware wallet to interact with the ZKsync network through foundry-zksync.

## Prerequisites

- Ledger hardware wallet
- Ledger Live application installed
- Ethereum app installed on Ledger device
- USB connection to computer

## Setup

1. Connect your Ledger device
2. Open the Ethereum app on the Ledger
3. Ensure the device is unlocked

## Script Configuration

```solidity
import {Script} from "forge-std/Script.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract LedgerScript is Script, TestExt {
    function run() external {
        // Use Ledger for transaction signing
        vm.startBroadcast();
        
        // Deploy a simple contract
        Counter counter = new Counter();
        
        // Interact with the contract
        counter.increment();
        
        vm.stopBroadcast();
    }
}
```

## Running with Ledger

To run a script using your Ledger device:

```bash
forge script LedgerScript --rpc-url $ZKSYNC_RPC_URL --ledger --zksync
```

## Important Notes

- Ensure your Ledger device is connected and unlocked
- The Ethereum app must be open on the device
- Transactions will require manual confirmation on the Ledger
- ZKsync transactions are supported through the Ethereum app

## Troubleshooting

- If the device is not detected, check USB connection
- Ensure Ledger Live is closed when using with foundry
- Verify the Ethereum app is the latest version