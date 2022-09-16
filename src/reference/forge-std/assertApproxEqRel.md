## `assertApproxEqRel`

### Signature

```solidity
function assertApproxEqRel(uint256 a, uint256 b, uint256 maxPercentDelta) internal virtual;
```

```solidity
function assertApproxEqRel(uint256 a, uint256 b, uint256 maxPercentDelta, string memory err) internal virtual;
```

### Description

Asserts `a` is approximately equal to `b` with delta in percentage, where `1e18` is 100%.

### Examples

```solidity
function testFail () external {
    uint256 a = 100;
    uint256 b = 200;
    assertApproxEqRel(a, b, 0.4e18);
}
```

```ignore
[PASS] testFail() (gas: 23884)
Logs:
  Error: a ~= b not satisfied [uint]
      Expected: 200
        Actual: 100
   Max % Delta: 0.400000000000000000
       % Delta: 0.500000000000000000
```
