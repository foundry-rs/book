## Additional Cheatcodes

In addition to the existing [Cheatcodes](../../cheatcodes/README.md), there are additional cheatcodes to help within the ZKsync context.


### Cheatcodes Interface

This is the extended Solidity interface for all ZKsync specific cheatcodes present in Forge.

```solidity
interface CheatCodesExt {
    /// Registers bytecodes for ZK-VM for transact/call and create instructions.
    function zkRegisterContract(
        string calldata name,
        bytes32 evmBytecodeHash,
        bytes calldata evmDeployedBytecode,
        bytes calldata evmBytecode,
        bytes32 zkBytecodeHash,
        bytes calldata zkDeployedBytecode
    ) external pure;

    /// Enables/Disables use ZK-VM usage for transact/call and create instructions.
    function zkVm(bool enable) external pure;

    /// When running in zkEVM context, skips the next CREATE or CALL, executing it on the EVM instead.
    /// All `CREATE`s executed within this skip, will automatically have `CALL`s to their target addresses
    /// executed in the EVM, and need not be marked with this cheatcode at every usage location.
    function zkVmSkip() external pure;

    /// Enables the use of a paymaster for the next transaction.
    function zkUsePaymaster(address paymaster, bytes calldata paymaster_input) external pure;
}
```


### Usage

Refer to the [forge-zksync-std](../forge-zksync-std.md) section on how to access these cheatcodes in your tests.