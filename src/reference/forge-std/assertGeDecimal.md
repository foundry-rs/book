## `assertGeDecimal`

### Signature

```solidity
function assertGeDecimal(uint256 left, uint256 right, uint256 decimals) internal
```

```solidity
function assertGeDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) internal;
```

```solidity
function assertGeDecimal(int256 left, int256 right, uint256 decimals) internal;
```

```solidity
function assertGeDecimal(int256 left, int256 right, uint256 decimals, string memory err) internal;
```

### Description

Asserts `left` is greater than or equal to `right`.

`left` and `right` are formatted with decimals in the revert string.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertGe`](./assertGe.md)