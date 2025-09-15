## `envAddress`

### Signature

```solidity
function envAddress(string calldata key) external returns (address value);
```

```solidity
function envAddress(string calldata key, string calldata delimiter) external returns (address[] memory values);
```

### Description

Read an environment variable as `address` or `address[]`.

### Tips

- For arrays, you can specify the delimiter used to separate the values with the `delimiter` parameter.

### Examples

#### Single Value
With environment variable `ADDRESS_VALUE=0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`,
```solidity
string memory key = "ADDRESS_VALUE";
address expected = 0x7109709ECfa91a80626fF3989D68f67F5b1DD12D;
address output = vm.envAddress(key);
assert(output == expected);
```

#### Array
With environment variable `ADDRESS_VALUES=0x7109709ECfa91a80626fF3989D68f67F5b1DD12D,0x0000000000000000000000000000000000000000`,
```solidity
string memory key = "ADDRESS_VALUES";
string memory delimiter = ",";
address[2] memory expected = [
    0x7109709ECfa91a80626fF3989D68f67F5b1DD12D,
    0x0000000000000000000000000000000000000000
];
address[] memory output = vm.envAddress(key, delimiter);
assert(keccak256(abi.encodePacked((output))) == keccak256(abi.encodePacked((expected))));
```
