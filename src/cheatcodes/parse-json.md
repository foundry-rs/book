## `parseJson`

### Signature

```solidity
// Return the value(s) that correspond to 'key'
vm.parseJson(string memory json, string memory key)
// Return the entire json file
vm.parseJson(string memory json);
```

### Description

These cheatcodes are used to parse JSON files in the form of strings. Usually, it's coupled with `vm.readFile()` which returns an entire file in the form of a string.

You can use `stdJson` from `forge-std`, as a helper library for better UX.

The cheatcode accepts either a `key` to search for a specific value in the JSON, or no key to return the entire JSON. It returns the value as an abi-encoded `bytes` array. That means that you will have to `abi.decode()` to the appropriate type for it to function properly, else it will `revert`.

### JSONpath Key

`parseJson` uses a syntax called JSONpath to form arbitrary keys for arbitrary json files. The same syntax (or rather a dialect) is used by the tool [`jq`](https://stedolan.github.io/jq/).

To read more about the syntax, you can visit the [README](https://crates.io/crates/jsonpath-rust) of the rust library that we use under the hood to implement the feature. That way you can be certain that you are using the correct dialect of jsonPath.

### JSON Encoding Rules

We use the terms `number`, `string`, `object`, `array`, `boolean` as they are defined in the [JSON spec](https://www.w3schools.com/js/js_json_datatypes.asp).

**Encoding Rules**

- Numbers >= 0 are encoded as `uint256`
- Negative numbers are encoded as `int256`
- A string that can be decoded into a type of `H160` and starts with `0x` is encoded as an `address`. In other words, if it can be decoded into an address, it's probably an address
- A string that starts with `0x` is encoded as `bytes32` if it has a length of `66` or else to `bytes`
- A string that is neither an `address`, a `bytes32` or `bytes`, is encoded as a `string`
- An array is encoded as a dynamic array of the type of its first element
- An object (`{}`) is encoded as a `tuple`

### Type Coercion

As described above, parseJSON needs to deduce the type of JSON value and that has some inherent limitations. For that reason, there is a sub-family of `parseJson*` cheatcodes that coerce the type of the returned value.

For example `vm.parseJsonUint(json, key)` will coerce the value to a `uint256`. That means that it can parse all the following values and return them as a `uint256`. That includes a number as type `number`, a stringified number as a `string` and of course it's hex representation.

```json
{
  "hexUint": "0x12C980",
  "stringUint": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  "numberUint": 115792089237316195423570985008687907853269984665640564039457584007913129639935
}
```

Similarly, there are cheatcodes for all types (including `bytes` and `bytes32`) and their arrays (`vm.parseJsonUintArray`).

### Decoding JSON objects into Solidity structs

JSON objects are encoded as tuples, and can be decoded via tuples or structs. That means that you can define a `struct` in Solidity and it will decode the entire JSON object into that `struct`.

For example:

The following JSON

```json
{
  "a": 43,
  "b": "sigma"
}
```

will be decoded into:

```solidity
struct Json {
    uint256 a;
    string b;
}
```

As the values are returned as an abi-encoded tuple, the exact name of the attributes of the struct don't need to match the names of the keys in the JSON. The above json file could also be decoded as:

```solidity
struct Json {
    uint256 apple;
    string pineapple;
}
```

What matters is the alphabetical order. As the JSON object is an unordered data structure but the tuple is an ordered one, we had to somehow give order to the JSON. The easiest way was to order the keys by alphabetical order. That means that in order to decode the JSON object correctly, you will need to define attributes of the struct with **types** that correspond to the values of the alphabetical order of the keys of the JSON.

- The struct is interpreted serially. That means that the tuple's first item will be decoded based on the first item of the struct definition (no alphabetical order).
- The JSON will parsed alphabetically, not serially.

Thus, the first (in alphabetical order) value of the JSON, will be abi-encoded and then tried to be abi-decoded, based on the type of the first attribute of the `struct`.

The above JSON would not be able to be decoded with the struct below:

```solidity
struct Json {
    uint256 b;
    uint256 a;
}
```

The reason is that it would try to decode the string `"sigma"` as a uint. To be exact, it would be decoded, but it would result to a wrong number, since it would interpret the bytes incorrectly.

### Decoding JSON Objects, a tip

If your JSON object has `hex numbers`, they will be encoded as bytes. The way to decode them as `uint` for better UX, is to define two `struct`, one intermediary with the definition of these values as `bytes` and then a final `struct` that will be consumed by the user.

1. Decode the JSON into the intermediary `struct`
2. Convert the intermediary struct to the final one, by converting the `bytes` to `uint`. We have a helper function in `forge-std` to do this
3. Give the final `struct` to the user for consumption

### How to use StdJson

1. Import the library `import "../StdJson.sol";`
2. Define its usage with `string`: `using stdJson for string;`
3. If you want to parse simple values (numbers, address, etc.) use the helper functions
4. If you want to parse entire JSON objects:
   1. Define the `struct` in Solidity. Make sure to follow the alphabetical order -- it's hard to debug
   2. Use the `parseRaw()` helper function to return abi-encoded `bytes` and then decode them to your struct

```solidity
string memory root = vm.projectRoot();
string memory path = string.concat(root, "/src/test/fixtures/broadcast.log.json");
string memory json = vm.readFile(path);
bytes memory transactionDetails = json.parseRaw(".transactions[0].tx");
RawTx1559Detail memory rawTxDetail = abi.decode(transactionDetails, (RawTx1559Detail));
```

### Forge script artifacts

We have gone ahead and created a handful of helper struct and functions to read the artifacts from broadcasting a forge script.

Currently, we only support artifacts produced by EIP1559-compatible chains and we **don't** support yet the parsing of the entire `broadcast.json` artifact. You will need to parse for individual values such as the `transactions`, the `receipts`, etc.

To read the transactions, it's as easy as doing:

```solidity
function testReadEIP1559Transactions() public {
    string memory root = vm.projectRoot();
    string memory path = string.concat(root, "/src/test/fixtures/broadcast.log.json");
    Tx1559[] memory transactions = readTx1559s(path);
}
```

and then you can access their various fields in these structs:

```solidity
struct Tx1559 {
    string[] arguments;
    address contractAddress;
    string contractName;
    string functionSig;
    bytes32 hash;
    Tx1559Detail txDetail;
    string opcode;
}

struct Tx1559Detail {
    AccessList[] accessList;
    bytes data;
    address from;
    uint256 gas;
    uint256 nonce;
    address to;
    uint256 txType;
    uint256 value;
}
```

### References

- Helper Library: [stdJson.sol](https://github.com/foundry-rs/forge-std/blob/master/src/StdJson.sol)
- Usage examples: [stdCheats.t.sol](https://github.com/foundry-rs/forge-std/blob/ca8d6e00ea9cb035f6856ff732203c9a3c48b966/src/test/StdCheats.t.sol#L206)
- [File Cheatcodes](./fs.md): cheatcodes for working with files
