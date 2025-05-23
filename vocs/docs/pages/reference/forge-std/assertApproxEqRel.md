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
function testRevert() external {
    uint256 a = 100;
    uint256 b = 200;
    assertApproxEqRel(a, b, 0.4e18);
}
```

```ignore
[FAIL: assertion failed: 100 !~= 200 (max delta: 40.0000000000000000%, real delta: 50.0000000000000000%)] testRevert() (gas: 23884)
```

### SEE ALSO

- [`assertApproxEqRelDecimal`](./assertApproxEqRelDecimal.md)
- [`assertApproxEqAbs`](./assertApproxEqAbs.md)
