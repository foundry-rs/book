## `assertLt`

### Signature

```solidity
function assertLt(uint256 left, uint256 right) internal;
```

```solidity
function assertLt(uint256 left, uint256 right, string memory err) internal;
```

```solidity
function assertLt(int256 left, int256 right) internal;
```

```solidity
function assertLt(int256 left, int256 right, string memory err) internal;
```

### Description

Asserts `left` is strictly less than `right`.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertLtDecimal`](./assertLtDecimal.md)
- [`assertLe`](./assertLe.md)