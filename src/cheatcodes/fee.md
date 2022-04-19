## `fee`

### Signature

```solidity
function fee(uint256) external;
```

### Description

Sets `block.basefee`.

### Examples

```solidity
cheats.fee(25 gwei);
emit log_uint(block.basefee); // 25000000000
```
