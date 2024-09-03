## `parseJsonKeys`

### Signature

```solidity
// Get list of keys present in a JSON string
function parseJsonKeys(string calldata json, string calldata key) external pure returns (string[] memory keys);
```

### Description

Gets list of keys present in a JSON string

### Examples

```solidity
string memory json = '{"key": {"a": 1, "b": 2}}';
string[] memory keys = vm.parseJsonKeys(json, ".key"); // ["a", "b"]
```

```solidity
string memory json = '{"key": "something"}';
string[] memory keys = vm.parseJsonKeys(json, "$"); // ["key"]
```

```solidity
string memory json = '{"root_key": [{"a": 1, "b": 2}]}';
string[] memory keys = vm.parseJsonKeys(json, ".root_key[0]"); // ["a", "b"]
```