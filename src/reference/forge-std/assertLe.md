## `assertLe`

### Signature

```solidity
function assertLe(uint256 left, uint256 right) internal;
```

```solidity
function assertLe(uint256 left, uint256 right, string memory err) internal;
```

```solidity
function assertLe(int256 left, int256 right) internal;
```

```solidity
function assertLe(int256 left, int256 right, string memory err) internal;
```

### Description

Asserts `left` is less than or equal to `right`.

Optionally includes an error message in the revert string.

### SEE ALSO

- [`assertLeDecimal`](./assertLeDecimal.md)
- [`assertLt`](./assertLt.md)