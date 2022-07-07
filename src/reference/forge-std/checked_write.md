## `checked_write`

### Signature

```solidity
function checked_write(StdStorage storage self, address who) internal;
```

```solidity
function checked_write(StdStorage storage self, uint256 amt) internal;
```

```solidity
function checked_write(StdStorage storage self, bool write) internal;
```

```solidity
function checked_write(StdStorage storage self, bytes32 set) internal;
```

### Description

Sets the data to be written to the storage slot(s).

Reverts with a message if unsuccessful.
