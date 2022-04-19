## `rewind`

### Signature

```solidity
function rewind(uint256 time) public;
```

### Description

Rewinds `block.timestamp` by the specified number of seconds.

### Examples

```solidity
assertEq(block.timestamp, 3600);
rewind(3600);
assertEq(block.timestamp, 0);
```
