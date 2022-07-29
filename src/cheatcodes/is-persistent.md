## `isPersistent`

### Signature

```solidity
 function isPersistent(address) external returns (bool);
```

### Description

Returns whether an account is marked as persistent (`makePersistent`)[./make-persistent.md]. 

### Examples

Check default status of `msg.sender` and the current test account

```solidity
// by default the `sender` and the contract itself are persistent
assert(cheats.isPersistent(msg.sender));
assert(cheats.isPersistent(address(this)));
```

### SEE ALSO

- [makePersistent](./make-persistent.md)
- [revokePersistent](./revoke-persistent.md)
