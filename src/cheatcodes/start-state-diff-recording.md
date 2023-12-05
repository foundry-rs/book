## `startStateDiffRecording`

### Signature

```solidity
function startStateDiffRecording()
```

### Description

Records all state changes as part of CREATE, CALL or SELFDESTRUCT opcodes in order,
along with the context of the calls.
Refer to [`stopAndReturnStateDiff`](./stop-and-return-state-diff.md) for more details on how to access and interpret the recorded state changes.