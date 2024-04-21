## `assertTrue`

### Signature

```solidity
function assertTrue(bool data) internal;
```

```solidity
function assertTrue(bool data, string memory err) internal;
```

### Description

Asserts `data` is true.

Optionally includes an error message in the revert string.

### Examples

```solidity
bool success = contract.fun();
assertTrue(success);
```

### SEE ALSO

- [`assertFalse`](./assertFalse.md)