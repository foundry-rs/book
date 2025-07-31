---
description: Cheatcode limitations and incompatibilities in ZKsync zkEVM context.
---

# Cheatcode Limitations

Not all Foundry cheatcodes are supported or work the same way in the zkEVM context.

## Unsupported Cheatcodes

Some cheatcodes are not supported in zkEVM mode:

- Cheatcodes that directly manipulate EVM state may not work
- Some debugging cheatcodes may have limited functionality
- Low-level EVM manipulation cheatcodes are not supported

## Modified Behavior

Some cheatcodes work differently in zkEVM:

- `vm.deal()` - Balance changes work but may have different effects
- `vm.prank()` - Works but with zkEVM-specific considerations
- `vm.mockCall()` - Limited support for certain call patterns

## zkEVM Context Restrictions

- Cheatcodes cannot be used within zkEVM execution context
- Once a transaction is dispatched to zkEVM, no cheatcodes are available
- Test logic must be structured to use cheatcodes only in EVM context

## Workarounds

- Use `vm.zkVmSkip()` to temporarily return to EVM for cheatcode usage
- Structure tests to use cheatcodes before zkEVM operations
- Consider using multiple test functions to separate concerns