## `warp`

### Signature

```solidity
function warp(uint256) external;
```

### Description

Sets `block.timestamp`.

### Examples

```solidity
cheats.warp(1641070800);
emit log_uint(block.timestamp); // 1641070800
```
