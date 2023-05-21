## `assumePayable`

### Signature

```solidity
function assumePayable(address addr) public;
```

### Description

Uses [`assume`](../../cheatcodes/assume.md) to filter addresses that reject Ether transfers.

This makes an external call to the specified `addr` with a no calldata and checks `assume` against the success of the call.
