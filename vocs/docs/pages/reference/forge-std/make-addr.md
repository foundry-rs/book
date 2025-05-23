## `makeAddr`

### Signature

```solidity
function makeAddr(string memory name) internal returns(address addr);
```

### Description

Creates an address derived from the provided `name`.

A [`label`](../../cheatcodes/label.md) is created for the derived address with the provided `name` used as the label value.

### Examples

```solidity
address alice = makeAddr("alice");
emit log_address(alice); // 0x328809bc894f92807417d2dad6b7c998c1afdac6
```
