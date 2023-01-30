## `createSelectFork`

### Signature

```solidity
function createSelectFork(string calldata urlOrAlias) external returns (uint256);
```

```solidity
function createSelectFork(string calldata urlOrAlias, uint256 block) external returns (uint256);
```

```solidity
function createSelectFork(string calldata urlOrAlias, bytes32 transaction) external returns (uint256);
```

### Description

Creates _and_ selects a new fork from the given endpoint and returns the identifier of the fork. If a block number is passed as an argument, the fork will begin on that block, otherwise it will begin on the _latest_ block.

If a transaction hash is provided, it will roll the fork to the block the transaction was mined in and replays all previously executed transactions.

### Examples

Create and select a new mainnet fork with the latest block number:

```solidity
uint256 forkId = vm.createSelectFork(MAINNET_RPC_URL);

assertEq(block.number, 15_171_037); // as of time of writing, 2022-07-19 04:55:27 UTC
```

Create and select a new mainnet fork with a given block number:

```solidity
uint256 forkId = vm.createSelectFork(MAINNET_RPC_URL, 1_337_000);

assertEq(block.number, 1_337_000);
```

### SEE ALSO

- [createFork](./create-fork.md)
- [selectFork](./select-fork.md)
