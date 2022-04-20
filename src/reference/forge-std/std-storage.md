## Std-storage

To use std-storage, add the following line to your test contract:

```solidity
using stdStorage for StdStorage;
```

Then, access std-storage via the `stdstore` instance.

### Functions

- `target`: Set contract address.
- `sig`: Set function signature.
- `with_key`: Set key, if variable is of type `mapping`.
- `depth`: Set depth, if variable is of type `struct`.
- `checked_write`: Set data to be written.
- `find`: Return slot number.

### Example

`playerToCharacter` tracks each player's character's stats.

```solidity
// MetaRPG.sol

struct Character {
    Class class;
    uint256 level;
    uint256 xp;
}

mapping (address => Character) public playerToCharacter;
```

Let's say we want to set the level of our character to 120.

```solidity
// MetaRPG.t.sol

stdstore
    .target(address(metaRpg))
    .sig(metaRpg.playerToCharacter.selector)
    .with_key(address(this))
    .depth(1)
    .checked_write(120);
```