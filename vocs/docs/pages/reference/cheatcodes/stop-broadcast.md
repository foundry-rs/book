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
    // broadcast the next call
    cheats.broadcast();
    Test test1 = new Test();

    // broadcast all calls between this line and `stopBroadcast`
    cheats.startBroadcast();
    Test test2 = new Test();
    cheats.stopBroadcast();
}
```