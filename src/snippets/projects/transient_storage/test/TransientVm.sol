// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface TransientVm {
    function storeTransient(address target, bytes32 slot, bytes32 value) external;
    function loadTransient(address target, bytes32 slot) external view returns (bytes32 data);
    function load(address target, bytes32 slot) external view returns (bytes32 data);
    function assertEq(bytes32 left, bytes32 right) external pure;
    function assertEq(bool left, bool right) external pure;
}
