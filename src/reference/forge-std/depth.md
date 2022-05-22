## `depth`

### Signature

```solidity
function depth(StdStorage storage self, uint256 _depth) internal returns (StdStorage storage);
```

### Description

Sets the index of the struct member, if the variable is of type `struct`.

### Examples

```solidity
// struct Character {
//     Class class;
//     uint256 level;
//     uint256 xp;
// }
//
// mapping (address => Character) public playerToCharacter;

stdstore
    .target(game)
    .sig(game.playerToCharacter.selector)
    .with_key(address(this))
    .depth(1)
    .checked_write(120);
```