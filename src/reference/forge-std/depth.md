## `depth`

### Signature

```solidity
function depth(StdStorage storage self, uint256 _depth) internal returns (StdStorage storage);
```

### Description

Sets the index of the struct member, if the variable is of type `struct`.

### Examples

```solidity
uint256 slot = stdstore
    .target(address(test))
    .sig(test.deep_map_struct.selector)
    .with_key(address(this))
    .with_key(address(this))
    .depth(0)
    .find();
```