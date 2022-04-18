## `mockCall`

### Signature

```solidity
function mockCall(address where, bytes calldata data, bytes calldata retdata) external;
```

### Description

Mocks all calls to an address `where` if the call data either strictly or loosely matches `data` and returns `retdata`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`.
If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If a match is found, then `retdata` is returned from the call.

Mocked calls are in effect until [`clearMockedCalls`](./clear-mocked-calls.md) is called.

> ℹ️ **Note**
>
> Calls to mocked addresses may revert if there is no code on the address.
> This is because Solidity inserts an `extcodesize` check before some contract calls.
>
> To circumvent this, use the [`etch`](./etch.md) cheatcode if the mocked address has no code.

> ℹ️ **Internal calls**
>
> This cheatcode does not currently work on internal calls. See issue [#432](https://github.com/foundry-rs/foundry/issues/432).

### Examples

Mocking an exact call:

```solidity
function testMockCall() public {
    vm.mockCall(
        address(0),
        abi.encodeWithSelector(MyToken.balanceOf.selector, address(1)),
        abi.encode(10)
    );
    assertEq(IERC20(address(0)).balanceOf(address(1)), 10);
}
```

Mocking an entire function:

```solidity
function testMockCall() public {
    vm.mockCall(
        address(0),
        abi.encodeWithSelector(MyToken.balanceOf.selector),
        abi.encode(10)
    );
    assertEq(IERC20(address(0)).balanceOf(address(1)), 10);
    assertEq(IERC20(address(0)).balanceOf(address(2)), 10);
}
```
