## `sig`

### Signature

```solidity
function sig(StdStorage storage self, bytes4 _sig) internal returns (StdStorage storage);
```

```solidity
function sig(StdStorage storage self, string memory _sig) internal returns (StdStorage storage);
```

### Description

Sets the 4-byte selector of the function to static call.

Default value: `hex"00000000"`

### Examples

```solidity
uint256 slot = stdstore
    .target(addr)
    .sig(addr.fun.selector)
    .with_key(1)
    .find();
```

```solidity
uint256 slot = stdstore
    .target(addr)
    .sig("fun(uint256)")
    .with_key(1)
    .find();
```