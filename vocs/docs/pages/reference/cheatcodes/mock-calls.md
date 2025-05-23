## `mockCalls`

### Signature

```solidity
function mockCalls(address where, bytes calldata data, bytes[] calldata retdata) external;
```

```solidity
function mockCalls(
    address where,
    uint256 value,
    bytes calldata data,
    bytes[] calldata retdata
) external;
```

### Description

Mocks all calls to an address `where` if the call data either strictly or loosely
matches `data` and returns different data for each call based on the `retdata`
array values.

See [`mockCall`](./mock-call.md) for more information on mocking calls and
matching precedence.

> ℹ️ **Note**
>
> Any invocation of the mocked call beyond the number of elements in `retdata`
> will receive the last `retdata` element in response. `clearMockedCalls` can be
> called to clear the mock

### Examples

Mocking multiple `balanceOf(address)` calls:

```solidity
function testMockCall() public {
    bytes[] memory mocks = new bytes[](2);
    mocks[0] = abi.encode(2 ether);
    mocks[1] = abi.encode(1 ether);

    vm.mockCalls(
        address(0),
        abi.encodeWithSelector(IERC20.balanceOf.selector, address(1)),
        mocks
    );

    assertEq(IERC20(address(0)).balanceOf(address(1)), 2 ether);
    assertEq(IERC20(address(0)).balanceOf(address(1)), 1 ether);
}
```

Mocking multiple calls with `msg.value`:

```solidity
function testMockCallsWithMsgValue() public {
    bytes[] memory mocks = new bytes[](2);
    mocks[0] = abi.encode(2 ether);
    mocks[1] = abi.encode(1 ether);

    vm.mockCalls(
        address(0),
        1 ether,
        abi.encodeWithSelector(DexPool.swapETHForToken.selector),
        mocks
    );

    uint tokenAmount1 = DexPool(address(0)).swapETHForToken{value: 1 ether}();
    uint tokenAmount2 = DexPool(address(0)).swapETHForToken{value: 1 ether}();

    assertEq(tokenAmount1, 2 ether);
    assertEq(tokenAmount2, 1 ether);
}
```
