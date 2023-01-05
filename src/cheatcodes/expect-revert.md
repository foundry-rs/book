## `expectRevert`

### Signature

```solidity
function expectRevert() external;
```

```solidity
function expectRevert(bytes4 message) external;
```

```solidity
function expectRevert(bytes calldata message) external;
```

### Description

If the **next call** does not revert with the expected data `message`, then `expectRevert` will.

After calling `expectRevert`, calls to other cheatcodes before the reverting call are ignored.

This means, for example, we can call [`prank`](./prank.md) immediately before the reverting call.

There are 3 signatures:

- **Without parameters**: Asserts that the next call reverts, regardless of the message.
- **With `bytes4`**: Asserts that the next call reverts with the specified 4 bytes.
- **With `bytes`**: Asserts that the next call reverts with the specified bytes.

> ⚠️ **Gotcha: Usage with low-level calls**
>
> Normally, a call that succeeds returns a status of `true` (along with any return data) and a call that reverts returns `false`.
>
> The Solidity compiler will insert checks that ensures that the call succeeded, and revert if it did not.
>
> The `expectRevert` cheatcode works by inverting this, so the next call after this cheatcode returns `true` if it reverts, and `false` otherwise.
>
> The implication here is that to use this cheatcode with low-level calls, you must manually assert on the call's status since Solidity is not doing it for you.
>
> For example:
>
> ```solidity
> function testLowLevelCallRevert() public {
>     vm.expectRevert(bytes("error message"));
>     (bool status, ) = address(myContract).call(myCalldata);
>     assertTrue(status, "expectRevert: call did not revert");
> }
> ```

### Examples

To use `expectRevert` with a `string`, pass it as a string literal.

```solidity
vm.expectRevert("error message");
```

To use `expectRevert` with a custom [error type][error-type] without parameters, use its selector.

```solidity
vm.expectRevert(CustomError.selector);
```

To use `expectRevert` with a custom [error type][error-type] with parameters, ABI encode the error type.

```solidity
vm.expectRevert(
    abi.encodeWithSelector(CustomError.selector, 1, 2)
);
```

If you need to assert that a function reverts _without_ a message, you can do so with `expectRevert(bytes(""))`.

```solidity
function testExpectRevertNoReason() public {
    Reverter reverter = new Reverter();
    vm.expectRevert(bytes(""));
    reverter.revertWithoutReason();
}
```

Message-less reverts happen when there is an EVM error, such as when the transaction consumes more than the block's gas limit.

If you need to assert that a function reverts a four character message, e.g. `AAAA`, you can do so with:

```solidity
function testFourLetterMessage() public {
    vm.expectRevert(bytes("AAAA"));
}
```

If used `expectRevert("AAAA")`, the compiler would throw an error because it wouldn't know which overload to use.

Finally, you can also have multiple `expectRevert()` checks in a single test.

```solidity
function testMultipleExpectReverts() public {
    vm.expectRevert("INVALID_AMOUNT");
    vault.send(user, 0);

    vm.expectRevert("INVALID_ADDRESS");
    vault.send(address(0), 200);
}
```

### SEE ALSO

Forge Standard Library

[Std Errors](../reference/forge-std/std-errors.md)

[error-type]: https://docs.soliditylang.org/en/v0.8.11/contracts.html#errors
