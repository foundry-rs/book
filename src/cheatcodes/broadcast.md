## `broadcast`

### Signature

```solidity
function broadcast() external;
```

```solidity
function broadcast(address who) external;
```

```solidity
function broadcast(uint256 privateKey) external;
```

### Description

Using the address that calls the test contract or the address / private key provided
as the sender, have the next call (at this call depth only) create a
transaction that can later be signed and sent onchain.

### Examples

```solidity
function deploy() public {
    cheats.broadcast(ACCOUNT_A);
    Test test = new Test();

    // this won't generate tx to sign
    uint256 b = test.t(4);

    // this will
    cheats.broadcast(ACCOUNT_B);
    test.t(2);

    // this also will, using a private key from your environment variables
    cheats.broadcast(vm.envUint("PRIVATE_KEY"));
    test.t(3);
} 
```