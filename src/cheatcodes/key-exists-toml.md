## `keyExistsToml`

### Signature

```solidity
// Check if a key exists in a TOML table.
vm.keyExistsToml(string memory toml, string memory key) returns (bool)
```

### Description

Checks if a key exists in a TOML table.

### Examples

```solidity
string memory path = "./path/to/tomlfile.toml";
string memory toml = vm.readFile(path);
bool exists = vm.keyExistsToml(toml, ".key");
assertTrue(exists);
```
