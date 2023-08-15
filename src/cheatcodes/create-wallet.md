## `createWallet`

### Signature

```solidity
  struct Wallet {
      address addr;
      uint256 publicKeyX;
      uint256 publicKeyY;
      uint256 privateKey;
  }
```

```solidity
  function createWallet(string calldata) external returns (Wallet memory);
```

```solidity
  function createWallet(uint256) external returns (Wallet memory);
```

```solidity
  function createWallet(uint256, string calldata) external returns (Wallet memory);
```

### Description

Creates a new Wallet struct when given a parameter to derive the private key from.

### Tips

[`sign()`](./sign.md) and [`getNonce()`](./get-nonce.md) both have supported function overloads for the Wallet struct as well.

### Examples

#### `uint256`

```solidity
Wallet memory wallet = vm.createWallet(uint256(keccak256(bytes("1"))));

emit log_uint(wallet.privateKey); // uint256(keccak256(bytes("1")))

emit log_address(wallet.addr); // vm.addr(wallet.privateKey)

emit log_address(
    address(
        uint160(
            uint256(
                keccak256(abi.encode(wallet.publicKeyX, wallet.publicKeyY))
            )
        )
    )
); // wallet.addr

emit log_string(vm.getLabel(wallet.addr)); // ""
```

#### `string`

```solidity
Wallet memory wallet = vm.createWallet("bob's wallet");

emit log_uint(wallet.privateKey); // uint256(keccak256(bytes("bob's wallet")))

emit log_address(wallet.addr); // vm.addr(wallet.privateKey)

emit log_address(
    address(
        uint160(
            uint256(
                keccak256(abi.encode(wallet.publicKeyX, wallet.publicKeyY))
            )
        )
    )
); // wallet.addr

emit log_string(vm.getLabel(wallet.addr)); // "bob's wallet"
```

#### `uint256` and `string`

```solidity
Wallet memory wallet = vm.createWallet(uint256(keccak256(bytes("1"))), "bob's wallet");

emit log_uint(wallet.privateKey); // uint256(keccak256(bytes("1")))

emit log_address(wallet.addr); // vm.addr(wallet.privateKey)

emit log_address(
    address(
        uint160(
            uint256(
                keccak256(abi.encode(wallet.publicKeyX, wallet.publicKeyY))
            )
        )
    )
); // wallet.addr

emit log_string(vm.getLabel(wallet.addr)); // "bob's wallet"
```
