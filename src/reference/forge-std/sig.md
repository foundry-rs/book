## `sig`

### Signature

```solidity
function sig(StdStorage storage self, bytes4 _sig) internal returns (StdStorage storage);
```

```solidity
function sig(StdStorage storage self, string memory _sig) internal returns (StdStorage storage);
```

### Description

Sets the signature of the function to call (required).

### Examples

```solidity
uint256 slot = stdstore
    .target(address(test))
    .sig(test.map_struct.selector)
    .with_key(address(this))
    .depth(1)
    .find();
```