## `with_key`

### Signature

```solidity
function with_key(StdStorage storage self, address who) internal returns (StdStorage storage);
```

```solidity
function with_key(StdStorage storage self, uint256 amt) internal returns (StdStorage storage);
```

```solidity
function with_key(StdStorage storage self, bytes32 key) internal returns (StdStorage storage);
```

### Description

Sets the mapping key, if the variable is of type `mapping`.

### Examples

```solidity
uint256 slot = stdstore
    .target(address(test))
    .sig(test.deep_map.selector)
    .with_key(address(this))
    .with_key(address(this))
    .find();
```
