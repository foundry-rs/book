#### Struct Encoding

Structs are custom defined types that can group several variables:

```solidity
struct MyStruct {
    address addr;
    uint256 amount;
}
```

Only the new [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) can encode and decode arbitrarily nested arrays and structs. Since Solidity 0.8.0 it is activated by default, prior to that it needs to be activated via `pragma experimental ABIEncoderV2`.

Structs map to the ABI type "tuple", See also [Mapping Solidity to ABI types](https://docs.soliditylang.org/en/latest/abi-spec.html#mapping-solidity-to-abi-types)

Structs are therefor encoded and decodes as tuples. So `MyStruct` is a `(address,uint256)` tuple when it comes to the ABI spec.

For example the ABI of

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

results in the following ABI json object:

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

which reads:
The function `f` takes 1 input of type `tuple` with two components of type `address` and `uint256`.
