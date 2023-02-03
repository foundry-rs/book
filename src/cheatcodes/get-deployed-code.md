## `getDeployedCode`

### Signature

```solidity
function getDeployedCode(string calldata) external returns (bytes memory);
```

### Description

This cheatcode works similar to [`getCode`](./get-code.md) but only returns the **deployed** bytecode (aka runtime
bytecode) for a contract in the project given the path to the contract.

The main use case for this cheat code is as a shortcut to deploy stateless contracts to arbitrary addresses.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same)
, `ContractFile.sol:ContractName`, or the path to an artifact, relative to the root of your project.

> ℹ️ **Note**
>
> `getDeployedCode` requires read permission for the output directory, see [file cheatcodes](./fs.md).
>
> To grant read access set `fs_permissions = [{ access = "read", path = "./out"}]` in your `foundry.toml`.

### Examples

Deploy a stateless contract at an arbitrary address using `getDeployedCode` and [`etch`](./etch.md).

```solidity
// A stateless contract that we want deployed at a specific address
contract Override {
    event Payload(address sender, address target, bytes data);

    function emitPayload(
        address target, bytes calldata message
    ) external payable returns (uint256) {
        emit Payload(msg.sender, target, message);
        return 0;
    }
}

// get the **deployedBytecode**
bytes memory code = vm.getDeployedCode("Override.sol:Override");

// set the code of an arbitrary address
address overrideAddress = address(64);
vm.etch(overrideAddress, code);
assertEq(overrideAddress.code, code);
```

### SEE ALSO

Forge Standard Library

[`getCode`](./get-code.md)
[`etch`](./etch.md)

[forge-std]: ../reference/forge-std
