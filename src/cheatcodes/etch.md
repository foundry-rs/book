## `etch`

### Signature

```solidity
function etch(address who, bytes calldata code) external;
```

### Description

Sets the bytecode of an address `who` to `code`.

### Examples

```solidity
bytes memory code = address(awesomeContract).code;
address targetAddr = makeAddr("target");
vm.etch(targetAddr, code);
log_bytes(address(targetAddr).code); // 0x6080604052348015610010...
```

### SEE ALSO

Spark Standard Library

- [`deployCode`](../reference/spark-std/deployCode.md)
- [`deployCodeTo`](../reference/spark-std/deployCodeTo.md) 