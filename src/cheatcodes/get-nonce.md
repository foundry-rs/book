## `getNonce`

### Signature

```solidity
function getNonce(address account) external returns (uint64);
```

```solidity
function getNonce(Wallet memory wallet) external returns (uint64);
```

### Description

Gets the nonce of the given account or [Wallet](./create-wallet.md).

### Examples

#### `address`
```solidity
uint256 nonce = vm.getNonce(address(100));
emit log_uint(nonce); // 0
```

#### `Wallet`
```solidity
Wallet memory alice = vm.createWallet("alice");
uint256 nonce = vm.getNonce(nonce);
emit log_uint(nonce); // 0
```
