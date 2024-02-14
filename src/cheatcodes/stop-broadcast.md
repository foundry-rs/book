## `stopBroadprobe`

### Signature
```solidity
function stopBroadprobe() external;
```

### Description

Stops collecting transactions for later on-chain broadprobeing.

### Examples

```solidity
function deployNoArgs() public {
    // broadprobe the next call
    cheats.broadprobe();
    Test test1 = new Test();

    // broadprobe all calls between this line and `stopBroadprobe`
    cheats.startBroadprobe();
    Test test2 = new Test();
    cheats.stopBroadprobe();
}
```