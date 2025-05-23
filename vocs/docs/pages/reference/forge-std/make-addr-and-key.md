## `makeAddrAndKey`

### Signature

```solidity
function makeAddrAndKey(string memory name) internal returns(address addr, uint256 privateKey);
```

### Description

Creates an address and private key derived from the provided `name`.

A [`label`](../../cheatcodes/label.md) is created for the derived address with the provided `name` used as the label value.

### Examples

```solidity
(address alice, uint256 key) = makeAddrAndKey("alice");
emit log_address(alice); // 0x328809bc894f92807417d2dad6b7c998c1afdac6
emit log_uint(key); // 70564938991660933374592024341600875602376452319261984317470407481576058979585
```
