## `stopPrank`

### Signature

```solidity
function stopPrank() external;
```

### Description

Stops an active prank started by [`startPrank`](./start-prank.md), resetting `msg.sender` and `tx.origin` to the values before `startPrank` was called.
