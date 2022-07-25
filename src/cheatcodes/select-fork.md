## `selectFork`

### Signature

```solidity
function selectFork(uint256 forkId) external;
```

### Description

Takes a fork identifier created by `createFork` and sets the corresponding forked state as active.

### Examples

Select a previously created fork:

```solidity
uint256 forkId = vm.createFork(MAINNET_RPC_URL);

vm.selectFork(forkId);

assertEq(vm.activeFork(), forkId);
```

### SEE ALSO

- [createFork](./create-fork.md)
- [activeFork](./active-fork.md)
