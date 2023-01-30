## `transact`

### Signature

```solidity
// Fetches the given transaction from the active fork and executes it on the current state
function transact(bytes32 txHash) external;
// Fetches the given transaction from the given fork and executes it on the current state
function transact(uint256 forkId, bytes32 txHash) external;
```

### Description

In forking mode, fetches the Transaction from the provider and executes it on the current state

### Examples

Enter forking mode and execute a transaction:

```solidity
// Enter forking mode at block: https://etherscan.io/block/15596646
uint256 fork = vm.createFork(MAINNET_RPC_URL, 15596646);
vm.selectFork(fork);

// a random transfer transaction in the block: https://etherscan.io/tx/0xaba74f25a17cf0d95d1c6d0085d6c83fb8c5e773ffd2573b99a953256f989c89
bytes32 tx = 0xaba74f25a17cf0d95d1c6d0085d6c83fb8c5e773ffd2573b99a953256f989c89;

address sender = address(0xa98218cdc4f63aCe91ddDdd24F7A580FD383865b);
address recipient = address(0x0C124046Fa7202f98E4e251B50488e34416Fc306);

assertEq(sender.balance, 5764124000000000);
assertEq(recipient.balance, 3936000000000000);

// transfer amount: 0.003936 Ether
uint256 transferAmount = 3936000000000000;

// expected balance changes once the transaction is executed
uint256 expectedRecipientBalance = recipient.balance + transferAmount;
uint256 expectedSenderBalance = sender.balance - transferAmount;

// execute the transaction
vm.transact(tx);

// recipient received transfer
assertEq(recipient.balance, expectedRecipientBalance);

// sender's balance decreased by transferAmount and gas
assert(sender.balance < expectedSenderBalance);

```

### SEE ALSO

- [roll](./roll.md)
- [createFork](./create-fork.md)
- [selectFork](./select-fork.md)
- [activeFork](./active-fork.md)
