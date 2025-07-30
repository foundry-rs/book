---
description: zkUseFactoryDep cheatcode for marking contracts as factory dependencies.
---

# zkUseFactoryDep

```solidity
function zkUseFactoryDep(string calldata name) external pure;
```

## Description

Marks a given contract as a factory dependency only for the next CREATE or CALL operation. Factory dependencies are contracts that may be deployed by other contracts during execution.

## Parameters

- `name`: The name of the contract to mark as a factory dependency

## Examples

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract FactoryDepTest is Test, TestExt {
    function testFactoryDependency() public {
        // Mark ChildContract as a factory dependency
        vmExt.zkUseFactoryDep("ChildContract");
        
        // Deploy factory contract that will create ChildContract instances
        Factory factory = new Factory();
        
        // The factory can now deploy ChildContract instances
        address childAddress = factory.createChild();
    }
}

contract Factory {
    function createChild() external returns (address) {
        // This will work because ChildContract was marked as factory dependency
        ChildContract child = new ChildContract();
        return address(child);
    }
}

contract ChildContract {
    uint256 public value = 42;
}
```

## Use Cases

- Factory pattern implementations where contracts deploy other contracts
- Complex deployment scenarios with nested contract creation
- Testing contracts that use CREATE2 for deterministic deployments
- Working with proxy patterns and upgradeable contracts

## Notes

- Only affects the immediate next CREATE or CALL operation
- The specified contract must exist in the compilation artifacts
- Factory dependencies are automatically handled in most cases
- Manual marking is needed for complex scenarios or edge cases
- In zkEVM, all factory dependencies must be known at deployment time