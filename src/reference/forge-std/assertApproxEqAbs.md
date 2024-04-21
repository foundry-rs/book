## `assertApproxEqAbs`

### Signature

```solidity
function assertApproxEqAbs(uint256 left, uint256 right, uint256 maxDelta) internal;
```

```solidity
function assertApproxEqAbs(uint256 left, uint256 right, uint256 maxDelta, string memory err) internal;
```

```solidity
function assertApproxEqAbs(int256 left, int256 right, uint256 maxDelta) internal;
```

```solidity
function assertApproxEqAbs(int256 left, int256 right, uint256 maxDelta, string memory err) internal;
```

### Description

Asserts `left` is approximately equal to `right` with delta in absolute value.

Optionally includes an error message in the revert string.

### Examples

```solidity
function testFail() external {
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

### SEE ALSO

- [`assertApproxEqAbsDecimal`](./assertApproxEqAbsDecimal.md)
- [`assertApproxEqRel`](./assertApproxEqRel.md)