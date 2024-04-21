## `assertApproxEqRelDecimal`

### Signature

```solidity
function assertApproxEqRelDecimal(uint256 left, uint256 right, uint256 maxPercentDelta, uint256 decimals) internal;
```

```solidity
function assertApproxEqRelDecimal(uint256 left, uint256 right, uint256 maxPercentDelta, uint256 decimals, string memory err) internal;
```

```solidity
function assertApproxEqRelDecimal(int256 left, int256 right, uint256 maxPercentDelta, uint256 decimals) internal;
```

```solidity
function assertApproxEqRelDecimal(int256 left, int256 right, uint256 maxPercentDelta, uint256 decimals, string memory err) internal;
```

### Description

Asserts `left` is approximately equal to `right` with delta in percentage, where `1e18` is 100%.

`left` and `right` are formatted with decimals in the revert string.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertApproxEqRel`](./assertApproxEqRel.md)