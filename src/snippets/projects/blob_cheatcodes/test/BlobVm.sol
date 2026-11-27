// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface BlobVm {
    function blobhashes(bytes32[] calldata hashes) external;
    function getBlobhashes() external view returns (bytes32[] memory hashes);
    function blobBaseFee(uint256 newBlobBaseFee) external;
    function getBlobBaseFee() external view returns (uint256 blobBaseFee);
    function assertEq(uint256 left, uint256 right) external pure;
    function assertEq(bytes32 left, bytes32 right) external pure;
    function assertEq(bytes32[] calldata left, bytes32[] calldata right) external pure;
}
