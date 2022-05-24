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
// mapping(uint256 => mapping(address => uint256)) public itemToPlayerToQuantity;

uint256 slot = stdstore
    .target(address(game))
    .sig(game.itemToOwnerToQuantity.selector)
    .with_key(1337)
    .with_key(address(this))
    .find();
```
