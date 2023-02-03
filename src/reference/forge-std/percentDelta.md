## `percentDelta`

### Signature

```solidity
function percentDelta(uint256 a, uint256 b) internal pure returns (uint256)
```

```solidity
function percentDelta(int256 a, int256 b) internal pure returns (uint256)
```

### Description

Returns the difference between two numbers in percentage, where `1e18` is 100%.
More precisely, `percentDelta(a, b)` computes `abs((a-b) / b) * 1e18`.

### Example

```solidity
uint256 percent150 = stdMath.percentDelta(uint256(125), 50);
uint256 percent60 = stdMath.percentDelta(uint256(50), 125);
```
