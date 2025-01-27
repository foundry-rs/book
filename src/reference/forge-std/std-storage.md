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
- [`enable_packed_slots`](./enable_packed_slots.md): Allow the use of packed storage slots

Terminator functions:

- [`find`](./find.md): Return the slot number
- [`checked_write`](./checked_write.md): Set the data to be written to the storage slot(s)
- [`read_<type>`](./read.md): Read the value from the storage slot as `<type>`

### Simple Example

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


### Packed-Slot Example

`balanceOf()` returns the balance of a user in a gas-optimized ERC20 implementation.
`enable_packed_slots()` also works with [ERC7201 Namespaced Storage Slots](https://eips.ethereum.org/EIPS/eip-7201), proxy patterns, and packed slots as shown in the example below:

```solidity
// AgoraDollar.sol
contract AgoraDollar {
    /// @notice The Erc20AccountData struct
    /// @param isFrozen A boolean to indicate if the account is frozen
    /// @param balance A uint248 to store the balance of the account
    struct Erc20AccountData {
        bool isFrozen;
        uint248 balance;
    }

    /// @notice The Erc20CoreStorage struct
    /// @param accountData A mapping of address to Erc20AccountData to store account data
    /// @custom:storage-location erc7201:AgoraDollarErc1967Proxy.Erc20CoreStorage
    struct Erc20CoreStorage {
        /// @dev _account The account whose data we are accessing
        /// @dev _accountData The account data for the account
        mapping(address _account => Erc20AccountData _accountData) accountData;
    }

    /// @notice The ```ERC20_CORE_STORAGE_SLOT_``` is the storage slot for the Erc20CoreStorage struct
    /// @dev keccak256(abi.encode(uint256(keccak256("AgoraDollarErc1967Proxy.Erc20CoreStorage")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 internal constant ERC20_CORE_STORAGE_SLOT_ =
        0x455730fed596673e69db1907be2e521374ba893f1a04cc5f5dd931616cd6b700;

    /// @notice The ```getPointerToErc20CoreStorage``` function returns a pointer to the Erc20CoreStorage struct
    /// @return $ A pointer to the Erc20CoreStorage struct
    function getPointerToErc20CoreStorage() internal pure returns (Erc20CoreStorage storage $) {
        /// @solidity memory-safe-assembly
        assembly {
            $.slot := ERC20_CORE_STORAGE_SLOT_
        }
    }

    /// @notice The ```balanceOf``` function returns the token balance of a given account
    /// @param _account The account to check the balance of
    /// @return The balance of the account
    function balanceOf(address _account) external view returns (uint256) {
        return getPointerToErc20CoreStorage().accountData[_account].balance;
    }
}
```

Let's say we want a function to set the balance of an address to some amount on the AUSD contract.

```solidity
// TestAgoraDollar.t.sol

function seedUserWithAusd(address _to, uint248 _amount) internal {
    stdstore
        .enable_packed_slots()
        .target(address(Constants.Mainnet.AUSD_ERC20)) //0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a
        .sig("balanceOf(address)")
        .with_key(_to)
        .checked_write(_amount);
}
```

### Known issues

- Slot(s) may not be found if the `tuple` contains types shorter than 32 bytes
