## `bound`

### Signature

```solidity
function bound(uint256 x, uint256 min, uint256 max) public returns (uint256 result);
```

### Description

Useful for wrapping inputs of a fuzz test into a certain range

### Examples

```solidity
assertEq(bound(5, 0, 4), 0);
assertEq(bound(0, 69, 69), 69);
assertEq(bound(0, 68, 69), 68);
assertEq(bound(10, 150, 190), 160);
assertEq(bound(300, 2800, 3200), 3100);
assertEq(bound(9999, 1337, 6666), 6006);
```