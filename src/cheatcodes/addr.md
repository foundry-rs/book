## `addr`

### Signature

```solidity
function addr(uint256 privateKey) external returns (address);
```

### Description

Computes the address for a given private key.

### Examples

```solidity
address alice = vm.addr(1);
emit log_address(alice); // 0x7e5f4552091a69125d5dfcb7b8c2659029395bdf
```
