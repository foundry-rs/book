## Writing Tests

Tests are written in Solidity. If the test function reverts, the test fails, otherwise it passes.

Let's go over the most common way of writing tests, using the [`ds-test`](https://github.com/dapphub/ds-test) library.

`ds-test` provides basic logging and assertion functionality. To use it in your testing contract, import `ds-test/test.sol` and inherit from `DSTest`, like so:

```solidity
{{#include ../../projects/writing_tests/src/test/Basic.t.sol:import}}
```

Let's examine a basic test using `ds-test`:

```solidity
{{#include ../../projects/writing_tests/src/test/Basic.t.sol:all}}
```

Forge uses the following keywords in tests:

- `setUp`: An optional function invoked before each test case is run
    ```solidity
    {{#include ../../projects/writing_tests/src/test/Basic.t.sol:setUp}}
    ```
- `test`: Functions prefixed with `test` are run as a test case
    ```solidity
    {{#include ../../projects/writing_tests/src/test/Basic.t.sol:testNumberIs42}}
    ```
- `testFail`: The inverse of the `test` prefix - if the function does not revert, the test fails
    ```solidity
    {{#include ../../projects/writing_tests/src/test/Basic.t.sol:testFailSubtract43}}
    ```
    A good practice is to use something like `testCannot` in combination with the [`expectRevert`](../reference/cheatcodes.md#expectrevert) cheatcode (cheatcodes are explained in greater detail in the following [section](./cheatcodes.md)). Now instead of using `testFail`, you know exactly what reverted:
    ```solidity
    {{#include ../../projects/writing_tests/src/test/Basic2.t.sol:testCannotSubtract43}}
    ```
<br>

Tests are deployed to `0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84`. If you deploy a contract within your test, then `0xb4c...7e84` will be its deployer. If the contract deployed within a test gives special permissions to its deployer, such as `Ownable.sol`'s `onlyOwner` modifier, then the test contract `0xb4c...7e84` will have those permissions.

It is possible to use other testing libraries or roll your own. For example, if you find yourself lacking a special type of assertion, you could extend `ds-test`.

### Shared setups

It is possible to use shared setups by creating helper abstract contracts and inheriting them in your test contracts:

```solidity
abstract contract HelperContract {
    address constant IMPORTANT_ADDRESS = 0x543d...;
    SomeContract someContract;
    constructor() {...}
    function testSomething() public {...}
}

contract MyContractTest is HelperContract {
    function setUp() public {
        someContract = new SomeContract(0, IMPORTANT_ADDRESS);
        ...
    }
}
```

<br>

> 📚 **Reference**
>
> See the [`ds-test` Reference](../reference/ds-test.md) for a complete overview of the logging functionality and assertions in `ds-test`.

> 💡 **Tip**
>
> Use the [`getCode`](../reference/cheatcodes.md#getcode) cheatcode to deploy contracts with incompatible Solidity versions.
