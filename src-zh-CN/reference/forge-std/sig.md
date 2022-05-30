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
// function playerCount() public view returns (uint256) {

uint256 slot = stdstore
    .target(address(game))
    .sig(game.playerCount.selector)
    .find();
```