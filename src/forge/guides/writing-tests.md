## Writing Tests

Let's go over the default way of writing tests, using the [`ds-test`](https://github.com/dapphub/ds-test) library.

> 👋 Gm
>
> See our [`ds-test` Docs](./ds-test-docs.md) if you're unfamiliar with the library.

`ds-test` provides basic logging and assertion functionality, and other test helpers.

To use it in your testing contract, import the `test.sol` and inherit from `DSTest`, like so:
```solidity
import "ds-test/src/test.sol"
contract ContractTest is DSTest {}
```

You should also import the contract you wish to test, example:
```solidity
import "src/contract.sol"
```
<br>

Forge uses the following keyboards in names of testing functions:
- `setUp` - the function called before each test
    ```solidity
    Contract contract;

    function setUp() public {
        contract = new Contract();
    }
    ```
- `test` - precedes the function name to mark it as a test
    ```solidity
    function testIncrement() public {
        contract.increment();
        assertEq(contract.counter(), 1);
    }
    ```
- `testFail` - the same as `test`, but is expected to fail (which will result in `[PASS]`)
    ```solidity
    function testFailDecrement() public {
        contract.decrement(); // expected to fail
    }
    ```
<br>

Fuzzing is supported.

Instead of hard coding function parameters, define argument types for your tests, like so:
```solidity
function testSetCounter(uint number) public {
    contract.setCounter(number);
}
```
Forge will populate those values at runtime and might uncover edge cases that cause your test to fail. It returns such an input to you if one is found.

We go more in dept on the topic in [Fuzz Testing](fuzz-testing.md).
