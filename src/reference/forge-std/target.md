## `target`

### Signature

```solidity
function target(StdStorage storage self, address _target) internal returns (StdStorage storage);
```

### Description

Sets the address of the contract (required).

### Examples

```solidity
// function playerCount() public view returns (uint256) {

uint256 slot = stdstore
    .target(address(game))
    .sig(game.playerCount.selector)
    .find();
```