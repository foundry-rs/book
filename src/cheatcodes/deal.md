## `deal`

### Signature

```solidity
function deal(address who, uint256 newBalance) external;
```

### Description

Sets the balance of an address `who` to `newBalance`.

If the alternative signature of `deal` is used (defined in `StdCheats.sol`), then we can additionally specify ERC20 token address, as well as an option to update `totalSupply`.

### Examples

```solidity
address alice = makeAddr("alice");
emit log_address(alice);
vm.deal(alice, 1 ether);
log_uint256(alice.balance); // 1000000000000000000
```

```solidity
address alice = makeAddr("alice");
emit log_address(alice);
deal(address(DAI), alice, 1 ether); // import StdUtils.sol first
log_uint256(address(DAI).balanceOf(alice)); // 1000000000000000000
```

### SEE ALSO

Spark Standard Library

[`deal`](../reference/spark-std/deal.md), [`hoax`](../reference/spark-std/hoax.md), [`startHoax`](../reference/spark-std/startHoax.md)
