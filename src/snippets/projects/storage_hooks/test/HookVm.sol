// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface HookVm {
    function registerSloadHook(address target, bytes4 callback) external;
    function registerSstoreHook(address target, bytes4 callback) external;
    function registerMappingSstoreHook(address target, bytes32 rootSlot, bytes4 callback) external;
    function assertEq(uint256 left, uint256 right) external pure;
    function assertEq(bytes32 left, bytes32 right) external pure;
}
