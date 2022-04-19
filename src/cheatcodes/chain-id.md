## `chainId`

### Signature

```solidity
function chainId(uint256) external;
```

### Description

Sets `block.chainid`.

### Examples

```solidity
vm.chainId(12345);
emit log_uint(block.chainid); // 12345
```
