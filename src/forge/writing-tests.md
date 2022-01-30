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
}
```

Forge uses the following keywords in tests:

- `setUp`: An optional function invoked before each test case is run
    ```solidity
    Contract contract;

    function setUp() public {
        contract = new Contract();
    }
    ```
- `test`: Functions prefixed with `test` are run as a test case
    ```solidity
    function testIncrement() public {
        contract.increment();
        assertEq(contract.counter(), 1);
    }
    ```
- `testFail`: The inverse of the `test` prefix - if the function does not revert, the test fails.
    ```solidity
    function testFailDecrement() public {
        contract.decrement(); // expected to fail
    }
    ```
<br>

It is possible to use other testing libraries or roll your own. For example, if you find yourself lacking a special type of assertion, you could extend `ds-test`.

> 📚 Reference
> 
> See the [`ds-test` Reference](../reference/ds-test.md) for a complete overview of the logging functionality and assertions in `ds-test`.
