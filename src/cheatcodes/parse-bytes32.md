## `parseBytes32`

### Signature

```solidity
function parseBytes32(string calldata stringifiedValue) external pure returns (bytes32 parsedValue);
```

### Description

Parses the value of `string` into `bytes32`

### Examples

```solidity
string memory bytes32AsString = "0x0000000000000000000000000000000000000000000000000000000000000000";
bytes32 stringToBytes32 = vm.parseBytes32(bytes32AsString); // 0x0000000000000000000000000000000000000000000000000000000000000000
```
