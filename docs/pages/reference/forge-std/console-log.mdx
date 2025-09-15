## Console Logging

- Similar to Hardhat's console functions.
- You can use it in calls and transactions. It also works with view and pure functions.
- It always works, regardless of the call or transaction failing or being successful.
- To use it you need import it:
    - `import {console} from "forge-std/console.sol";`
- You can call console.log with up to 4 parameters in any order of following types:
    - `uint`
    - `string`
    - `bool`
    - `address`
- There's also the single parameter API for the types above, and additionally bytes, bytes1... up to bytes32:
    - `console.logInt(int i)`
    - `console.logUint(uint i)`
    - `console.logString(string memory s)`
    - `console.logBool(bool b)`
    - `console.logAddress(address a)`
    - `console.logBytes(bytes memory b)`
    - `console.logBytes1(bytes1 b)`
    - `console.logBytes2(bytes2 b)`
    - ...
    - `console.logBytes32(bytes32 b)`
- console.log implements the same formatting options that can be found in Hardhat's console.log.
    - Example: `console.log("Changing owner from %s to %s", currentOwner, newOwner)`
- console.log is implemented in standard Solidity and it is compatible Anvil and Hardhat Networks.
- console.log calls can run in other networks, like mainnet, kovan, ropsten, etc. They do nothing in those networks, but do spend a minimal amount of gas.


### `console.log(format[,...args])`
The `console.log()` method prints a formatted string using the first argument as a printf-like format string which can contain zero or more format specifiers. Each specifier is replaced with the converted value from the corresponding argument. Supported specifiers are:

- `%s`: String will be used to convert all values to a human-readable string. `uint256`, `int256` and `bytes` values are converted to their `0x` hex encoded values.
- `%d`: Number will be used to convert all values to a human-readable string. This is identical to `%s`.
- `%i`: Works the same way as `%d`.
- `%e`: The exponential representation of a number. For `uint256` and `int256` types.
- `%x`: The hexadecimal representation of a number. For `uint256` and `int256` types.
- `%o`: Object. A string representation of an object with generic JavaScript-styled object formatting. For solidity types, this basically surround the string representation of the value in single-quotes.
- `%%`: single percent sign ('%'). This does not consume an argument.
- Returns: `<string>` The formatted string

If a specifier does not have a corresponding argument, it is not replaced:
```solidity
console.log("%s:%s", "foo");
// Returns: "foo:%s"
```

Values that are not part of the format string are formatted using as a human-readable string representation.

If there are more arguments passed to the console.log() method than the number of specifiers, the extra arguments are concatenated to the returned string, separated by spaces:
```solidity
console.log("%s:%s", "foo", "bar", "baz");
// Returns: "foo:bar baz"
```

If only one argument is passed to console.log(), it is returned as it is without any formatting:
```solidity
console.log("%% %s");
// Returns: "%% %s"
```

The String format specifier (`%s`) should be used in most cases unless specific functionality is needed from other format specifiers.
