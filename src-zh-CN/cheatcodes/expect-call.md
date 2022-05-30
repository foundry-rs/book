## `expectCall`

```solidity
function expectCall(address where, bytes calldata data) external;
```

```solidity
function expectCall(
    address where,
    uint256 value,
    bytes calldata data
) external;
```

### Description

Expects at least one call to address `where`, where the call data either strictly or loosely matches `data`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

**Using the second signature** we can also check if the call was made with the expected `msg.value`.

If the test terminates without the call being made, the test fails.

> ℹ️ **Internal calls**
>
> This cheatcode does not currently work on internal calls. See issue [#432](https://github.com/foundry-rs/foundry/issues/432).

### Examples

Expect that `transfer` is called on a token `MyToken`:

```solidity
address alice = address(10);
vm.expectCall(
  address(token), abi.encodeCall(token.transfer, (alice, 10))
);
token.transfer(alice, 10);
// [PASS]
```

Expect that `pay` is called on a `Contract` with a specific `msg.value` and `calldata`:

```solidity
Contract target = new Contract();
vm.expectCall(
            address(target),
            1,
            abi.encodeWithSelector(target.pay.selector, 2)
        );
target.pay{value: 1}(2);
// [PASS]
```