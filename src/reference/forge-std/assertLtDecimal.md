## `assertLtDecimal`

### Signature

```solidity
function assertLtDecimal(uint256 left, uint256 right, uint256 decimals) internal
```

```solidity
function assertLtDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) internal;
```

```solidity
function assertLtDecimal(int256 left, int256 right, uint256 decimals) internal;
```

```solidity
function assertLtDecimal(int256 left, int256 right, uint256 decimals, string memory err) internal;
```

### Description

Asserts `left` is strictly less than `right`.

`left` and `right` are formatted with decimals in the revert string.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertLt`](./assertLt.md)