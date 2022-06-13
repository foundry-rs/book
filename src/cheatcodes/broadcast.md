## `broadcast`

### Signature

```solidity
function broadcast() external;
```

```solidity
function broadcast(address who) external;
```

### Description

Using the address that calls the test contract or the address provided
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
} 
```