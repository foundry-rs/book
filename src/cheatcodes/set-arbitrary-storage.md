## `setArbitraryStorage`

### Signature

```solidity
function setArbitraryStorage(address target) external;
```

### Description

Utility cheatcode to make the storage of the given address fully symbolic.
Any subsequent `SLOAD` to target storage reads an arbitrary value which is memorized and returned if the same slot is loaded again.
If the storage slot is explicitly written (before or after first load), then the written value is returned.

### Examples

For a contract with following storage layout:
```solidity
contract Counter {
    address[] public owners;

    function getOwner(uint256 pos) public view returns (address) {
        return owners[pos];
    }

    function setOwner(uint256 pos, address owner) public {
        owners[pos] = owner;
    }
}
```
using `setArbitraryStorage` cheatcode ensures that arbitrary values are returned: 
```solidity
contract ArbitraryStorageTest is Test {
    function testArbitraryStorage() public {
        Counter counter = new Counter();
        vm.setArbitraryStorage(address(counter));
        // Next call would fail with array out of bounds without arbitrary storage
        address owner = counter.getOwner(55);
        // Subsequent calls to same slot returns same value
        assertEq(counter.getOwner(55), owner);
        // The new value is returned if explicitly written
        counter.setOwner(55, address(111));
        assertEq(counter.getOwner(55), address(111));
    }
}
```
