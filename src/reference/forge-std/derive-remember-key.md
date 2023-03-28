## `deriveRememberKey`

### Signature

```solidity
function deriveRememberKey(string memory mnemonic, uint32 index) internal returns (address who, uint256 privateKey)
```

### Description

Derive a private key from a mnemonic and also store it in forge's local wallet. Returns the address and private key.

### Example

Get a private key and address from the test mnemonic at path `m/44'/60'/0'/0/0`. Use them to sign some data and start broadcasting transactions:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";

(address deployer, uint256 privateKey) = deriveRememberKey(mnemonic, 0);

bytes32 hash = keccak256("Signed by deployer");
(uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, hash);

vm.startBroadcast(deployer);
...
vm.stopBroadcast();
```

Get an address from the test mnemonic at path `m/44'/60'/0'/0/0` to start broadcasting transactions:

```solidity
string memory mnemonic = "test test test test test test test test test test test junk";

(address deployer, ) = deriveRememberKey(mnemonic, 0);

vm.startBroadcast(deployer);
...
vm.stopBroadcast();
```

### SEE ALSO

Cheatcodes:
- [deriveKey](../../cheatcodes/derive-key.md)
- [rememberKey](../../cheatcodes/remember-key.md)
