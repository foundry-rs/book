## `activeFork`

### Signature

```solidity
function activeFork() external returns (uint256);
```

### Description

Returns the currently active fork. Reverts if no fork is currently active.

### Examples

Return the currently active fork:

```solidity
uint256 mainnetForkId = vm.createFork(MAINNET_RPC_URL);
uint256 optimismForkId = vm.createFork(OPTIMISM_RPC_URL);

assert(mainnetForkId != optimismForkId);

vm.selectFork(mainnetForkId);
assertEq(vm.activeFork(), mainnetForkId);

vm.selectFork(optimismForkId);
assertEq(vm.activeFork(), optimismForkId);
```

### SEE ALSO

- [createFork](./create-fork.md)
- [selectFork](./select-fork.md)
