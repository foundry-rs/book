---
description: zkRegisterContract cheatcode for registering bytecodes for ZK-VM execution.
---

# zkRegisterContract

```solidity
function zkRegisterContract(
    string calldata name,
    bytes32 evmBytecodeHash,
    bytes calldata evmDeployedBytecode,
    bytes calldata evmBytecode,
    bytes32 zkBytecodeHash,
    bytes calldata zkDeployedBytecode
) external pure;
```

## Description

Registers bytecodes for ZK-VM for transact/call and create instructions. This cheatcode allows you to manually register the mapping between EVM and zkEVM bytecodes for contracts.

## Parameters

- `name`: Contract name identifier
- `evmBytecodeHash`: Hash of the EVM bytecode
- `evmDeployedBytecode`: The deployed EVM bytecode
- `evmBytecode`: The creation EVM bytecode
- `zkBytecodeHash`: Hash of the zkEVM bytecode
- `zkDeployedBytecode`: The deployed zkEVM bytecode

## Examples

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract ZkRegisterTest is Test, TestExt {
    function testRegisterContract() public {
        // Get bytecodes from compilation artifacts
        bytes memory evmBytecode = vm.getCode("MyContract.sol");
        bytes memory evmDeployedBytecode = vm.getDeployedCode("MyContract.sol");
        bytes memory zkDeployedBytecode = vm.getDeployedCode("MyContract.sol:zksolc");
        
        bytes32 evmHash = keccak256(evmBytecode);
        bytes32 zkHash = keccak256(zkDeployedBytecode);
        
        // Register the contract bytecodes
        vmExt.zkRegisterContract(
            "MyContract",
            evmHash,
            evmDeployedBytecode,
            evmBytecode,
            zkHash,
            zkDeployedBytecode
        );
        
        // Now the contract can be deployed and executed on zkEVM
        vmExt.zkVm(true);
        MyContract myContract = new MyContract();
    }
}
```

## Use Cases

- Manually managing bytecode mappings for complex deployment scenarios
- Working with pre-compiled contracts
- Advanced testing scenarios requiring specific bytecode configurations
- Debugging bytecode translation issues

## Notes

- This is typically handled automatically by foundry-zksync during compilation
- Manual registration is only needed for advanced use cases
- Ensure bytecode hashes are calculated correctly
- Both EVM and zkEVM bytecodes must be valid for the same contract logic