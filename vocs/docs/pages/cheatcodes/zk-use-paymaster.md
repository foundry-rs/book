---
description: zkUsePaymaster cheatcode for enabling paymaster usage in the next transaction.
---

# zkUsePaymaster

```solidity
function zkUsePaymaster(address paymaster, bytes calldata paymaster_input) external pure;
```

## Description

Enables the use of a paymaster for the next transaction. The paymaster will pay for the gas costs of the subsequent operation.

## Parameters

- `paymaster`: The address of the paymaster contract
- `paymaster_input`: Encoded input data for the paymaster contract

## Examples

### General Flow Paymaster

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract PaymasterTest is Test, TestExt {
    function testGeneralPaymaster() public {
        address paymasterAddress = 0x1234...;
        
        // Encode paymaster input for general flow
        bytes memory paymasterInput = abi.encodeWithSelector(
            bytes4(keccak256("general(bytes)")),
            bytes("0x")
        );
        
        // Enable paymaster for next transaction
        vmExt.zkUsePaymaster(paymasterAddress, paymasterInput);
        
        // This deployment will be paid by the paymaster
        MyContract contract1 = new MyContract();
    }
}
```

### Approval-Based Paymaster

```solidity
function testApprovalBasedPaymaster() public {
    address paymasterAddress = 0x3cB2b87D10Ac01736A65688F3e0Fb1b070B3eeA3;
    address tokenAddress = 0x5678...;
    
    // Encode paymaster input for approval-based flow
    bytes memory paymasterInput = abi.encodeWithSelector(
        bytes4(keccak256("approvalBased(address,uint256,bytes)")),
        tokenAddress,     // ERC20 token address
        uint256(1 ether), // Amount to approve
        bytes("0x")       // Additional data
    );
    
    // Enable paymaster for next transaction
    vmExt.zkUsePaymaster(paymasterAddress, paymasterInput);
    
    // This call will be paid by the paymaster using ERC20 tokens
    myContract.someFunction();
}
```

## Notes

- Only affects the immediate next transaction
- The paymaster input format depends on the specific paymaster implementation
- Ensure the paymaster contract has sufficient funds to cover gas costs
- For approval-based paymasters, ensure the account has approved sufficient tokens

## See Also

- [General Paymaster Example](/zksync-specifics/examples/general-paymaster)
- [Approval-based Paymaster Example](/zksync-specifics/examples/paymaster-approval-based)