## `assumeNotPrecompile`

### Signature

```solidity
function assumeNotPrecompile(address addr) public;
```

```solidity
function assumeNotPrecompile(address addr, uint256 chainid) public;
```

### Description

Uses [`assume`](../../cheatcodes/assume.md) to filter precompile addresses from the fuzz tests.

Optionally, a `chainid` may be specified to filter known precompiles on the respective chain.

### SEE ALSO

[Precompile Registry](../../misc/precompile-registry.md)
