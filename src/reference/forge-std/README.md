## Forge Standard Library Reference

Forge Standard Library (Forge Std) is a collection of helpful contracts that make writing tests easier, faster, and more user-friendly.

Using Forge Std is the preferred way of writing tests with Foundry.

What's included:

- `Vm.sol`: Up-to-date [cheatcodes interface](../../cheatcodes/#cheatcodes-interface)

    ```solidity
    import "forge-std/Vm.sol";
    ```

- [`console.sol`](https://hardhat.org/hardhat-network/reference/#console-log) and `console2.sol`: Hardhat-style logging functionality

    ```solidity
    import "forge-std/console.sol";
    ```

    **Note:** `console2.sol` decodes logs with `int256` and `uint256` values correctly, but is not compatible with Hardhat.

    ```solidity
    import "forge-std/console2.sol";
    ```

- `Test.sol`: Complete Forge Std experience (more details [below](#forge-stds-test))

    ```solidity
    import "forge-std/Test.sol";
    ```

### Forge Std's `Test`

`Test` in `Test.sol` provides all the essential functionality you need to get started writing tests.

Simply import `Test.sol` and inherit from `Test` in your test contract:

```solidity
import "forge-std/Test.sol";

contract ContractTest is Test { ...
```

What's included:

- Std-libraries
  - [Std-cheats](./std-cheats.md): Wrappers around Forge cheatcodes for improved safety and UX.
  - [Std-errors](./std-errors.md): Common Solidity errors and reverts.
  - [Std-storage](./std-storage.md): Contract storage manipulation helpers.

- A Hevm instance `vm`, via which you invoke Forge cheatcodes (see [Cheatcodes Reference](../../cheatcodes/))

    ```solidity
    vm.startPrank(alice);
    ```

- All Hardhat `console` functions for logging (see [Hardhat docs](https://hardhat.org/hardhat-network/reference/#console-log))

    ```solidity
    console.log(alice.balance); // or `console2`
    ```

- All Dappsys Test functions for asserting and logging (see [Dappsys Test reference](../ds-test.md))

    ```solidity
    assertEq(dai.balanceOf(alice), 10000e18);
    ```