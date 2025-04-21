## `isContext`

### Signature

```solidity
enum ForgeContext {
    // Test group execution context (test, coverage or snapshot).
    TestGroup,
    // `forge test` execution context.
    Test,
    // `forge coverage` execution context.
    Coverage,
    // `forge snapshot` execution context.
    Snapshot,
    // Script group execution context (dry run, broadcast or resume).
    ScriptGroup,
    // `forge script` execution context.
    ScriptDryRun,
    // `forge script --broadcast` execution context.
    ScriptBroadcast,
    // `forge script --resume` execution context.
    ScriptResume,
    // Unknown `forge` execution context.
    Unknown
}

function isContext(ForgeContext context) external view returns (bool result);
```

### Description

Checks the current `forge` execution context.

### Examples

```solidity
import {VmSafe} from "forge-std/Vm.sol";

if (vm.isContext(VmSafe.ForgeContext.ScriptDryRun)) {
    // execute specific script dry run logic
}

if (vm.isContext(VmSafe.ForgeContext.ScriptBroadcast)) {
    // execute specific script broadcast logic
}

if (vm.isContext(VmSafe.ForgeContext.ScriptResume)) {
    // execute specific script resume logic
}
```
