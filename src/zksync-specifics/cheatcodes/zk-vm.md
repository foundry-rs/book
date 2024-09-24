## `zkVm`

### Signature

```solidity
function zkVm(bool enable) external pure;
```

### Description

Enables/Disables ZKsync context for transact/call and create instructions within a test or script execution.

Switching VMs is a intensive process that translates the entire storage back-and-forth between EVM and zkEVM, and as such must be used sparingly in a test to switch between contexts. 

See [Execution Overview](../execution-overview.md#execution-overview) for further details.

See [zkVmSkip](./zk-vm-skip.md) for a one-off and much simpler operation.

### Examples

```solidity
/// contract LeetContract {
///     constructor(uint8 value) public {
///         // do something
///     }
/// }

vmExt.zkVm(true);
new LeetContract(1); // deployed in zkEVM
new LeetContract(2); // deployed in zkEVM

vmExt.zkVm(false);
new LeetContract(3); // deployed in EVM
new LeetContract(4); // deployed in EVM
```
