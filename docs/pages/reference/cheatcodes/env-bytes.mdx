## `envBytes`

### Signature

```solidity
function envBytes(bytes calldata key) external returns (bytes value);
```

```solidity
function envBytes(bytes calldata key, bytes calldata delimiter) external returns (bytes[] memory values);
```

### Description

Read an environment variable as `bytes` or `bytes[]`.

### Tips

- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `BYTES_VALUE=0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`;
```solidity
bytes memory key = "BYTES_VALUE";
bytes expected = hex"7109709ECfa91a80626fF3989D68f67F5b1DD12D";
bytes output = cheats.envBytes(key);
assertEq(output, expected);
```

#### Array
With environment variable `BYTES_VALUE=0x7109709ECfa91a80626fF3989D68f67F5b1DD12D,0x00`;
```solidity
bytes memory key = "BYTES_VALUES";
bytes memory delimiter = ",";
bytes[] memory expected = new bytes[](2);
expected[0] = hex"7109709ECfa91a80626fF3989D68f67F5b1DD12D";
expected[1] = hex"00";
bytes[] memory output = cheats.envBytes(key, delimiter);
for (uint i = 0; i < expected.length; ++i) {
    assert(keccak256(abi.encodePacked((output[i]))) == keccak256(abi.encodePacked((expected[i]))));
}
```
