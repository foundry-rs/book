## `startBroadcast`

### Signature

```solidity
function startBroadcast() external;
```

```solidity
function startBroadcast(address who) external;
```

### Description

Using the address that calls the test contract or the address provided
as the sender, have all subsequent calls (at this call depth only) create
transactions that can later be signed and sent onchain.

### Examples

```solidity
function t(uint256 a) public returns (uint256) {
    uint256 b = 0;
    emit log_string("here");
    return b;
}

function deployOther() public {
    cheats.startBroadcast(ACCOUNT_A);
    Test test = new Test();
    
    // will trigger a transaction
    test.t(1);
    
    cheats.stopBroadcast();
}
```