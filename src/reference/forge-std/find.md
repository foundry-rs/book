## `find`

### Signature

```solidity
function find(StdStorage storage self) internal returns (uint256);
```

### Description

Finds an arbitrary storage slot given a function sig, input data, address of the contract and a value to check against slot complexity.  

If flat, will be 
```solidity
bytes32(uint256(uint));
```  

If map, will be 
```solidity
keccak256(abi.encode(key, uint(slot)));
```  

If deep map, will be 
```solidity
keccak256(abi.encode(key1, keccak256(abi.encode(key0, uint(slot)))));
```  

If map struct, will be 
```solidity
bytes32(uint256(keccak256(abi.encode(key1, keccak256(abi.encode(key0, uint(slot)))))) + structFieldDepth);
```  

### Examples

```solidity
uint256 slot = stdstore
    .target(address(test))
    .sig(test.deep_map_struct.selector)
    .with_key(address(this))
    .with_key(address(this))
    .depth(1)
    .find();
```