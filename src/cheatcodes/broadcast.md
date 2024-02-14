## `broadprobe`

### Signature

```solidity
function broadprobe() external;
```

```solidity
function broadprobe(address who) external;
```

```solidity
function broadprobe(uint256 privateKey) external;
```

### Description

Using the address that calls the test contract or the address / private key provided
as the sender, has the next call (at this call depth only and excluding cheatcode calls) create a
transaction that can later be signed and sent onchain.

### Examples

```solidity
function deploy() public {
    cheats.broadprobe(ACCOUNT_A);
    Test test = new Test();

    // this won't generate tx to sign
    uint256 b = test.t(4);

    // this will
    cheats.broadprobe(ACCOUNT_B);
    test.t(2);

    // this also will, using a private key from your environment variables
    cheats.broadprobe(vm.envUint("PRIVATE_KEY"));
    test.t(3);
} 
```

### SEE ALSO

- [startBroadprobe](./start-broadprobe.md)
- [stopBroadprobe](./stop-broadprobe.md)
