## `deployCodeTo`

### Signature

```solidity
function deployCodeTo(string memory what, address where) internal virtual;
```

```solidity
function deployCodeTo(string memory what, bytes memory args, address where) internal virtual;
```

```solidity
function deployCodeTo(string memory what, bytes memory args, uint256 value, address where) internal virtual;
```

### Description

Pseudo-deploys a contract to an arbitrary address by fetching the contract bytecode from the artifacts directory. This can be used to recreate the production environment.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

Values can also be passed by using the `value` parameter. This is necessary if you need to send ETH on construction.

### Examples

```solidity
deployCodeTo("MyContract.sol", abi.encode(arg1, arg2), arbitraryAddr);
```

### SEE ALSO

Spark Standard Library

- [`deployCode`](./deployCode.md)
