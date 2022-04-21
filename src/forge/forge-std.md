## Forge Standard Library Overview

Forge Standard Library (Forge Std) is a collection of helpful contracts that make writing tests easier, faster, and more user-friendly.

Using Forge Std is the preferred way of writing tests with Foundry.

It provides all the essential functionality you need to get started writing tests:

- `Vm.sol`: Up-to-date cheatcodes interface
- `console.sol` and `console2.sol`: Hardhat-style logging functionality
- `Test.sol`: Std-libraries, Dappsys Test, Hevm instance, and Hardhat console

Simply import `Test.sol` and inherit from `Test` in your test contract:

```solidity
import "forge-std/Test.sol";

contract ContractTest is Test { ...
```

Now, you can:

```solidity
// Access Hevm via the `vm` instance
vm.startPrank(alice);

// Assert and log using Dappsys Test
assertEq(dai.balanceOf(alice), 10000e18);

// Log with the Hardhat `console` (`console2`)
console.log(alice.balance);

// Use anything from the Forge Std std-libraries
deal(address(dai), alice, 10000e18);
```

To import the `Vm` interface or the `console` library individually:

```solidity
import "forge-std/Vm.sol";
```

```solidity
import "forge-std/console.sol";
```

**Note:** `console2.sol` decodes logs with `int256` and `uint256` values correctly, but is not compatible with Hardhat.

```solidity
import "forge-std/console2.sol";
```

### Std-libraries

Forge Std currently consists of three main libraries.

#### Std-cheats

Std-cheats are wrappers around the Forge cheatcodes, to make them safer to use and improve the UX.

You can access std-cheats by simply calling them inside your test contract, as you would any other internal function:

```solidity
// set up a prank as Alice, with 100 ETH balance
hoax(alice, 100 ether);
```

#### Std-errors

Std-errors are common Solidity errors and reverts.

Std-errors are most useful in combination with the [`expectRevert`](../cheatcodes/expect-revert.md#expectrevert) cheatcode, as you do not need to remember the panic codes. Note that you have to access them through `stdError`, as this is a library.

```solidity
// expect an arithmetic error on the next call (e.g. underflow)
vm.expectRevert(stdError.arithmeticError);
```

#### Std-storage

Std-storage makes manipulating contract storage easy. It can always find and write to the storage slot(s) associated with a particular variable.

The `Test` contract already provides a `StdStorage` instance `stdstore` through which you can access any std-storage functionality. Note that you must add `using stdStorage for StdStorage` in your test contract first.

```solidity
// find the variable `score` in the contract `game`
// and change its value to 10
stdstore
    .target(address(game))
    .sig(game.score.selector)
    .checked_write(10);
```

<br>

> 📚 **Reference**
>
> See the [Forge Standard Library Reference](../reference/forge-std/) for a complete overview of Forge Standard Library.
