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
address targetAddr = address(1);
vm.etch(targetAddr, code);
log_bytes(address(targetAddr).code); // 0x6080604052348015610010...
```

### See also

Forge Standard Library:

- [`deployCode`](../reference/forge-std/deployCode.md)