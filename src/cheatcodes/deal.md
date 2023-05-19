## `deal`

### Signature

```solidity
function deal(address who, uint256 newBalance) external;
```

```solidity
function deal(address token, address to, uint256 give) external;
```

```solidity
function deal(address token, address to, uint256 give, bool adjust) external;
```

### Description

Sets the balance of an address `who` to `newBalance`.

If the alternative signature of `deal` is used, then we can additionaly specify ERC20 token address, as well as an option to update `totalSupply`.

### Examples

```solidity
address alice = address(1);
vm.deal(alice, 1 ether);
log_uint256(alice.balance); // 1000000000000000000
```

```solidity
address alice = address(1);
deal(address(DAI), alice, 1 ether); // import StdUtils.sol first
log_uint256(address(DAI).balanceOf(alice); // 1000000000000000000
```

### SEE ALSO

Forge Standard Library

[`deal`](../reference/forge-std/deal.md), [`hoax`](../reference/forge-std/hoax.md), [`startHoax`](../reference/forge-std/startHoax.md)
