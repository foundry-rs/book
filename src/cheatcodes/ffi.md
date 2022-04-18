## `ffi`

### Signature

```solidity
function ffi(string[] calldata) external returns (bytes memory);
```

### Description

Calls an arbitrary command if [`ffi`](./config.md#ffi) is enabled.

It is generally advised to use this cheat code as a last resort, and to not enable it by default, as anyone who can change the tests of a project will be able to execute arbitrary commands on devices that run the tests.

### Examples

```solidity
string[] memory inputs = new string[](3);
inputs[0] = "echo";
inputs[1] = "-n";
// ABI encoded "gm", as a string
inputs[2] = "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002676d000000000000000000000000000000000000000000000000000000000000";

bytes memory res = vm.ffi(inputs);
string memory output = abi.decode(res, (string));
assertEq(output, "gm");
```
