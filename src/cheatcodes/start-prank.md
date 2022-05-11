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

Forge Standard Library

[`startHoax`](../reference/forge-std/startHoax.md)
