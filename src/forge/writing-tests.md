## Writing Tests

Tests are written in Solidity. If the test function reverts, the test fails, otherwise it passes.

Let's go over the most common way of writing tests, using the [`ds-test`](https://github.com/dapphub/ds-test) library.

`ds-test` provides basic logging and assertion functionality.

To use it in your testing contract, import `ds-test/test.sol` and inherit from `DSTest`, like so:

```solidity
import "ds-test/test.sol";

contract ContractTest is DSTest {
    // ... tests ...
}
```

Let's examine a basic test using `ds-test`:

```solidity
import "ds-test/test.sol";

contract BasicTest is DSTest {
    uint256 testNumber;

    function setUp() public {
        testNumber = 42;
    }

    function testNumberIs42() public {
        assertEq(testNumber, 42);
    }

    function testFailUnderflow() public {
        testNumber -= 43;
    }
}
```

Forge uses the following keywords in tests:

- `setUp`: An optional function invoked before each test case is run
    ```solidity
    uint256 testNumber;

    function setUp() public {
        testNumber = 42;
    }
    ```
- `test`: Functions prefixed with `test` are run as a test case
    ```solidity
    function testNumberIs42() public {
        assertEq(testNumber, 42);
    }
    ```
- `testFail`: The inverse of the `test` prefix - if the function does not revert, the test fails.
    ```solidity
    function testFailUnderflow() public {
        testNumber -= 43;
    }
    ```
<br>

Tests are deployed to `0xb4c79dab8f259c7aee6e5b2aa729821864227e84`. If you deploy a contract within your test, then `0xb4c...7e84` will be its deployer. If the contract deployed within a test gives special permissions to its deployer, such as `Ownable.sol`'s `onlyOwner` modifier, then the test contract `0xb4c...7e84` will have those permissions.

It is possible to use other testing libraries or roll your own. For example, if you find yourself lacking a special type of assertion, you could extend `ds-test`.

> 📚 **Reference**
>
> See the [`ds-test` Reference](../reference/ds-test.md) for a complete overview of the logging functionality and assertions in `ds-test`.

> 💡 **Tip**
>
> Use the [`getCode`](../reference/cheatcodes.md#getcode) cheatcode to deploy contracts with incompatible Solidity versions.
