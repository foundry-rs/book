// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface WarmthVm {
    struct AccessListItem {
        address target;
        bytes32[] storageKeys;
    }

    function warmSlot(address target, bytes32 slot) external;
    function coolSlot(address target, bytes32 slot) external;
    function cool(address target) external;
    function accessList(AccessListItem[] calldata access) external;
    function noAccessList() external;
    function assertEq(uint256 left, uint256 right) external pure;
}
