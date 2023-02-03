## File cheat codes

### Signature

```solidity
// Reads the entire content of file to string, (path) => (data)
function readFile(string calldata) external returns (string memory);
// Reads next line of file to string, (path) => (line)
function readLine(string calldata) external returns (string memory);
// Writes data to file, creating a file if it does not exist, and entirely replacing its contents if it does.
// (path, data) => ()
function writeFile(string calldata, string calldata) external;
// Writes line to file, creating a file if it does not exist.
// (path, data) => ()
function writeLine(string calldata, string calldata) external;
// Closes file for reading, resetting the offset and allowing to read it from beginning with readLine.
// (path) => ()
function closeFile(string calldata) external;
// Removes file. This cheatcode will revert in the following situations, but is not limited to just these cases:
// - Path points to a directory.
// - The file doesn't exist.
// - The user lacks permissions to remove the file.
// (path) => ()
function removeFile(string calldata) external;
```

### Description

These cheatcodes provided by [forge-std](https://github.com/foundry-rs/forge-std) can be used for filesystem manipulation operations.

By default, filesystem access is disallowed and requires the `fs_permission` setting in `foundry.toml`:

```toml
# Configures permissions for cheatcodes that touch the filesystem like `vm.writeFile`
# `access` restricts how the `path` can be accessed via cheatcodes
#    `read-write` | `true`   => `read` + `write` access allowed (`vm.readFile` + `vm.writeFile`)
#    `none`| `false` => no access
#    `read` => only read access (`vm.readFile`)
#    `write` => only write access (`vm.writeFile`)
# The `allowed_paths` further lists the paths that are considered, e.g. `./` represents the project root directory
# By default _no_ fs access permission is granted, and _no_ paths are allowed
# following example enables read access for the project dir _only_:
#       `fs_permissions = [{ access = "read", path = "./"}]`
fs_permissions = [] # default: all file cheat codes are disabled
```

### Examples

Append a line to a file, this will create the file if it does not exist yet

This requires read access to the file / project root

```toml
fs_permissions = [{ access = "read", path = "./"}]
```

```solidity
string memory path = "output.txt";

string memory line1 = "first line";
vm.writeLine(path, line1);

string memory line2 = "second line";
vm.writeLine(path, line2);
```

Write to and read from a file

This requires read-write access to file / project root:

```toml
fs_permissions = [{ access = "read-write", path = "./"}]
```

```solidity
string memory path = "file.txt";
string memory data = "hello world";
vm.writeFile(path, data);

assertEq(vm.readFile(path), data);
```

Remove a file

This requires write access to file / project root:

```toml
fs_permissions = [{ access = "write", path = "./"}]
```

```solidity
string memory path = "file.txt";
string memory data = "hello world";
vm.writeFile(path, data);

assertEq(vm.readFile(path), data);
```