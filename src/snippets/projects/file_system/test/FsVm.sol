// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface FsVm {
    struct FsMetadata {
        bool isDir;
        bool isSymlink;
        uint256 length;
        bool readOnly;
        uint256 modified;
        uint256 accessed;
        uint256 created;
    }

    function createDir(string calldata path, bool recursive) external;
    function removeDir(string calldata path, bool recursive) external;
    function copyFile(string calldata from, string calldata to) external returns (uint64 copied);
    function writeFileBinary(string calldata path, bytes calldata data) external;
    function readFileBinary(string calldata path) external view returns (bytes memory data);
    function readFile(string calldata path) external view returns (string memory data);
    function fsMetadata(string calldata path) external view returns (FsMetadata memory metadata);
    function exists(string calldata path) external view returns (bool result);
    function assertEq(uint256 left, uint256 right) external pure;
    function assertEq(string calldata left, string calldata right) external pure;
    function assertEq(bytes calldata left, bytes calldata right) external pure;
    function assertTrue(bool condition) external pure;
    function assertFalse(bool condition) external pure;
}
