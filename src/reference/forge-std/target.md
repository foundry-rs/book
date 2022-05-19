## `target`

### Signature

```solidity
function target(StdStorage storage self, address _target) internal returns (StdStorage storage);
```

### Description

Set the address of the contract (required).

### Examples

```solidity
uint256 slot = stdstore
    .target(address(test))
    .sig(test.map_struct.selector)
    .with_key(address(this))
    .depth(0)
    .find();
```