## `envBytes32`

### Signature

```solidity
function envBytes32(string calldata key) external returns (bytes32 value);
```

```solidity
function envBytes32(string calldata key, string calldata delimiter) external returns (bytes32[] memory values);
```

### Description

Read an environment variable as `bytes32` or `address[]`.

### Tips

- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `BYTES32_VALUE=0x00`,
```solidity
string memory key = "BYTES32_VALUE";
bytes32 expected = bytes32(0x0000000000000000000000000000000000000000000000000000000000000000);
bytes32 output = vm.envBytes32(key);
assert(output == expected);
```

#### Array
With environment variable `BYTES32_VALUES=0x7109709ECfa91a80626fF3989D68f67F5b1DD12D,0x00`,
```solidity
string memory key = "BYTES32_VALUES";
string memory delimiter = ",";
bytes32[2] memory expected = [
    bytes32(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D000000000000000000000000),
    bytes32(0x0000000000000000000000000000000000000000000000000000000000000000)
];
bytes32[] memory output = vm.envBytes32(key, delimiter);
assert(keccak256(abi.encodePacked((output))) == keccak256(abi.encodePacked((expected))));
```
