## `envString`

### Signature

```solidity
function envString(string calldata key) external returns (string value);
```

```solidity
function envString(string calldata key, string calldata delimiter) external returns (string[] memory values);
```

### Description

Read an environment variable as `string` or `string[]`.

### Tips

- For arrays, you can specify the delimiter used to seperate the values with the `delimiter` parameter.
- Choose a delimiter that doesn't appear in the string values, so that they can be correctly separated. 

### Examples

#### Single Value
With environment variable `STRING_VALUE=hello, world!`,
```solidity
string memory key = "STRING_VALUE";
string expected = "hellow, world!";
string output = cheats.envString(key);
assertEq(output, expected);
```

#### Array
With environment variable `STRING_VALUES=hello, world!|0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`;
```solidity
string memory key = "STRING_VALUES";
string memory delimiter = "|";
string[2] memory expected = [
    "hello, world!",
    "0x7109709ECfa91a80626fF3989D68f67F5b1DD12D"
];
string[] memory output = cheats.envString(key, delimiter);
for (uint i = 0; i < expected.length; ++i) {
    assert(keccak256(abi.encodePacked((output[i]))) == keccak256(abi.encodePacked((expected[i]))));
}
```
