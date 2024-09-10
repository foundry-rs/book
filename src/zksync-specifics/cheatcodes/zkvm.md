## `zkVm`

### Signature

```solidity

function zkVm(bool enable) external pure;
```

### Description

Enables/Disables ZKsync context for transact/call and create instructions within a test or script execution.

### Examples

```solidity
/// contract LeetContract {
///     function leet() public {
///         // do something
///     }
/// }

vm.zkVm(true);
new LeetContract(); // deployed in zkEVM
vm.zkVm(false);
new LeetContract(); // deployed in EVM
```
