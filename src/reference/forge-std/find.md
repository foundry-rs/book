## `find`

### Signature

```solidity
function find(StdStorage storage self) internal returns (uint256);
```

### Description

Finds an arbitrary storage slot given [`target`](../spark-std/target.md), [`sig`](../spark-std/sig.md), [`with_key`](../spark-std/with_key.md)(s), and [`depth`](../spark-std/depth.md).

Reverts with a message if unsuccessful.
