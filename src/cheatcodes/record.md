## `record`

### Signature

```solidity
function record() external;
```

### Description

Tell the VM to start recording all storage reads and writes. To access the reads and writes, use [`accesses`](./accesses.md).

> ℹ️ **Note**
>
> Every write also counts as an additional read.

### Examples

```solidity
/// contract NumsContract {
///     uint256 public num1 = 100; // slot 0
///     uint256 public num2 = 200; // slot 1
/// }

vm.record();
numsContract.num2();
(bytes32[] memory reads, bytes32[] memory writes) = vm.accesses(
  address(numsContract)
);
emit log_uint(uint256(reads[0])); // 1
```
