## `getNonce`

### Signature

```solidity
function getNonce(address account) external returns (uint64);
```

### Description

Gets the nonce of the given account.

### Examples

```solidity
uint256 nonce = cheats.getNonce(address(100));
emit log_uint(nonce); // 0
```
