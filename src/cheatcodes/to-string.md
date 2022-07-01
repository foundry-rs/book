## `toString`

### Signature

```solidity
function toString(address) external returns (string memory);
function toString(bool) external returns (string memory);
function toString(uint256) external returns (string memory);
function toString(int256) external returns (string memory);
function toString(bytes32) external returns (string memory);
function toString(bytes) external returns (string memory);
```

### Description

Convert any type to it's string version. Very useful for operations that demand strings, such as the cheatcode `ffi`.

Bytes are converted to a string of their hex representation.

### Examples

```solidity
uint256 number = 420;
string memory stringNumber = vm.toString(number);
vm.assertEq(stringNumber, "420");
```
