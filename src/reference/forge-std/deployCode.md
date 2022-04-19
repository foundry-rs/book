## `deployCode`

### Signature

```solidity
function deployCode(string memory what) public returns (address);
```

```solidity
function deployCode(string memory what, bytes memory args) public returns (address);
```

### Description

Deploys a contract by fetching the contract bytecode from the artifacts directory.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

### Examples

```solidity
address deployment = deployCode("MyContract.sol", abi.encode(arg1, arg2));
```
