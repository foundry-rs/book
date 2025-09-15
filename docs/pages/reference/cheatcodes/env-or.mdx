## `envOr`

### Signature

```solidity
function envOr(string calldata key, bool defaultValue) external returns (bool value);
function envOr(string calldata key, uint256 defaultValue) external returns (uint256 value);
function envOr(string calldata key, int256 defaultValue) external returns (int256 value);
function envOr(string calldata key, address defaultValue) external returns (address value);
function envOr(string calldata key, bytes32 defaultValue) external returns (bytes32 value);
function envOr(string calldata key, string calldata defaultValue) external returns (string memory value);
function envOr(string calldata key, bytes calldata defaultValue) external returns (bytes memory value);
```

```solidity
function envOr(string calldata key, string calldata delimiter, bool[] calldata defaultValue) external returns (bool[] memory value);
function envOr(string calldata key, string calldata delimiter, uint256[] calldata defaultValue) external returns (uint256[] memory value);
function envOr(string calldata key, string calldata delimiter, int256[] calldata defaultValue) external returns (int256[] memory value);
function envOr(string calldata key, string calldata delimiter, address[] calldata defaultValue) external returns (address[] memory value);
function envOr(string calldata key, string calldata delimiter, bytes32[] calldata defaultValue) external returns (bytes32[] memory value);
function envOr(string calldata key, string calldata delimiter, string[] calldata defaultValue) external returns (string[] memory value);
function envOr(string calldata key, string calldata delimiter, bytes[] calldata defaultValue) external returns (bytes[] memory value);
```

### Description

A non-failing way to read an environment variable of any type: if the requested environment key does not exist, `envOr()` will return a default value instead of reverting (works with arrays too).

The returned type is determined by the type of `defaultValue` parameter passed.

### Tips

- Use `envOr(key, defaultValue)` to read a single value
- Use `envOr(key, delimiter, defaultValue[])` to read an array with delimiter
- The parsing of the environment variable will be done according to the type of `defaultValue` (e.g. if the default value type is `uint` - the environment variable will be also parsed as `uint`)
- Use explicit casting for literals to specify type of default variable: `uint(69)` will return an `uint` but `int(69)` will return an `int`
- Same with: `string("")` and `bytes("")` - these will return `string` and `bytes` accordingly
- Use dynamic arrays (`bool[]`) instead of fixed-size arrays (`bool[4]`) when providing default values (only dynamic arrays are supported)

### Examples

#### Single Value
If the environment variable `FORK` is not set, you can specify it to be `false` by default:
```solidity
bool fork = vm.envOr("FORK", false);
```
or
```solidity
address owner;

function setUp() {
  owner = vm.envOr("OWNER", address(this));
}
```

#### Array
If the environment variable `BAD_TOKENS` is not set, you can specify the default to be an empty array:
```solidity
address[] badTokens;

function envBadTokens() public {
  badTokens = vm.envOr("BAD_TOKENS", ",", badTokens);
}
```
or
```solidity
function envBadTokens() public {
  address[] memory defaultBadTokens = new address[](0);
  address[] memory badTokens = vm.envOr("BAD_TOKENS", ",", defaultBadTokens);
}
```