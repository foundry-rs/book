## `startPrank`

### Signature

```solidity
function startPrank(address) external;
```

```solidity
function startPrank(address sender, address origin) external;
```

### Description

Sets `msg.sender` **for all subsequent calls** until [`stopPrank`](./stop-prank.md) is called.

If the alternative signature of `startPrank` is used, then `tx.origin` is set as well for all subsequent calls.

### SEE ALSO

Spark Standard Library

[`startHoax`](../reference/spark-std/startHoax.md), [`changePrank`](../reference/spark-std/change-prank.md)
