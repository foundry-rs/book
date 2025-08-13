---
description: zkVmSkip cheatcode for selectively executing operations on EVM instead of zkEVM.
---

# zkVmSkip

```solidity
function zkVmSkip() external pure;
```

## Description

When running in zkEVM context, skips the next CREATE or CALL, executing it on the EVM instead.

All `CREATE`s executed within this skip will automatically have `CALL`s to their target addresses executed in the EVM and need not be marked with this cheatcode at every usage location.

## Examples

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract ZkVmSkipTest is Test, TestExt {
    function testZkVmSkip() public {
        // Enable ZK-VM mode
        vmExt.zkVm(true);
        
        // This will execute on zkEVM
        MyContract contract1 = new MyContract();
        
        // Skip the next operation - execute on EVM instead
        vmExt.zkVmSkip();
        
        // This will execute on EVM despite zkVm being enabled
        MyContract contract2 = new MyContract();
        
        // This will execute on zkEVM again
        MyContract contract3 = new MyContract();
    }
}
```

## Use Cases

- Testing contracts that have different behavior on EVM vs zkEVM
- Debugging by comparing execution between both virtual machines
- Working with contracts that may not be compatible with zkEVM
- Performance comparisons between EVM and zkEVM execution

## Notes

- Only affects the immediate next CREATE or CALL operation
- Nested operations from the skipped operation will also execute on EVM
- Does not permanently disable zkEVM mode - subsequent operations return to zkEVM