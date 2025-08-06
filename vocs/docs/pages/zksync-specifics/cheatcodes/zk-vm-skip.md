## `zkVmSkip`

### Signature

```solidity
function zkVmSkip() external pure;
```

### Description

When running in zkEVM context, skips the next `CREATE` or `CALL`, executing it on the EVM instead.
All `CREATE`s executed within this skip will automatically have `CALL`s to their target addresses executed in the EVM and need not be marked with this cheatcode at every usage location.

Skipping the next operation in zkEVM does not involve [migrating](../execution-overview.md#execution-overview) storages as is done for [zkVm](./zk-vm.md) cheatcode.

### Examples

```solidity
/// contract LeetContract {
///     constructor(uint8 value) public {
///         // do something
///     }
/// }

vmExt.zkVm(true);
new LeetContract(1); // deployed in zkEVM

vmExt.zkVmSkip();
new LeetContract(2); // deployed in EVM

new LeetContract(3); // deployed in zkEVM
```

Any contract deployed within a skip is remembered as such, so adding `zkVmSkip` to all of its calls is not necessary:

```solidity
/// contract LeetContract {
///     constructor(uint8 value) public {
///         // do something
///     }
///     
///     function sayLeet() public {
///         // do something
///     }
/// }

contract FooTest is Test, TestExt {
    LeetContract leet1;
    LeetContract leet2;

    function setUp() public {
        leet1 = new LeetContract(1); // deployed in zkEVM

        vmExt.zkVmSkip();
        leet2 = new LeetContract(2); // deployed in EVM
    }

    function testAutomaticLeetDetection() public {
        leet1.sayLeet();            // executed in zkEVM
        
        leet2.sayLeet();            // automatically executed in EVM
    }

    function testManualLeetDetection() public {
        leet1.sayLeet();            // executed in zkEVM
        
        vmExt.zkVmSkip();           // redundant here, as it is
        leet2.sayLeet();            // automatically executed in EVM
    }
}
```