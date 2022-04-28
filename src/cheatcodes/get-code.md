## `getCode`

### Signature

```solidity
function getCode(string calldata) external returns (bytes memory);
```

### Description

Returns the **deployment** bytecode for a contract in the project given the path to the contract.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

### Examples

```solidity
MyContract myContract = new MyContract(arg1, arg2);

// Let's do the same thing with `getCode`
bytes memory args = abi.encode(arg1, arg2);
bytes memory bytecode = abi.encodePacked(vm.getCode("MyContract.sol:MyContract"), args);
address anotherAddress;
assembly {
    anotherAddress := create(0, add(bytecode, 0x20), mload(bytecode))
}

assertEq0(address(myContract).code, anotherAddress.code); // [PASS]
```

### SEE ALSO

Forge Standard Library

[`deployCode`](../reference/forge-std/deployCode.md)

[forge-std]: ../reference/forge-std
