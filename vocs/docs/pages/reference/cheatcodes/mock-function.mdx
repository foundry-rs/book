## `mockFunction`

### Signature

```solidity
function mockFunction(address callee, address target, bytes calldata data) external;
```

### Description

Executes calls to an address `callee` with bytecode of address `target` if the call data either strictly or loosely matches `data`.

When a call is made to `callee` the call data is first checked to see if it matches in its entirety with `data`.
If not, the call data is checked to see if there is a partial match on function selector.

If a match is found, then call is executed using the bytecode of `target` address.

> ℹ️ **Isolated tests**
>
> This cheatcode does not currently work if using isolated test mode.

### Examples

For two contracts (with same storage layout):
```solidity
contract Counter {
    uint256 public a;

    function count(uint256 x) public {
        a = 321 + x;
    }
}

contract ModelCounter {
    uint256 public a;

    function count(uint256 x) public {
        a = 123 + x;
    }
}
```
Mocking an exact call to `count` function:

```solidity
function testMockFunction() public {
    vm.mockFunction(
        address(counter),
        address(model),
        abi.encodeWithSelector(Counter.count.selector, 456)
    );
    counter.count(456);
    assertEq(counter.a(), 123 + 456);
    counter.count(567);
    assertEq(counter.a(), 321 + 567);
}
```

Mocking all calls to `count` function:

```solidity
function testMockCall() public {
    vm.mockFunction(
        address(counter),
        address(model),
        abi.encodeWithSelector(Counter.count.selector)
    );
    counter.count(678);
    assertEq(counter.a(), 123 + 678);
    counter.count(789);
    assertEq(counter.a(), 123 + 789);
}
```

