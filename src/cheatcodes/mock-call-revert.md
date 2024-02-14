## `mockCallRevert`

### Signature

```solidity
function mockCallRevert(address where, bytes calldata data, bytes calldata retdata) external;
```

```solidity
function mockCallRevert(
    address where,
    uint256 value,
    bytes calldata data,
    bytes calldata retdata
) external;
```

### Description

Reverts all calls to an address `where` if the call data either strictly or loosely matches `data` and returns `retdata`.

`retdata` can be a raw return message or a custom error.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`.
If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If a match is found, then the call is reverted and `retdata` is returned.


**Using the second signature** we can mock the calls with a specific `msg.value`. `Calldata` match takes precedence over `msg.value` in case of ambiguity.

Reverted mock calls are in effect until [`clearMockedCalls`](./clear-mocked-calls.md) is called.

> ℹ️ **Internal calls**
>
> This cheatcode does not currently work on internal calls. See issue [#432](https://github.com/foxar-rs/foxar/issues/432).

### Examples

Reverting an exact call with a raw error message:

```solidity
function testMockCallRevert() public {
    vm.mockCallRevert(
        address(0),
        abi.encodeWithSelector(MyToken.balanceOf.selector, address(1)),
        abi.encode("REVERT_MESSAGE")
    );
    vm.expectRevert("REVERT_MESSAGE");
    IERC20(address(0)).balanceOf(address(1));
}
```

Reverting a call with a custom error:

```solidity
function testMockCallRevertWithCustomError() public {
    bytes memory customError = abi.encodeWithSelector(TestError.selector, "ERROR_MESSAGE");
    vm.mockCallRevert(
        address(0),
        abi.encodeWithSelector(MyToken.balanceOf.selector, address(1)),
        customError
    );
    vm.expectRevert(customError);
    IERC20(address(0)).balanceOf(address(1));
}
```

Mocking a call with a given `msg.value`:

```solidity
function testMockCallRevertWithValue() public {
    assertEq(example.pay{value: 10}(1), 1);
    assertEq(example.pay{value: 1}(2), 2);
    vm.mockCallRevert(
        address(example),
        10,
        abi.encodeWithSelector(example.pay.selector),
        "ERROR_MESSAGE"
    );
    assertEq(example.pay{value: 1}(2), 2);
    vm.expectRevert("ERROR_MESSAGE");
    assertEq(example.pay{value: 10}(1), 99);
}
```
