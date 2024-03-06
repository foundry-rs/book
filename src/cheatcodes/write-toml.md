## `writeToml`

### Signature

```solidity
function writeToml(string calldata json, string calldata path) external;

function writeToml(string calldata json, string calldata path, string calldata valueKey) external;
```

### Description

Writes a serialized JSON object to a TOML file after conversion.

The argument `json` must be a JSON object in stringified form. For example:

```text
{ "boolean": true, "number": 342, "object": { "title": "finally json serialization" } }
```

This is usually built through [serializeJson](./serialize-json.md).

The argument `path` is the path of the TOML file to write to.

If no `valueKey` is provided, then the TOML object will be written to a new file. If the file already exists, it will be overwritten.

If a `valueKey` is provided, then the file must already exist and be a valid TOML file. The object in that file will be updated by replacing the value at the *JSON path* `valueKey` with the JSON object `json` after TOML conversion.

This is useful to replace some values in a TOML file without having to first parse and then reserialize it. Note that the TOML path must indicate an existing key, so it's not possible to add new keys this way.

**Remember:** The file path `path` needs to be in the allowed paths. Read more in [File cheatcodes](./fs.md).

#### JSON Paths

Let's consider the following JSON object:

```json
{
  "boolean": true,
  "number": 342,
  "obj1": {
    "aNumber": 123,
    "obj2": {
      "aNumber": 123,
      "obj3": {
        "veryDeep": 13371337
      }
    }
  }
}
```

The root object is always assumed, so we can refer to one of its children by starting the path with a dot (`.`). For instance, `.boolean`, `.number`, and `.obj1`.
We can go as deep as we want: `.obj1.aNumber`, or `.obj1.obj2.aNumber`.
We can even search for a key in a subtree: `.obj1..veryDeep`, or just `..veryDeep` since there's no ambiguity.

See the examples to see this in action.

### Examples

#### A simple example

```solidity
string memory jsonObj = '{ "boolean": true, "number": 342, "myObject": { "title": "finally json serialization" } }';
vm.writeToml(jsonObj, "./output/example.toml");

// replaces the value of `myObject` with a new object
string memory newJsonObj = '{ "aNumber": 123, "aString": "asd" }';
vm.writeToml(newJsonObj, "./output/example.toml", ".myObject");

// replaces the value of `aString` in the new object
vm.writeToml("my new string", "./output/example.toml", ".myObject.aString");

// Here's example.toml:
// 
// boolean = true
// number = 342

// [myObject]
// aNumber = 123
// aString = "my new string"
```

#### A more complex example

```solidity
string memory jsonObj = '{ "boolean": true, "number": 342, "obj1": { "foo": "bar" } }';
vm.writeToml(jsonObj, "./output/example2.toml");

string memory jsonObj2 = '{ "aNumber": 123, "obj2": {} }';
vm.writeToml(jsonObj2, "./output/example2.toml", ".obj1");

string memory jsonObj3 = '{ "aNumber": 123, "obj3": { "veryDeep": 3 } }';
vm.writeToml(jsonObj3, "./output/example2.toml", ".obj1.obj2");

// Here's example2.toml so far:
//
// boolean = true
// number = 342
//
// [obj1]
// aNumber = 123
//
// [obj1.obj2]
// aNumber = 123
//
// [obj1.obj2.obj3]
// veryDeep = 3

// Note that the JSON object is just the value 13371337 in this case.
vm.writeToml("13371337", "./output/example2.toml", "..veryDeep");

// Here's the final example2.toml:
//
// boolean = true
// number = 342
//
// [obj1]
// aNumber = 123
//
// [obj1.obj2]
// aNumber = 123
//
// [obj1.obj2.obj3]
// veryDeep = 13371337
```

### SEE ALSO

- [serializeJson](./serialize-json.md)
