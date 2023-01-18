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

    function writeJson(string calldata json, string calldata path) external;

    function writeJson(string calldata json, string calldata path, string calldata valueKey) external;
```

### Description

Serialize values to later store them in a JSON file

### How it works

The idea is that the user serializes the values of the JSON file and finally writes that object to a file. The user needs to pass:

- A key for the _object_ to which the value should be serialized to. This enables the user to serialize multiple objects in parallel
- A key for the _value_ which will be it's key in the JSON file
- The value to be serialized

The keys does not need to be of some specific form. They are of type `string` to enable for intuitive human interpretation. Semantically, they are not important other than to be used as keys.

The cheatcodes return the JSON object that is being serialized **up to that point**. That way the user can serialize inner JSON objects and then serialize them in bigger JSON objects, enabling the user to create arbitrary JSON objects.

Finally, the user writes the JSON object to a file. There are two cheatcodes to do that:

- `vm.writeJson(string calldata json, string calldata path)` where the user passes the stringified JSON object and a `path`. This will create a file or overwrite an existing one.
- `vm.writeJson(string calldata json, string calldata path, string calldata key)` where the user passes the `key` of a JSON file that exists in `path`. The JSON object will be placed under ther `key`, overwriting the existing one. This is very useful when the user wants to replace some value in a rather large JSON file and they don't want to serialize the entire JSON.

**Remember:** The path needs to be in the allowed paths. Read more in [File cheatcodes](./fs.md)

### Example

Let's assume we want to write the following JSON to a file:

{ "boolean": true, "number": 342, "object": { "title": "finally json serialization" } }

```solidity
string memory json1 = "some key";
vm.serializeBool(json1, "boolean", true);
vm.serializeUint(json1, "number", uint256(342));
json2 = "some other key";
string memory output = vm.serializeString(json2, "title", "finally json serialization");
string memory finalJson = vm.serialize(json1, "object", output);
vm.writeJson(finalJson, "./output/example.json");
```
