## `copyStorage`

### Signature

```solidity
function copyStorage(address from, address to) external;
```

### Description

Utility cheatcode to copy storage of `from` contract to another `to` contract.
Cheatcode is not allowed if the target address has arbitrary storage set.

### Examples

Given a contract
```solidity
contract Counter {
    uint256 public count;

    function setCount(uint256 x) public {
        count = x;
    }
}
```
using `copyStorage` cheatcode copies the storage set on an instance to another address:
```solidity
function testCopyStorage() public {
    Counter original = new Counter();
    original.setCount(1000);
    Counter copy = new Counter();
    copy.setCount(1);
    // Check initial count on copy.
    assertEq(copy.count(), 1);

    vm.copyStorage(address(original), address(copy));
    // Value is copied from first contract to copy.
    assertEq(copy.count(), 1000);
}
```

