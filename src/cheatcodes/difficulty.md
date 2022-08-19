## `difficulty`

### Signature

```solidity
function difficulty(uint256) external;
```

### Description

Sets `block.difficulty`.

### Examples

```solidity
vm.difficulty(25);
emit log_uint(block.difficulty); // 25
```
