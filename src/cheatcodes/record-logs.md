## `recordLogs`

### Signature

```solidity
function recordLogs() external;
```

### Description

Tells the VM to start recording all the emitted events. To access them, use [`getRecordedLogs`](./get-recorded-logs.md).


### Examples

```solidity
/// event LogCompleted(
///   uint256 indexed topic1,
///   bytes data
/// );

vm.recordLogs();

emit LogCompleted(10, "operation completed");

Vm.Log[] memory entries = vm.getRecordedLogs();

assertEq(entries.length, 1);
assertEq(entries[0].topics[0], keccak256("LogCompleted(uint256,bytes)"));
assertEq(entries[0].topics[1], bytes32(uint256(10)));
assertEq(abi.decode(entries[0].data, (string)), "operation completed");
```
