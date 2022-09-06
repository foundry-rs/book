## Forge Standard Library Reference

Forge Standard Library (Forge Std for short) is a collection of helpful contracts that make writing tests easier, faster, and more user-friendly.

Using Forge Std is the preferred way of writing tests with Foundry.

What's included:

- `Vm.sol`: Up-to-date [cheatcodes interface](../../cheatcodes/#cheatcodes-interface)

    ```solidity
    import "forge-std/Vm.sol";
    ```

- [`console.sol`](./console-log.md) and `console2.sol`: Hardhat-style logging functionality

    ```solidity
    import "forge-std/console.sol";
    ```

    **Note:** `console2.sol` contains patches to `console.sol` that allow Forge to decode traces for calls to the console, but it is not compatible with Hardhat.

    ```solidity
    import "forge-std/console2.sol";
    ```

- `Script.sol`: Basic utilities for [Solidity scripting](../../tutorials/solidity-scripting.md)

    ```solidity
    import "forge-std/Script.sol";
    ```

- `Test.sol`: The complete Forge Std experience (more details [below](#forge-stds-test))

    ```solidity
    import "forge-std/Test.sol";
    ```

### Forge Std's `Test`

The `Test` contract in `Test.sol` provides all the essential functionality you need to get started writing tests.

Simply import `Test.sol` and inherit from `Test` in your test contract:

```solidity
import "forge-std/Test.sol";

contract ContractTest is Test { ...
```

What's included:

- Std Libraries
  - [Std Logs](./std-logs.md): Expand upon the logging events from the DSTest library.
  - [Std Assertions](./std-assertions.md): Expand upon the assertion functions from the DSTest library.
  - [Std Cheats](./std-cheats.md): Wrappers around Forge cheatcodes for improved safety and DX.
  - [Std Errors](./std-errors.md): Wrappers around common internal Solidity errors and reverts.
  - [Std Storage](./std-storage.md): Utilities for storage manipulation.
  - [Std Math](./std-math.md): Useful mathematical functions.
  - [Script Utils](./script-utils.md): Utility functions which can be accessed in tests and scripts.
  - [Console Logging](./console-log.md): Console logging functions.

- A cheatcodes instance `vm`, from which you invoke Forge cheatcodes (see [Cheatcodes Reference](../../cheatcodes/))

    ```solidity
    vm.startPrank(alice);
    ```

- All Hardhat `console` functions for logging (see [Console Logging](./console-log.md))

    ```solidity
    console.log(alice.balance); // or `console2`
    ```

- All Dappsys Test functions for asserting and logging (see [Dappsys Test reference](../ds-test.md))

    ```solidity
    assertEq(dai.balanceOf(alice), 10000e18);
    ```

- Utility functions also included in `Script.sol` (see [Script Utils](./script-utils.md))

    ```solidity
    // Compute the address a contract will be deployed at for a given deployer address and nonce
    address futureContract = computeCreateAddress(alice, 1);
    ```
