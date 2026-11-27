// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface SlotVm {
    function getStorageSlot(address target, string calldata variableName)
        external
        view
        returns (uint256 slot, uint256 offset, uint256 numberOfBytes);
    function load(address target, bytes32 slot) external view returns (bytes32);
    function store(address target, bytes32 slot, bytes32 value) external;
    function assertEq(uint256 left, uint256 right) external pure;
}
