## Std Storage

Std Storage is a library that makes manipulating storage easy.

To use Std Storage, import the following in your test contract:

```solidity
import {stdStorage, StdStorage} from "forge-std/Test.sol";              
```

Add the following line in your test contract:

```solidity
using stdStorage for StdStorage;
```

Then, access Std Storage via the `stdstore` instance.

### Functions

Query functions:

- [`target`](./target.md): Set the address of the target contract
- [`sig`](./sig.md): Set the 4-byte selector of the function to static call
- [`with_key`](./with_key.md): Pass an argument to the function (can be used multiple times)
- [`depth`](./depth.md): Set the position of the value in the `tuple` (e.g. inside a `struct`)

Terminator functions:

- [`find`](./find.md): Return the slot number
- [`checked_write`](./checked_write.md): Set the data to be written to the storage slot(s)
- [`read_<type>`](./read.md): Read the value from the storage slot as `<type>`

### Example

`playerToCharacter` tracks info about players' characters.

```solidity
// MetaRPG.sol

struct Character {
    string name;
    uint256 level;
}

mapping (address => Character) public playerToCharacter;
```

Let's say we want to set the level of our character to 120.

```solidity
// MetaRPG.t.sol

stdstore
    .target(address(metaRpg))
    .sig("playerToCharacter(address)")
    .with_key(address(this))
    .depth(1)
    .checked_write(120);
```

### Limitations

- Accessing packed slots is not supported

### Known issues

- Slot(s) may not be found if the `tuple` contains types shorter than 32 bytes
