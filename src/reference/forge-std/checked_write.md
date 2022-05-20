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

Sets the data to be written to the storage slot(s)

### Examples

```solidity
stdstore
    .target(address(test))
    .sig(test.deep_map.selector)
    .with_key(address(this))
    .with_key(address(this))
    .checked_write(100);
```