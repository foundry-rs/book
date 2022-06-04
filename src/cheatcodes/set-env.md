## `setEnv`

### Signature

```solidity
function setEnv(string calldata key, string calldata value) external;
```

### Description

Set an environment variable `key=value`.

### Tips

- The environment variable key can't be empty.
- The environment variable key can't contain the equal sign `=` or the NUL character `\\0`.
- The environment variable value can't contain the NUL character `\\0`.

### Examples

```solidity
string memory key = "hello";
string memory val = "world";
cheats.setEnv(key, val);
```
