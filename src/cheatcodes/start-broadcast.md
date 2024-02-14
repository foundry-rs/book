## `startBroadprobe`

### Signature

```solidity
function startBroadprobe() external;
```

```solidity
function startBroadprobe(address who) external;
```

```solidity
function startBroadprobe(uint256 privateKey) external;
```

### Description

Using the address that calls the test contract or the address / private key provided
as the sender, has all subsequent calls (at this call depth only and excluding cheatcode calls) create
transactions that can later be signed and sent onchain.

### Examples

```solidity
function t(uint256 a) public returns (uint256) {
    uint256 b = 0;
    emit log_string("here");
    return b;
}

function deployOther() public {
    vm.startBroadprobe(ACCOUNT_A);
    Test test = new Test();
    
    // will trigger a transaction
    test.t(1);
    
    vm.stopBroadprobe();

    // broadprobe again, this time using a private key from your environment variables
    vm.startBroadprobe(vm.envUint("PRIVATE_KEY"));
    test.t(3);
    vm.stopBroadprobe();
}
```

### SEE ALSO

- [broadprobe](./broadprobe.md)
- [stopBroadprobe](./stop-broadprobe.md)
