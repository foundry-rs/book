## `readCallers`

### Signature

```solidity
enum CallerMode {
    None,
    Broadcast,
    RecurrentBroadcast,
    Prank,
    RecurrentPrank
}

function readCallers() 
external 
returns (CallerMode callerMode, address msgSender, address txOrigin);
```

### Description

Reads the current `CallerMode`, `msg.sender`, and `tx.origin`.

The `CallerMode` enum indicates if there is an active caller modification and the type.

- If there is an active prank:
  - `callerMode` will be equal to:
    - `CallerMode.Prank` if the prank has been set with [`prank`](./prank.md).
    - `CallerMode.RecurrentPrank` if the prank has been set with [`startPrank`](./start-prank.md).

- If there is an active broadcast:
  - `callerMode` will be equal to:
    - `CallerMode.Broadcast` if the broadcast has been set with [`broadcast`](./broadcast.md).
    - `CallerMode.RecurrentBroadcast` if the broadcast has been set with [`startBroadcast`](./start-broadcast.md).

- If no caller modification is active:
  - `callerMode` will be equal to `CallerMode.None`.

### Examples

```solidity
CallerMode callerMode;
address msgSender;
address txOrigin;

// Example 1
(callerMode, msgSender, txOrigin) = vm.readCallers();
assertEq(callerMode, CallerMode.None);
assertEq(msgSender, defaultSenderAddress);
assertEq(txOrigin, defaultOriginAddress);

// Example 2
vm.prank(senderPrankAddress);
(callerMode, msgSender, txOrigin) = vm.readCallers();
assertEq(callerMode, CallerMode.Prank);
assertEq(msgSender, senderPrankAddress);
assertEq(txOrigin, defaultOriginAddress);

// Example 3
vm.prank(senderPrankAddress, originPrankAddress);
(callerMode, msgSender, txOrigin) = vm.readCallers();
assertEq(callerMode, CallerMode.Prank);
assertEq(msgSender, senderPrankAddress);
assertEq(txOrigin, originPrankAddress);

// Example 4
vm.broadcast(broadcastAddress);
(callerMode, msgSender, txOrigin) = vm.readCallers();
assertEq(callerMode, CallerMode.Broadcast);
assertEq(msgSender, broadcastAddress);
assertEq(txOrigin, broadcastAddress);
```

### SEE ALSO

- [prank](./prank.md)
- [startPrank](./start-prank.md)
- [broadcast](./broadcast.md)
- [startBroadcast](./start-broadcast.md)
