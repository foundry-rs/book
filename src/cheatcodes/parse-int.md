## `parseInt`

### Signature

```solidity
function parseInt(string calldata stringifiedValue) external pure returns (int256 parsedValue);
```

### Description

Parses the value of `string` into `int256`

### Examples

```solidity
string memory intAsString = "-12345";
int256 stringToInt = vm.parseInt(intAsString); // -12345
```
