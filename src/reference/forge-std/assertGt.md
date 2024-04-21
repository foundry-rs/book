## `assertGt`

### Signature

```solidity
function assertGt(uint256 left, uint256 right) internal;
```

```solidity
function assertGt(uint256 left, uint256 right, string memory err) internal;
```

```solidity
function assertGt(int256 left, int256 right) internal;
```

```solidity
function assertGt(int256 left, int256 right, string memory err) internal;
```

### Description

Asserts `left` is strictly greater than than `right`.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertGtDecimal`](./assertGtDecimal.md)
- [`assertGe`](./assertGe.md)