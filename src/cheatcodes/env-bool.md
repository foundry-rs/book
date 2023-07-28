## `envBool`

### Signature

```solidity
function envBool(string calldata key) external returns (bool value);
```

```solidity
function envBool(string calldata key, string calldata delimiter) external returns (bool[] memory values);
```

### Description

Read an environment variable as `bool` or `bool[]`.

### Tips

- For `true`, use either "true" or "True" for the environment variable value.
- For `false`, use either "false" or "False" for the environment variable value.
- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `BOOL_VALUE=true`,
```solidity
string memory key = "BOOL_VALUE";
bool expected = true;
bool output = cheats.envBool(key);
assert(output == expected);
```

#### Array
With environment variable `BOOL_VALUES=true,false,True,False`,
```solidity
string memory key = "BOOL_VALUES";
string memory delimiter = ",";
bool[4] memory expected = [true, false, true, false];
bool[] memory output = cheats.envBool(key, delimiter);
assert(keccak256(abi.encodePacked((output))) == keccak256(abi.encodePacked((expected))));
```
