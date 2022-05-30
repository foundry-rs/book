## `read`

### Signature

```solidity
function read_bytes32(StdStorage storage self) internal returns (bytes32);
```

```solidity
function read_bool(StdStorage storage self) internal returns (bool);
```

```solidity
function read_address(StdStorage storage self) internal returns (address);
```

```solidity
function read_uint(StdStorage storage self) internal returns (uint256);
```

```solidity
function read_int(StdStorage storage self) internal returns (int256);
```

### Description

Accesses a value from the storage slot.

### Examples

```solidity
address a = stdstore
    .target(address(c))
    .sig(c.a.selector)
    .read_address();
```