## `assertLeDecimal`

### Signature

```solidity
function assertLeDecimal(uint256 left, uint256 right, uint256 decimals) internal
```

```solidity
function assertLeDecimal(uint256 left, uint256 right, uint256 decimals, string memory err) internal;
```

```solidity
function assertLeDecimal(int256 left, int256 right, uint256 decimals) internal;
```

```solidity
function assertLeDecimal(int256 left, int256 right, uint256 decimals, string memory err) internal;
```

### Description

Asserts `left` is less than or equal to `right`.

`left` and `right` are formatted with decimals in the revert string.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertLe`](./assertLe.md)