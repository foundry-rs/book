---
description: Learn how Solidity structs map to ABI tuples and handle encoding for contract interactions with nested structures.
---

## Struct Encoding

Structs are user defined types that can group several variables:

```solidity
struct MyStruct {
    address addr;
    uint256 amount;
}
```

Only the new [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) can encode and decode arbitrarily nested arrays and structs. Since Solidity 0.8.0 it is activated by default, prior to that it needs to be activated via `pragma experimental ABIEncoderV2`.

Solidity structs map to the ABI type "tuple". For more information on how Solidity types map to ABI types see [Mapping Solidity to ABI types](https://docs.soliditylang.org/en/latest/abi-spec.html#mapping-solidity-to-abi-types) in the Solidity documentation.

Structs are therefore encoded and decoded as tuples. So the struct we defined above, `MyStruct`, maps to the tuple `(address,uint256)` in terms of the ABI.

Let's see how this works in a contract:

```solidity
pragma solidity =0.8.15;


contract Test {
    struct MyStruct {
        address addr;
        uint256 amount;
    }
    function f(MyStruct memory t) public pure {}
}
```

The ABI of the `f` function in this contract is:

```json
{
  "inputs": [
    {
      "components": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "internalType": "struct Test.MyStruct",
      "name": "t",
      "type": "tuple"
    }
  ],
  "name": "f",
  "outputs": [],
  "stateMutability": "pure",
  "type": "function"
}
```

which reads: The function `f` takes 1 input of type `tuple` with two components of type `address` and `uint256`.

**Nested Struct Encoding:**
Here's a more complex example with nested structs:

```solidity
pragma solidity 0.8.21;

contract Test {
    struct nestedStruct {
        address addr;
        uint256 amount;
    }

    struct MyStruct {
        string nestedStructName;
        uint256 nestedStructCount;
        nestedStruct _nestedStruct;
    }

    function f(MyStruct memory t) public pure {}
}
```

The ABI of the `f` function in this contract is:

```json
{
  "inputs": [
    {
      "name": "t",
      "type": "tuple",
      "internalType": "struct Test.MyStruct",
      "components": [
        {
          "name": "nestedStructName",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nestedStructCount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_nestedStruct",
          "type": "tuple",
          "internalType": "struct Test.nestedStruct",
          "components": [
            {
              "name": "addr",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ]
    }
  ],
  "name": "f",
  "outputs": [],
  "stateMutability": "pure",
  "type": "function"
}
```

which reads: The function `f` takes 1 input of type tuple with three components: a string, a uint256, and another tuple representing the nested struct with components addr of type address and amount of type uint256.

To encode `MyStruct` to pass it as a parameter to the function `f`:

```bash
cast abi-encode "f((string,uint256,(address,uint256)))" "(example,1,(0x...,1))"
```

To deploy a contract accepting `MyStruct` as an argument:

```bash
forge create src/Test.sol:Test --constructor-args "(example,1,(0x...,1))"
```
