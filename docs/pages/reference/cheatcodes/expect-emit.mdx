## `expectEmit`

### Signature

```solidity
function expectEmit() external;
```

```solidity
function expectEmit(
    bool checkTopic1,
    bool checkTopic2,
    bool checkTopic3,
    bool checkData
) external;
```

```solidity
function expectEmit(address emitter) external;
```

```solidity
function expectEmit(
    bool checkTopic1,
    bool checkTopic2,
    bool checkTopic3,
    bool checkData,
    address emitter
) external;
```

### Description

Asserts that a specific log is emitted during the next call.

1. Call the cheat code, specifying whether we should check the first, second or third topic, and the log data (`expectEmit()` checks them all). Topic 0 is always checked.
2. Emit the event we are supposed to see during the next call.
3. Perform the call.

You can perform steps 1 and 2 multiple times to match a _sequence_ of events in the next call.

If the event is not available in the current scope (e.g. if we are using an interface, or an external smart contract), we can define the event ourselves with an identical event signature.

There are 2 varieties of `expectEmit`:

- **Without checking the emitter address**: Asserts the topics match **without** checking the emitting address.
- **With `address`**: Asserts the topics match and that the emitting address matches.

> ℹ️ **Matching sequences**
>
> In functions that emit a lot of events, it's possible to "skip" events and only match a specific sequence,
> but this sequence must always be in order. As an example, let's say a 
> function emits events: `A, B, C, D, E, F, F, G`.
>
> `expectEmit` will be able to match ranges with and without skipping events in between:
> - `[A, B, C]` is valid.
> - `[B, D, F]` is valid.
> - `[G]` or any other single event combination is valid.
> - `[B, A]` or similar out-of-order combinations are **invalid** (events must be in order).
> - `[C, F, F]` is valid.
> - `[F, F, C]` is **invalid** (out of order).

### Examples

This does not check the emitting address.

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function testERC20EmitsTransfer() public {
    vm.expectEmit();

    // We emit the event we expect to see.
    emit MyToken.Transfer(address(this), address(1), 10);

    // We perform the call.
    myToken.transfer(address(1), 10);
}
```

This does check the emitting address.

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function testERC20EmitsTransfer() public {
    // We check that the token is the event emitter by passing the address.
    vm.expectEmit(address(myToken));
    emit MyToken.Transfer(address(this), address(1), 10);

    // We perform the call.
    myToken.transfer(address(1), 10);
}
```

We can also assert that multiple events are emitted in a single call.

```solidity
function testERC20EmitsBatchTransfer() public {
    // We declare multiple expected transfer events
    for (uint256 i = 0; i < users.length; i++) {
        // Here we use the longer signature for demonstration purposes. This call checks
        // topic0 (always checked), topic1 (true), topic2 (true), NOT topic3 (false), and data (true).
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(this), users[i], 10);
    }

    // We also expect a custom `BatchTransfer(uint256 numberOfTransfers)` event.
    vm.expectEmit(false, false, false, true);
    emit BatchTransfer(users.length);

    // We perform the call.
    myToken.batchTransfer(users, 10);
}
```

This example fails, as the expected event is not emitted on the next call.
```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function testERC20EmitsTransfer() public {
    // We check that the token is the event emitter by passing the address as the fifth argument.
    vm.expectEmit(true, true, false, true, address(myToken));
    emit MyToken.Transfer(address(this), address(1), 10);

    // We perform an unrelated call that won't emit the intended event,
    // making the cheatcode fail.
    myToken.approve(address(this), 1e18);
    // We perform the call, but it will have no effect as the cheatcode has already failed.
    myToken.transfer(address(1), 10);
}
```
