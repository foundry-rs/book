---
description: Tracing and debugging limitations in ZKsync zkEVM environment.
---

# Trace Limitations

Tracing and debugging capabilities have limitations in the zkEVM environment.

## Trace Availability

- zkEVM traces are different from EVM traces
- Some trace information may not be available
- Call stack traces may have different format

## Debugging Challenges

- Traditional EVM debugging tools may not work
- Step-by-step debugging is limited
- Variable inspection may be restricted

## Console Logging

- `console.log` works but may have performance impacts
- Logging in zkEVM context may be limited
- Large amounts of logging can affect execution

## Gas Tracing

- Gas calculations are different in zkEVM
- Gas traces may not directly correspond to EVM gas usage
- Profiling tools may need zkEVM-specific adaptations

## Mitigation Strategies

- Use events for debugging information
- Structure code to minimize zkEVM-specific debugging needs
- Test critical logic in both EVM and zkEVM contexts