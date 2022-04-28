## `deal`

### Signature

```solidity
function deal(address who, uint256 newBalance) external;
```

### Description

Sets the balance of an address `who` to `newBalance`.

### Examples

```solidity
address alice = address(1);
vm.deal(alice, 1 ether);
log_uint256(alice.balance); // 1000000000000000000
```

### SEE ALSO

Forge Standard Library

[`deal`](../reference/forge-std/deal.md), [`hoax`](../reference/forge-std/hoax.md), [`startHoax`](../reference/forge-std/startHoax.md)
