## Forge Standard Library

Forge Standard Library (Forge Std) is a collection of helpful contracts that make writing tests easier, faster, and more user-friendly.

Using Forge Std is the prefered way of writing tests with Foundry.

It provides all the essential functionality you'd need:

- `Vm.sol`: Up-to-date cheatcodes interface
- `console.sol`: Hardhat-style logging functionality
- `Test.sol`: Forge Std helpful contracts, `DSTest`, `Vm` instance, and Hardhat `console`

Simply import `Test.sol` and inherit from `Test` in your test contract:

```solidity
import "forge-std/Test.sol";

contract ContractTest is Test { ...
```

Now, you can:

```solidity
// Access Hevm via `vm` instance
vm.startPrank(alice);

// Use Hardhat `console`
console.log(alice.balance);

// Use anything from Forge Std
deal(address(dai), alice, 10000e18);

// Use `DSTest` functions
assertEq(link.balanceOf(dai), 10000e18);
```

To import the `Vm` interface or `console` library individually:

```solidity
import "forge-std/Vm.sol";
```
```solidity
import "forge-std/console.sol";
```

### Helpful contracts

Currently, Forge Std is comprised of 3 big sections.

#### Std-cheats

Std-cheats are wrappers around the Forge cheatcodes, which make them safer to use and improve the UX.

You can access std-cheats by simply calling them in your test contract, as if you would any other internal function:

```solidity
// setup a prank from an address that has some ether
hoax(alice, 99 ether);
```

#### `stdError` library

Std-errors are common Solidity errors and reverts.

Std-errors are most useful in combination with the `expectRevert` cheatcode, as you do not need to remember the panic codes. Note that you have to access them trough `stdError`, as this is a library.

```solidity
// expect an artithmetic error on revert
vm.expectRevert(stdError.arithmeticError);
```

#### `stdStorage` library

Std-storage lets you manipulate storage with ease. It can always find and write the storage slot(s) associated with a particular variable without knowing the storage layout.

The `Test` contract already provides a `StdStorage` instance - `stdStore` - through which you can access any std-storage functionality.

```solidity
// manipulate DAI's balance for Alice
stdstore
    .target(dai)
    .sig(0x70a08231)
    .with_key(alice)
    .checked_write(10000e18);
```

<br>

> 📚 **Reference**
>
> See the [Forge Standard Library Reference]() for a complete overview of Forge Standard Library.