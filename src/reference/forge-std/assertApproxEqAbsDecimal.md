## `assertApproxEqAbsDecimal`

### Signature

```solidity
function assertApproxEqAbsDecimal(uint256 left, uint256 right, uint256 maxDelta, uint256 decimals) internal;
```

```solidity
function assertApproxEqAbsDecimal(uint256 left, uint256 right, uint256 maxDelta, uint256 decimals, string memory err) internal;
```

```solidity
function assertApproxEqAbsDecimal(int256 left, int256 right, uint256 maxDelta, uint256 decimals) internal;
```

```solidity
function assertApproxEqAbsDecimal(int256 left, int256 right, uint256 maxDelta, uint256 decimals, string memory err) internal;
```

### Description

Asserts `left` is approximately equal to `right` with delta in absolute value.

`left` and `right` are formatted with decimals in the revert string.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertApproxEqAbs`](./assertApproxEqAbs.md)