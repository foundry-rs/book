## `serializeJson`

### Signature

```solidity
function serializeBool(string calldata objectKey, string calldata valueKey, bool value)
    external
    returns (string memory json);

function serializeUint(string calldata objectKey, string calldata valueKey, uint256 value)
    external
    returns (string memory json);

function serializeInt(string calldata objectKey, string calldata valueKey, int256 value)
    external
    returns (string memory json);

function serializeAddress(string calldata objectKey, string calldata valueKey, address value)
    external
    returns (string memory json);

function serializeBytes32(string calldata objectKey, string calldata valueKey, bytes32 value)
    external
    returns (string memory json);

function serializeString(string calldata objectKey, string calldata valueKey, string calldata value)
    external
    returns (string memory json);

function serializeBytes(string calldata objectKey, string calldata valueKey, bytes calldata value)
    external
    returns (string memory json);

function serializeBool(string calldata objectKey, string calldata valueKey, bool[] calldata values)
    external
    returns (string memory json);

function serializeUint(string calldata objectKey, string calldata valueKey, uint256[] calldata values)
    external
    returns (string memory json);

function serializeInt(string calldata objectKey, string calldata valueKey, int256[] calldata values)
    external
    returns (string memory json);

function serializeAddress(string calldata objectKey, string calldata valueKey, address[] calldata values)
    external
    returns (string memory json);

function serializeBytes32(string calldata objectKey, string calldata valueKey, bytes32[] calldata values)
    external
    returns (string memory json);

function serializeString(string calldata objectKey, string calldata valueKey, string[] calldata values)
    external
    returns (string memory json);

function serializeBytes(string calldata objectKey, string calldata valueKey, bytes[] calldata values)
    external
    returns (string memory json);
```

### Description

Serializes values as a stringified JSON object.

### How it works

The idea is that the user serializes the values of the JSON file and finally writes that object to a file. The user needs to pass:

- A key for the _object_ to which the value should be serialized to. This enables the user to serialize multiple objects in parallel
- A key for the _value_ which will be its key in the JSON file
- The value to be serialized

The keys does not need to be of some specific form. They are of type `string` to enable for intuitive human interpretation. Semantically, they are not important other than to be used as keys.

The cheatcodes return the JSON object that is being serialized **up to that point**. That way the user can serialize inner JSON objects and then serialize them in bigger JSON objects, enabling the user to create arbitrary JSON objects.

Finally, the user writes the JSON object to a file by using [writeJson](./write-json.md).

**Remember:** The file path needs to be in the allowed paths. Read more in [File cheatcodes](./fs.md).

### Example

Let's assume we want to write the following JSON to a file:

{ "boolean": true, "number": 342, "object": { "title": "finally json serialization" } }

```solidity
string memory obj1 = "some key";
vm.serializeBool(obj1, "boolean", true);
vm.serializeUint(obj1, "number", uint256(342));

string memory obj2 = "some other key";
string memory output = vm.serializeString(obj2, "title", "finally json serialization");

// IMPORTANT: This works because `serializeString` first tries to interpret `output` as
//   a stringified JSON object. If the parsing fails, then it treats it as a normal
//   string instead.
//   For instance, an `output` equal to '{ "ok": "asd" }' will produce an object, but
//   an output equal to '"ok": "asd" }' will just produce a normal string.
string memory finalJson = vm.serializeString(obj1, "object", output);

vm.writeJson(finalJson, "./output/example.json");
```

### SEE ALSO

- [writeJson](./write-json.md)
