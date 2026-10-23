// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface EvmVersionVm {
    function getEvmVersion() external pure returns (string memory);
    function setEvmVersion(string calldata evm) external;
    function blobhashes(bytes32[] calldata hashes) external;
    function expectRevert() external;
    function assertEq(string calldata left, string calldata right) external pure;
    function assertEq(bytes32 left, bytes32 right) external pure;
}
