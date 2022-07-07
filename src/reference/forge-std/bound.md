## `bound`

### Signature

```solidity
function bound(uint256 x, uint256 min, uint256 max) public returns (uint256 result);
```

### Description

A mathematical function for wrapping inputs of fuzz tests into a certain range.

You can use it instead of the `assume` cheatcode to get better performance in some cases. Read more [here](../../cheatcodes/assume.md).

### Examples

```solidity
input = bound(input, 99, 101);
```

Returns `99` for input `0`.
<br>
Returns `100` for input `1`.
<br>
Returns `101` for input `2`.
<br>
Returns `99` for input `3`.
<br>
And so on.