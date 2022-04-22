## `deal`

### Signature

```solidity
function deal(address to, uint256 give) public;
```

```solidity
function deal(address token, address to, uint256 give) public;
```

```solidity
function deal(address token, address to, uint256 give, bool adjust) public;
```

### Description

A wrapper around the [`deal`](../../cheatcodes/deal.md) cheatcode that also works for most ERC-20 tokens.

If the alternative signature of `deal` is used, adjusts the token's total supply after setting the balance.

### Examples

```solidity
deal(address(dai), alice, 10000e18);
assertEq(dai.balanceOf(alice), 10000e18);
```
