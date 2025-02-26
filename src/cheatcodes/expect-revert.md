## `expectRevert`

### Signature

```solidity
function expectRevert() external;
```

```solidity
function expectRevert(bytes4 message) external;
```

```solidity
function expectRevert(bytes4 message, address reverter) external;
```

```solidity
function expectRevert(bytes4 message, uint64 count) external;
```

```solidity
function expectRevert(bytes4 message, address reverter, uint64 count) external;
```

```solidity
function expectRevert(bytes calldata message) external;
```

```solidity
function expectRevert(bytes calldata message, address reverter) external;
```

```solidity
function expectRevert(bytes calldata message, uint64 count) external;
```

```solidity
function expectRevert(bytes calldata message, address reverter, uint64 count) external;
```

```solidity
function expectRevert(address reverter) external;
```

```solidity
function expectRevert(uint64 count) external;
```

```solidity
function expectRevert(address reverter, uint64 count) external;
```

```solidity
function expectPartialRevert(bytes4 message) external;
```

```solidity
function expectPartialRevert(bytes4 message, address reverter) external;
```

### Error

> ❌ **Error**
>
> If you see the following error:
>
> `[FAIL: call didn't revert at a lower depth than cheatcode call depth]`
>
> Carefully read the next sections!

To understand why you are getting this error you first have to understand what `call depth` means.

You can think of call depth in a similar way to function scoping. When you are entering an **external** call the call depth is increased by `1`.
When you exit the external call the call depth is decreased by `1`. If you have nested calls it looks as follows:

```ignore
0 → Contract A (calls B) → 1 → Contract B (calls C) → 2 → Contract C (returns) → 1 → Contract B (returns) → 0
```

**Internal** functions on the other hand do **NOT** increase the call depth. It is not actually making _calls_ but rather _jumping_ to the target location.

When testing **internal** functions with `vm.expectRevert` at the same call depth **ONLY** the **FIRST** `vm.expectRevert` is executed.

The following example shows where the footgun occurs. There are two `vm.expectRevert`'s that exist at the same call depth hence only the **FIRST** one is executed and the test returns a **SUCCESS**. This is likely different behavior from what you may assume.

```solidity
// DO NOT IMPLEMENT AS FOLLOWS! THIS IS AN INCORRECT USE.
function testMultipleReverts() public {
    vm.expectRevert();
    revert();

    vm.expectRevert();
    console2.log("Does not revert");
}
```

### Description

If the **next call** does not revert with the expected data `message`, then `expectRevert` will.

> ⚠️ **Usage**
>
> By default, `expectRevert*` cheatcodes work only for calls with greater depth than test depth (see [#3437](https://github.com/foundry-rs/foundry/issues/3437) foundry issue).
> Expecting reverts at the same depth as test depth can be enabled by setting `allow_internal_expect_revert` to `true` as follows:
>
> Selectively by using an inline configuration entry where it is **DEEMED SAFE**:
>
> Add `/// forge-config: default.allow_internal_expect_revert = true` above the test function.
>
> Or globally, this is discouraged:
>
> Add `allow_internal_expect_revert = true` to `foundry.toml`.

As long as you are not using `vm.expectRevert` on multiple internal functions is a single test function body it is generally considered safe.

You are recommended to apply this rule in a similar manner one would when tagging assembly blocks as `memory-safe`.

> **Note**
>
> For a call like `stable.donate(sUSD.balanceOf(user))`, the next call expected to revert is `sUSD.balanceOf(user)` and not `stable.donate()`.

After calling `expectRevert`, calls to other cheatcodes before the reverting call are ignored.

This means, for example, we can call [`prank`](./prank.md) immediately before the reverting call.

There are several signatures for `expectRevert`:

- **Without parameters**: Asserts that the next call reverts, regardless of the message.
- **With `bytes4` message**: Asserts that the next call reverts with the specified 4 bytes and exact match of revert data.
- **With `bytes` message**: Asserts that the next call reverts with the specified bytes.
- **With `address` reverter**: Asserts that the next call is reverted by the specified address.
- **With `uint64` count**: Expects an exact number of reverts from the upcoming calls. If set to 0, it can be used to assert that a revert is not made.

and two signatures for `expectPartialRevert`:

- **`bytes4` message**: Asserts that the next call reverts and the specified 4 bytes match the first 4 bytes of revert data.
- **`bytes4` message and reverter `address`**: Asserts that the next call is reverted by specified address and the specified 4 bytes match the first 4 bytes of revert data.

> ℹ️ **Note:**
>
> Custom errors can have arguments that sometimes are difficult to calculate in a testing environment or they may be unrelated to the test at hand (e.g. a value computed in the internal function of a third-party contract). In such cases, `expectPartialRevert` can be used to ignore arguments and match only on the selector of custom error. For example, testing a function that reverts with `WrongNumber(uint256 number)` custom error:
>
> ```solidity
> function count() public {
>     revert WrongNumber(0);
> }
> ```
>
> should pass when using `expectPartialRevert`:
>
> ```solidity
> vm.expectPartialRevert(Counter.WrongNumber.selector);
> counter.count();
> ```
>
> but fails if exact match expected:
>
> ```solidity
> vm.expectRevert(Counter.WrongNumber.selector);
> counter.count();
> ```

> ⚠️ **Gotcha: Usage with low-level calls**
>
> Normally, a call that succeeds returns a status of `true` (along with any return data) and a call that reverts returns `false`.
>
> The Solidity compiler will insert checks that ensures that the call succeeded, and revert if it did not.
>
> On low level calls, the `expectRevert` cheatcode works by making the `status` boolean returned by the low level call correspond to whether the `expectRevert` succeeded or not, NOT whether or not the low-level call succeeds. Therefore, `status` being false corresponds to the cheatcode failing.
>
> Apart from this, `expectRevert` also mangles return data on low level calls, and is not usable.
>
> See the following example. For clarity, `status` has been renamed to `revertsAsExpected`:
>
> ```solidity
> function testLowLevelCallRevert() public {
>     vm.expectRevert(bytes("error message"));
>     (bool revertsAsExpected, ) = address(myContract).call(myCalldata);
>     assertTrue(revertsAsExpected, "expectRevert: call did not revert");
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

To use `expectPartialRevert` with a custom [error type][error-type], use its selector.

```solidity
vm.expectPartialRevert(CustomError.selector);
```

### SEE ALSO

Forge Standard Library

[Std Errors](../reference/forge-std/std-errors.md)

[error-type]: https://docs.soliditylang.org/en/v0.8.11/contracts.html#errors
