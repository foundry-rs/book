## `assertFalse`

### Signature

```solidity
function assertFalse(bool data) internal virtual;
```

```solidity
function assertFalse(bool data, string memory err) internal virtual;
```

### Description

Asserts the `condition` is false.

### Examples

```solidity
bool failure = contract.fun();
assertFalse(failure);
```