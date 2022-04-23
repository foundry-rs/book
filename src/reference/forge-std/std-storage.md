## Std Storage

Std Storage is a library that makes manipulating contract storage easy.

To use Std Storage, add the following line to your test contract:

```solidity
using stdStorage for StdStorage;
```

Then, access Std Storage via the `stdstore` instance.

### Functions

Query functions:

- `target`: Set the address of the contract (required)
- `sig`: Set the signature of the function to call (required)
- `with_key`: Set the mapping key, if the variable is of type `mapping`
- `depth`: Set the index of the struct member, if the variable is of type `struct`

Terminator functions:

- `checked_write`: Set the data to be written to the storage slot(s)
- `find`: Return the slot number

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