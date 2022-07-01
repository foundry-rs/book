## `ffi`

### Signature

```solidity
function ffi(string[] calldata) external returns (bytes memory);
```

### Description

Calls an arbitrary command if [`ffi`](../reference/config.md#ffi) is enabled.

It is generally advised to use this cheat code as a last resort, and to not enable it by default, as anyone who can change the tests of a project will be able to execute arbitrary commands on devices that run the tests.

### Tips

- Make sure that the output is ABI encoded
- Make sure that the output does not include a `\n` newline character. (e.g in Rust use `print!` vs `println!`)
- Remember that the script will be executed from the top-level directory of your project, not inside `test`
- Make sure that the inputs array does not have empty elements. They will be handled as inputs by the script, instead of space
- Use the cheatcode `toString` to easily convert arbitrary data to strings, so that you can pass them as command-line arguments

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
