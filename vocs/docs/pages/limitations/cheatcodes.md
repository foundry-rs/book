---
description: Cheatcode limitations and incompatibilities in ZKsync zkEVM context.
---

## Cheatcode Limitations


As outlined in the [Execution Overview](../execution-overview.md#zksync-mode), due to the nature of how transactions are executed in zkEVM, cheatcode support is limited to the root level of an executing test. That is, all cheatcode access must happen outside of any `CREATE` or `CALL` that is dispatched to the zkEVM. 

Therefore, the following are valid cheatcode accesses:

```solidity
contract MyContract {
    function getNumber() public returns (uint256) {
        return 42;
    }
}

contract FooTest is Test {
    function testCheatCodesAccess_1() public {
        vm.roll(10);                    // valid
        vm.assertEq(10, block.number);
    }

    function testCheatCodesAccess_2() public {
        vm.roll(10);                    // valid
        new MyContract();
    }

    function testCheatCodesAccess_3() public {
        vm.roll(10);                    // valid
        MyContract testContract = new MyContract();
        testContract.getNumber();
    }
}
```

And consequently, since libraries do not lead to a `CREATE` or a `CALL`, they can be used with cheatcodes:

```solidity
library MyLibrary {
    function setBlockNumber(value uint256) public {
        vm.roll(value);                 // valid
    }
}

contract FooTest is Test {
    function testCheatCodesLibrary() public {
        vm.roll(10);                    // valid
        vm.assertEq(10, block.number);
        MyLibrary.setBlockNumber(20);
        vm.assertEq(10, block.number);
    }
}
```

However, the following situations will lead to undefined behavior (or not work at all), as the cheatcodes are not supported within the zkEVM:

```solidity
contract MyContract {
    constructor() {
        vm.roll(20);                    // invalid
    }

    function getNumber() public returns (uint256) {
        vm.roll(20);                    // invalid
        return 42;
    }
}

contract FooTest is Test {
    function testUnsupportedCheatcode() public {
        vm.roll(10);                    // valid
        MyContract testContract = new MyContract();
        testContract.getNumber();
    }
}
```