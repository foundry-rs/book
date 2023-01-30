## `createFork`

### Signature

```solidity
// Creates a new fork with the given endpoint and the _latest_ block and returns the identifier of the fork
function createFork(string calldata urlOrAlias) external returns (uint256)
```

```solidity
// Creates a new fork with the given endpoint and block and returns the identifier of the fork
function createFork(string calldata urlOrAlias, uint256 block) external returns (uint256);
```

```solidity
// Creates a new fork with the given endpoint and at the block the given transaction was mined in, and replays all transaction mined in the block before the transaction
function createFork(string calldata urlOrAlias, bytes32 transaction) external returns (uint256);
```

### Description

Creates a new fork from the given endpoint and returns the identifier of the fork. If a block number is passed as an argument, the fork will begin on that block, otherwise it will begin on the _latest_ block.

If a transaction hash is provided, it will roll the fork to the block the transaction was mined in and replays all previously executed transactions.

### Examples

Create a new mainnet fork with the latest block number:

```solidity
uint256 forkId = vm.createFork(MAINNET_RPC_URL);
vm.selectFork(forkId);

assertEq(block.number, 15_171_037); // as of time of writing, 2022-07-19 04:55:27 UTC
```

Create a new mainnet fork with a given block number:

```solidity
uint256 forkId = vm.createFork(MAINNET_RPC_URL, 1_337_000);
vm.selectFork(forkId);

assertEq(block.number, 1_337_000);
```

### SEE ALSO

- [activeFork](./active-fork.md)
- [selectFork](./select-fork.md)
- [createSelectFork](./create-select-fork.md)
