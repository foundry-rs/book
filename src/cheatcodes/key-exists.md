## `keyExists`

### Signature

```solidity
// Check if a key exists in a JSON string.
vm.keyExists(string memory json, string memory key) returns (bool)
```

### Description

Checks if a key exists in a JSON string.

### Examples

```solidity
string memory path = "./path/to/jsonfile.json";
string memory json = vm.readFile(path);
bool exists = vm.keyExists(json, ".key");
assertTrue(exists);
```
