## `ffi`

### Signature

```solidity
function ffi(string[] calldata) external returns (bytes memory);
```

### Description

Calls an arbitrary command if [`ffi`](../reference/config/testing.md#ffi) is enabled.

It is generally advised to use this cheat code as a last resort, and to not enable it by default, as anyone who can change the tests of a project will be able to execute arbitrary commands on devices that run the tests.

### Tips

- By default the `ffi` cheatcode assumes the output of the command is a hex encoded value (e.g. a hex string of an ABI encoded value). If hex decoding fails, it will return the output as UTF8 bytes that you can cast to a string.
- Make sure that the output does not include a `\n` newline character. (e.g in Rust use `print!` vs `println!`)
- Remember that the script will be executed from the top-level directory of your project, not inside `test`
- Make sure that the inputs array does not have empty elements. They will be handled as inputs by the script, instead of space
- Use the cheatcode `toString` to easily convert arbitrary data to strings, so that you can pass them as command-line arguments

### Examples

ABI encoded output

```solidity
string[] memory inputs = new string[](3);
inputs[0] = "echo";
inputs[1] = "-n";
// ABI encoded "gm", as a hex string
inputs[2] = "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002676d000000000000000000000000000000000000000000000000000000000000";

bytes memory res = vm.ffi(inputs);
string memory output = abi.decode(res, (string));
assertEq(output, "gm");
```

UTF8 string output

```solidity
string[] memory inputs = new string[](3);
inputs[0] = "echo";
inputs[1] = "-n";
inputs[2] = "gm";

bytes memory res = vm.ffi(inputs);
assertEq(string(res), "gm");
```
