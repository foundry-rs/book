## `assertApproxEqRel`

### Signature

```solidity
function assertApproxEqRel(uint256 left, uint256 right, uint256 maxPercentDelta) internal;
```

```solidity
function assertApproxEqRel(uint256 left, uint256 right, uint256 maxPercentDelta, string memory err) internal;
```

```solidity
function assertApproxEqRel(int256 left, int256 right, uint256 maxPercentDelta) internal;
```

```solidity
function assertApproxEqRel(int256 left, int256 right, uint256 maxPercentDelta, string memory err) internal;
```

### Description

Asserts `left` is approximately equal to `right` with delta in percentage, where `1e18` is 100%.

Optionally includes an error message in the revert string.

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

### SEE ALSO

- [`assertApproxEqRelDecimal`](./assertApproxEqRelDecimal.md)
- [`assertApproxEqAbs`](./assertApproxEqAbs.md)