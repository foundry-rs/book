## `expectEmit`

### Signature

```solidity
function expectEmit(
    bool checkTopic1,
    bool checkTopic2,
    bool checkTopic3,
    bool checkData
) external;
```

### Description

Assert a specific log is emitted before the end of the current function.

1. Call the cheat code, specifying whether we should check the first, second or third topic, and the log data. Topic 0 is always checked.
2. Emit the event we are supposed to see before the end of the current function.
3. Perform the call.

If the event is not available in the current scope (e.g. if we are using an interface, or an external smart contract), we can define the event ourselves with an identical event signature.

The cheatcode does not check the origin of the event, but simply that it was emitted.

> ℹ️ **Ordering matters**
>
> If we call `expectEmit` and emit an event, then the next event emitted **must** match the one we expect.

### Examples

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function testERC20EmitsTransfer() public {
    // Only `src` and `dst` are indexed in ERC20's `Transfer` event,
    // so we specifically check topics 1 and 2 (topic 0 is always checked by default),
    // as well as the data (`amount`).
    vm.expectEmit(true, true, false, true);

    // We emit the event we expect to see.
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
        vm.expectEmit(true, true, true, true);
        emit Transfer(address(this), users[i], 10);
    }

    // We also expect a custom `BatchTransfer(uint256 numberOfTransfers)` event.
    vm.expectEmit(false, false, false, false);
    emit BatchTransfer(users.length);

    // We perform the call.
    myToken.batchTransfer(users, 10);
}
```
