## `envUint`

### Signature

```solidity
function envUint(string calldata key) external returns (uint256 value);
```

```solidity
function envUint(string calldata key, string calldata delimiter) external returns (uint256[] memory values);
```

### Description

Read an environment variable as `uint256` or `uint256[]`.

### Tips

- If the value starts with `0x`, it will be interpreted as a hex value, otherwise, it will be
treated as a decimal number.
- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `UINT_VALUE=115792089237316195423570985008687907853269984665640564039457584007913129639935`,
```solidity
string memory key = "UINT_VALUE";
uint256 expected = type(uint256).max;
uint256 output = cheats.envUint(key);
assert(output == expected);
```

#### Array
With environment variable `UINT_VALUES=0,0x0000000000000000000000000000000000000000000000000000000000000000`,
```solidity
string memory key = "UINT_VALUES";
string memory delimiter = ",";
uint256[2] memory expected = [type(uint256).min, type(uint256).min];
uint256[] memory output = cheats.envUint(key, delimiter);
assert(keccak256(abi.encodePacked((output))) == keccak256(abi.encodePacked((expected))));
```
