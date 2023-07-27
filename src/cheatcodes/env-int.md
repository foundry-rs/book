## `envInt`

### Signature

```solidity
function envInt(string calldata key) external returns (int256 value);
```

```solidity
function envInt(string calldata key, string calldata delimiter) external returns (int256[] memory values);
```

### Description

Read an environment variable as `int256` or `int256[]`.

### Tips

- If the value starts with `0x`, `-0x` or `+0x`, it will be interpreted as a hex value, otherwise,
it will be treated as a decimal number.
- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `INT_VALUE=-57896044618658097711785492504343953926634992332820282019728792003956564819968`,
```solidity
string memory key = "INT_VALUE";
int256 expected = type(int256).min;
int256 output = cheats.envInt(key);
assert(output == expected);
```

#### Array
With environment variable `INT_VALUES=-0x8000000000000000000000000000000000000000000000000000000000000000,+0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF`,
```solidity
string memory key = "INT_VALUES";
string memory delimiter = ",";
int256[2] memory expected = [type(int256).min, type(int256).max];
int256[] memory output = cheats.envInt(key, delimiter);
assert(keccak256(abi.encodePacked((output))) == keccak256(abi.encodePacked((expected))));
```
