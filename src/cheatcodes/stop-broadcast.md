## `stopBroadcast`

### Signature
```solidity
function stopBroadcast() external;
```

### Description

Stops collecting transactions for later on-chain broadcasting.

### Examples

```solidity
function deployNoArgs() public {
    cheats.broadcast();
    Test test1 = new Test();

    cheats.startBroadcast();
    Test test2 = new Test();
    cheats.stopBroadcast();
}
```