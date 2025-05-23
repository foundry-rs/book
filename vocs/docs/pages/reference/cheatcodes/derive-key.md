## `deriveKey`

### Signature

```solidity
function deriveKey(
  string calldata mnemonic,
  uint32 index
) external returns (uint256);
```

```solidity
function deriveKey(
  string calldata mnemonic,
  string calldata path,
  uint32 index
) external returns (uint256);
```

### Description

Derive a private key from a given mnemonic or mnemonic file path.

The first signature derives at the derivation path `m/44'/60'/0'/0/{index}`.
The second signature allows you to specify the derivation path as the second parameter.

### Examples

Derive the private key from the test mnemonic at path `m/44'/60'/0'/0/0`:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";
uint256 privateKey = vm.deriveKey(mnemonic, 0);
```

Derive the private key from the test mnemonic at path `m/44'/60'/0'/1/0`:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";
uint256 privateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/1/", 0);
```

### SEE ALSO

- [rememberKey](./remember-key.md)

Forge Standard Library:
- [deriveRememberKey](../reference/forge-std/derive-remember-key.md)
