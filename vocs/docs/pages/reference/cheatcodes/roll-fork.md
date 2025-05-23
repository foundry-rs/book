## `rollFork`

### Signature

```solidity
// roll the _active_ fork to the given block
function rollFork(uint256 blockNumber) external;
```

```solidity
// roll the _active_ fork to the block in which the transaction was mined it and replays all previously executed transactions
function rollFork(bytes32 transaction) external;
```

```solidity
// Same as `rollFork(uint256 blockNumber)` but uses the fork corresponding to the `forkId`
function rollFork(uint256 forkId, uint256 blockNumber) external;
```

```solidity
// Same as `rollFork(bytes32 transaction)` but uses the fork corresponding to the `forkId`
function rollFork(uint256 forkId, bytes32 transaction) external;
```

### Description

Sets `block.number`. If a fork identifier is passed as an argument, it will update that fork, otherwise it will update the currently active fork.

If a transaction hash is provided, it will roll the fork to the block the transaction was mined in and replays all previously executed transactions.

### Examples

Set `block.number` for the currently active fork:

```solidity
uint256 forkId = vm.createFork(MAINNET_RPC_URL);
vm.selectFork(forkId);

assertEq(block.number, 15_171_037); // as of time of writing, 2022-07-19 04:55:27 UTC

vm.rollFork(15_171_057);

assertEq(block.number, 15_171_057);
```

Set `block.number` for the fork identified by the passed `forkId` argument:

```solidity
uint256 optimismForkId = vm.createFork(OPTIMISM_RPC_URL);

vm.rollFork(optimismForkId, 1_337_000);

vm.selectFork(optimismForkId);

assertEq(block.number, 1_337_000);
```

### SEE ALSO

- [roll](./roll.md)
- [createFork](./create-fork.md)
- [selectFork](./select-fork.md)
- [activeFork](./active-fork.md)
