## `assertApproxEqAbs`

### Signature

```solidity
function assertApproxEqAbs(uint256 a, uint256 b, uint256 maxDelta) internal virtual;
```

```solidity
function assertApproxEqAbs(uint256 a, uint256 b, uint256 maxDelta, string memory err) internal virtual;
```

### Description

Asserts `a` is approximately equal to `b` with delta in absolute value.

### Examples

```solidity
function testFail () external {
    uint256 a = 100;
    uint256 b = 200;

    assertApproxEqAbs(a, b, 90);
}
```

```ignore
[PASS] testFail() (gas: 23169)
Logs:
  Error: a ~= b not satisfied [uint]
    Expected: 200
      Actual: 100
   Max Delta: 90
       Delta: 100
```
