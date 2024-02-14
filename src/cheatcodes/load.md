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

bytes32 leet = vm.load(address(leetContract), bytes32(uint256(0)));
emit log_uint(uint256(leet)); // 1337
```

### SEE ALSO

Spark Standard Library

[Std Storage](../reference/spark-std/std-storage.md)
