## `warp`

### Signature

```solidity
function warp(uint256) external;
```

### Description

Sets `block.timestamp`.

### Examples

```solidity
vm.warp(1641070800);
emit log_uint(block.timestamp); // 1641070800
```

### SEE ALSO

Forge Standard Library

[`skip`](../reference/forge-std/skip.md), [`rewind`](../reference/forge-std/rewind.md)