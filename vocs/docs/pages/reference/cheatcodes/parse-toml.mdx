## `parseToml`

### Signature

```solidity
// Return the value(s) that correspond to 'key'
vm.parseToml(string memory toml, string memory key)
// Return the entire TOML file
vm.parseToml(string memory toml);
```

### Description

These cheatcodes are used to parse TOML files in the form of strings after converting to JSON. Usually, it's coupled with `vm.readFile()` which returns an entire file in the form of a string.

You can use `stdToml` from `forge-std`, as a helper library for better UX.

The cheatcode accepts either a `key` to search for a specific value in the TOML, or no key to return the entire TOML. It returns the value as an abi-encoded `bytes` array. That means that you will have to `abi.decode()` to the appropriate type for it to function properly, else it will `revert`.

### JSONpath Key

`parseToml` uses a syntax called JSONpath to form arbitrary keys for arbitrary JSON files. The same syntax (or rather a dialect) is used by the tool [`jq`](https://stedolan.github.io/jq/).

To read more about the syntax, you can visit the [README](https://crates.io/crates/jsonpath-rust) of the rust library that we use under the hood to implement the feature. That way you can be certain that you are using the correct dialect of jsonPath.

### Encoding Rules

We use the terms `string`, `integer`, `float`, `boolean`, `array`, `datetime`, `inline-table` as they are defined in the [TOML spec](https://www.w3schools.io/file/toml-datatypes/).

We use the terms `number`, `string`, `object`, `array`, `boolean`, `null` as they are defined in the [JSON spec](https://www.w3schools.com/js/js_json_datatypes.asp).

**TOML Encoding Rules**

- `float` is limited to 32 bits (i.e. `+1.5`). It is recommended to use strings to prevent precision loss
- `integer` is limited to 64 bits (i.e. `9223372036854775807`). It is recommended to use strings to encode large values
- Array values cannot have mixed types (i.e. `[256, "b"]`, only `[256, 512]` or `["a", "b"]`)
- `datetime` is encoded as a `string` upon conversion
- `float` is encoded as a `number` upon conversion
- `integer` is encoded as a `number` upon conversion
- `inline-table` (or `table`) is encoded as `object` upon conversion
- `null` is encoded as a `"null"` string

**JSON Encoding Rules**

- `null` is encoded as `bytes32(0)` or `""`
- Numbers >= 0 are encoded as `uint256`
- Negative numbers are encoded as `int256`
- Floating point numbers with decimal digits are not allowed
- Floating point numbers using the scientific notation can be `uint256` or `int256` depending on the value
- A string that can be decoded into a type of `H160` and starts with `0x` is encoded as an `address`. In other words, if it can be decoded into an address, it's probably an address
- A string that starts with `0x` is encoded as `bytes32` if it has a length of `66` or else to `bytes`
- A string that is neither an `address`, a `bytes32` or `bytes`, is encoded as a `string`
- An array is encoded as a dynamic array of the type of its first element
- An object (`{}`) is encoded as a `tuple`

### Type Coercion

As described above, `parseToml` needs to deduce the type of TOML value and that has some inherent limitations. For that reason, there is a sub-family of `parseToml*` cheatcodes that coerce the type of the returned value.

For example `vm.parseTomlUint(toml, key)` will coerce the value to a `uint256`. That means that it can parse all the following values and return them as a `uint256`. That includes a number as type `number`, a stringified number as a `string` and of course it's hex representation.

```toml
hexUint = "0x12C980"
stringUint = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
numberUint = 9223372036854775807 # TOML is limited to 64-bit integers
```

Similarly, there are cheatcodes for all types (including `bytes` and `bytes32`) and their arrays (`vm.parseTomlUintArray`).

### Decoding TOML tables into Solidity structs

TOML tables are converted to JSON objects. JSON objects are encoded as tuples, and can be decoded via tuples or structs. That means that you can define a `struct` in Solidity and it will decode the entire JSON object into that `struct`.

For example:

The following TOML:

```toml
a = 43
b = "sigma"
```

will be converted into the following JSON:

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
- Note that this parsing uses Rust's BTreeMap crate under the hood, meaning that uppercase and lowercase strings are treated differently. Uppercase characters _precede_ lowercase in this lexicographical ordering, ie "Zebra" would precede "apple".

Thus, the first (in alphabetical order) value of the JSON, will be abi-encoded and then tried to be abi-decoded, based on the type of the first attribute of the `struct`.

The above TOML would not be able to be decoded with the struct below:

```solidity
struct Json {
    uint256 b;
    uint256 a;
}
```

The reason is that it would try to decode the string `"sigma"` as a uint. To be exact, it would be decoded, but it would result to a wrong number, since it would interpret the bytes incorrectly.

Another example, given the following TOML:

```toml
name = "Fresh Fruit"

[[apples]]
sweetness = 7
sourness = 3
color = "Red"

[[apples]]
sweetness = 5
sourness = 5
color = "Green"

[[apples]]
sweetness = 9
sourness = 1
color = "Yellow"
```

will be converted into the following JSON:

```json
{
  "apples": [
    {
      "sweetness": 7,
      "sourness": 3,
      "color": "Red"
    },
    {
      "sweetness": 5,
      "sourness": 5,
      "color": "Green"
    },
    {
      "sweetness": 9,
      "sourness": 1,
      "color": "Yellow"
    }
  ],
  "name": "Fresh Fruit"
}
```

And Solidity structs defined as follows:

```solidity
struct Apple {
    string color;
    uint8 sourness;
    uint8 sweetness;
}

struct FruitStall {
    Apple[] apples;
    string name;
}
```

One would decode the TOML as follows:

```solidity
string memory root = vm.projectRoot();
string memory path = string.concat(root, "/src/test/fixtures/fruitstall.toml");
string memory toml = vm.readFile(path);
bytes memory data = vm.parseToml(toml);
FruitStall memory fruitstall = abi.decode(data, (FruitStall));

// Logs: Welcome to Fresh Fruit
console2.log("Welcome to", fruitstall.name);

for (uint256 i = 0; i < fruitstall.apples.length; i++) {
    Apple memory apple = fruitstall.apples[i];

    // Logs:
    // Color: Red, Sourness: 3, Sweetness: 7
    // Color: Green, Sourness: 5, Sweetness: 5
    // Color: Yellow, Sourness: 1, Sweetness: 9
    console2.log(
        "Color: %s, Sourness: %d, Sweetness: %d",
        apple.color,
        apple.sourness,
        apple.sweetness
    );
}
```

### How to use StdToml

1. Import the library `import {stdToml} from "forge-std/StdToml.sol";`
2. Define its usage with `string`: `using stdToml for string;`
3. If you want to parse simple values (numbers, address, etc.) use the helper functions
4. If you want to parse entire TOML tables:
   1. Define the `struct` in Solidity. Make sure to follow the alphabetical order -- it's hard to debug
   2. Use the `parseRaw()` helper function to return abi-encoded `bytes` and then decode them to your struct

```solidity
string memory root = vm.projectRoot();
string memory path = string.concat(root, "/src/test/fixtures/config.toml");
string memory toml = vm.readFile(path);
bytes memory data = toml.parseRaw(".");
Config memory config = abi.decode(data, (Config))
```

### Troubleshooting

#### Cannot read file

> FAIL. Reason: The path `<file-path>` is not allowed to be accessed for read operations

If you receive this error, make sure that you enable read permissions in `foundry.toml` using the [`fs_permissions` key](/reference/cheatcodes/fs.mdx)

### References

- Helper Library: [stdToml.sol](https://github.com/foundry-rs/forge-std/blob/master/src/StdToml.sol)
- [File Cheatcodes](/reference/cheatcodes/fs.mdx): cheatcodes for working with files
