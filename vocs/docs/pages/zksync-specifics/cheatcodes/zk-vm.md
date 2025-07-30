---
description: zkVm cheatcode for enabling/disabling ZK-VM execution mode in foundry-zksync.
---

# zkVm

```solidity
function zkVm(bool enable) external pure;
```

## Description

Enables or disables the use of ZK-VM for transact/call and create instructions.

When enabled (`true`), subsequent `CREATE` and `CALL` operations in the test will be executed on the zkEVM instead of the regular EVM. When disabled (`false`), operations return to standard EVM execution.

## Examples

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract ZkVmTest is Test, TestExt {
    function testZkVmEnable() public {
        // Enable ZK-VM mode
        vmExt.zkVm(true);
        
        // This contract deployment will execute on zkEVM
        MyContract contract1 = new MyContract();
        
        // Disable ZK-VM mode
        vmExt.zkVm(false);
        
        // This contract deployment will execute on EVM
        MyContract contract2 = new MyContract();
    }
}
```

## Notes

- Using `--zksync` flag is equivalent to having `vmExt.zkVm(true)` as the first statement in a test
- Only `CREATE` and `CALL` operations are affected by this cheatcode
- Once dispatched to zkEVM, all nested operations remain in zkEVM context
- Cheatcodes are not supported within zkEVM execution context