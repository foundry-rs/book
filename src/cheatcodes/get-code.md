## `getCode`

### Signature

```solidity
function getCode(string calldata) external returns (bytes memory);
```

### Description

Returns the **creation** bytecode for a contract in the project given the path to the contract.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

> ℹ️ **Note**
>
> `getCode` requires read permission for the output directory, see [file cheatcodes](./fs.md).
>
> To grant read access set `fs_permissions = [{ access = "read", path = "./out"}]` in your `foundry.toml`.

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

Deploy a contract to an arbitrary address by combining `getCode` and [`etch`](./etch.md)

```solidity

// Deploy
bytes memory args = abi.encode(arg1, arg2);
bytes memory bytecode = abi.encodePacked(vm.getCode("MyContract.sol:MyContract"), args);
address deployed;
assembly {
deployed := create(0, add(bytecode, 0x20), mload(bytecode))
}

// Set the bytecode of an arbitrary address
vm.etch(targetAddr, deployed.code);
```

### SEE ALSO

Forge Standard Library

[`deployCode`](../reference/forge-std/deployCode.md)
[`getDeployedCode`](./get-deployed-code.md)
[`eth`](./etch.md)

[forge-std]: ../reference/forge-std
