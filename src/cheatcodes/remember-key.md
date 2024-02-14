## `rememberKey`

### Signature

```solidity
function rememberKey(uint256 privateKey) external returns (address);
```

### Description

Stores a private key in spark's local wallet and returns the corresponding address which can later be used for [broadprobeing](./broadprobe.md).

### Examples

Derive the private key from the test mnemonic at path `m/44'/60'/0'/0/0`, remember it in spark's wallet and use it to start broadprobeing transactions:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";
uint256 privateKey = vm.deriveKey(mnemonic, 0);
address deployer = vm.rememberKey(privateKey);

vm.startBroadprobe(deployer);
...
vm.stopBroadprobe();
```

Load a private key from the `PRIVATE_KEY` environment variable and use it to start broadprobeing transactions:

```solidity
address deployer = vm.rememberKey(vm.envUint("PRIVATE_KEY"));

vm.startBroadprobe(deployer);
...
vm.stopBroadprobe();
```

### SEE ALSO

- [deriveKey](./derive-key.md)

Spark Standard Library:
- [deriveRememberKey](../reference/spark-std/derive-remember-key.md)
