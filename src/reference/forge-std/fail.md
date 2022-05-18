## `fail`

### Signature

```solidity
function fail(string memory err) internal virtual;
```

### Description

Provides a clean and readable way to fail tests if a certain branch or execution point is hit.

### Examples

```solidity
function test() external {
    fail("failed");
}

//[FAIL] test() (gas: 12116)
//Logs:
//  Error: failed
```