## `load`

### Signature

```solidity
function load(address account, bytes32 slot) external returns (bytes32);
```

### Description

Loads the value from storage slot `slot` on account `account`.

### Examples

```solidity
/// contract LeetContract {
///     uint256 private leet = 1337; // slot 0
/// }

bytes32 leet = cheats.load(address(leetContract), bytes32(uint256(0)));
emit log_uint(uint256(leet)); // 1337
```

### SEE ALSO

Forge Standard Library

[Std Storage](../reference/forge-std/std-storage.md)