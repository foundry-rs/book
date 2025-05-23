## `assertFalse`

### Signature

```solidity
function assertFalse(bool data) internal;
```

```solidity
function assertFalse(bool data, string memory err) internal;
```

### Description

Asserts `data` is false.

Optionally includes an error message in the revert string.

### Examples

```solidity
bool failure = contract.fun();
assertFalse(failure);
```

### SEE ALSO

- [`assertTrue`](./assertTrue.md)