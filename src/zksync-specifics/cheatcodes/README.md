## Additional Cheatcodes

In addition to the existing [Cheatcodes](../../cheatcodes/README.md), there are additional cheatcodes to help within the ZKsync context.


### Cheatcodes Interface

This is the extended Solidity interface for all ZKsync specific cheatcodes present in Forge.

```solidity
interface CheatCodes {
    /// Existing forge cheatcodes
    ...

    /// Enables/Disables use ZK-VM usage for transact/call and create instructions.
    function zkVm(bool enable) external pure;
}
```
