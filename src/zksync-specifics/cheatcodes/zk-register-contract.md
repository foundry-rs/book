## `zkRegisterContract`

### Signature

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

### Description

Registers bytecodes for ZK-VM for transact/call and create instructions.

This is especially useful if specific contracts are already deployed on-chain (EVM or ZKsync). Since we compile with both `solc` and `zksolc` as defined in the [Dual Compilation](../compilation-overview.md#dual-compilation) section, if there's an already existing EVM bytecode that must be translated into its zkEVM counterpart, we need to define it with this cheatcode.

Such an operation must be carried out separately. The source of the pre-deployed contract must be obtained and compiled with zksolc. The json artifact will contain the `zkBytecodeHash` and `zkDeployedBytecode` parameters. The process is similar for obtaining EVM parameters with `solc` - `evmBytecodeHash`, `evmDeployedBytecode`, and `evmBytecode`.

The `name` parameter must be unique and not clash with locally existing contracts.

### Examples

```solidity
// LeetContract is pre-deployed on EVM on address(65536)

/// interface ILeetContract {
///     function leet() public {
///         // do something
///     }
/// }

vmExt.zkVm(true);
ILeetContract(address(65536)).leet();       // fails, as the contract was not found locally, so not migrated to zkEVM


vmExt.zkRegisterContract("LeetContract", 0x111.., 0x222.., 0x333..., 0x444..., 0x555...); // register LeetContract for migration
vmExt.zkVm(true);
ILeetContract(address(65536)).leet();       // succeeds, as the contract was registered via cheatcode, so migrated to zkEVM
```
