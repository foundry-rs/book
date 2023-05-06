## `prevrandao`

### Signature

```solidity
function prevrandao(bytes32) external;
```

### Description

Sets `block.prevrandao`.

### Examples

```solidity
vm.prevrandao(bytes32(uint256(42)));
emit log_uint(block.prevrandao); // 42
```
