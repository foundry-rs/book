## `createSelectFork`

### Signature

```solidity
function createSelectFork(string calldata urlOrAlias) external returns(uint256);
```

```solidity
function createSelectFork(string calldata urlOrAlias, uint256 block) external returns(uint256);
```

### Description

Creates _and_ selects a new fork from the given endpoint and returns the identifier of the fork. If a block number is passed as an argument, the fork will begin on that block, otherwise it will begin on the _latest_ block.

> ℹ️ **Important Note xyz**
>
> note xyz

### Tips

- tip xyz

### Examples

Something something xyz `transfer` is called on a token `MyToken`:

```solidity
example xyz
```

Something something xyz `pay` is called on a `Contract` with a specific `msg.value` and `calldata`:

```solidity
example xyz
```

### SEE ALSO

- [createFork](./createFork.md)
- [selectFork](./selectFork.md)
