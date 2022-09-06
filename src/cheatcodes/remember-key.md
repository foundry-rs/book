## `rememberKey`

### Signature

```solidity
function rememberKey(uint256 privateKey) external returns (address);
```

### Description

Stores a private key in forge's local wallet and returns the corresponding address which can later be used for [broadcasting](./broadcast.md).

### Examples

Derive the private key from the test mnemonic at path `m/44'/60'/0'/0/0`, remember it in forge's wallet and use it to start broadcasting transactions:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";
uint256 privateKey = vm.deriveKey(mnemonic, 0);
address deployer = vm.rememberKey(privateKey);

vm.startBroadcast(deployer);
...
vm.stopBroadcast();
```

Load a private key from the `PRIVATE_KEY` environment variable and use it to start broadcasting transactions:

```solidity
address deployer = vm.rememberKey(vm.envUint("PRIVATE_KEY"));

vm.startBroadcast(deployer);
...
vm.stopBroadcast();
```

### SEE ALSO

- [deriveKey](./derive-key.md)

Forge Standard Library:
- [deriveRememberKey](../reference/forge-std/derive-remember-key.md)
