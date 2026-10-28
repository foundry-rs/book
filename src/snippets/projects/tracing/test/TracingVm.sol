// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface TracingVm {
    function pauseTracing() external view;
    function resumeTracing() external view;
    function assertEq(uint256 left, uint256 right) external pure;
}
