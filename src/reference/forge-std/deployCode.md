## `deployCode`

### Signature

```solidity
function deployCode(string memory what) public returns (address);
```

```solidity
function deployCode(string memory what, bytes memory args) public returns (address);
```

```solidity
function deployCode(string memory what, uint256 val) public returns (address);
```

```solidity
function deployCode(string memory what, bytes memory args, uint256 val) public returns (address);
```

### Description

Deploys a contract by fetching the contract bytecode from the artifacts directory.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

Values can also be passed by using the `val` parameter. This is necessary if you need to send ETH on construction.

### Examples

```solidity
address deployment = deployCode("MyContract.sol", abi.encode(arg1, arg2));
```

### SEE ALSO

Spark Standard Library

- [`deployCodeTo`](./deployCodeTo.md)