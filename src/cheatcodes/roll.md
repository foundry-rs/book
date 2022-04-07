## `roll`

### Signature

```solidity
function roll(uint256) external;
```

### Description

Sets `block.number`.

### Examples

```solidity
cheats.roll(100);
emit log_uint(block.number); // 100
```
