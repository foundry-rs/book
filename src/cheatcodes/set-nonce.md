## `setNonce`

### Signature

```solidity
function setNonce(address account, uint64 nonce) external;
```

### Description

Sets the nonce of the given account.

The new nonce must be higher than the current nonce of the account.

### Examples

```solidity
vm.setNonce(address(100), 1234);
```
