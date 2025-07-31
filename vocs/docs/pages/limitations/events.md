---
description: Event handling and logging limitations in ZKsync zkEVM context.
---

# Event Limitations

Event handling and logging have specific limitations in the zkEVM environment.

## Event Emission

- Events work similarly to EVM but with some differences
- Large events may have higher costs in zkEVM
- Event indexing may behave differently

## Log Filtering

- Log filtering capabilities may be limited
- Complex filter queries may not be supported
- Historical log access may have restrictions

## Event Ordering

- Event ordering within transactions may differ
- Cross-transaction event ordering considerations
- Block reorganization effects on events

## Performance Considerations

- Event emission costs may be higher in zkEVM
- Large numbers of events can impact performance
- Consider event design for zkEVM efficiency

## Testing Events

- `vm.expectEmit()` works but with zkEVM considerations
- Event assertions may need different approaches
- Cross-context event testing challenges