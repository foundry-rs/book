// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface ArrayVm {
    function sort(uint256[] calldata array) external returns (uint256[] memory);
    function shuffle(uint256[] calldata array) external returns (uint256[] memory);
    function setSeed(uint256 seed) external;
    function assertEq(uint256 left, uint256 right) external pure;
    function assertEq(uint256[] calldata left, uint256[] calldata right) external pure;
}
