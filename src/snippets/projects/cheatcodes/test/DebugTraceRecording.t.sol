// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

contract DebugTraceTarget {
    function add(uint256 a, uint256 b) external pure returns (uint256 result) {
        assembly {
            result := add(a, b)
        }
    }
}

contract DebugTraceRecordingTest is Test {
    // [!region trace]
    function testRecordDebugSteps() public {
        DebugTraceTarget target = new DebugTraceTarget();

        vm.startDebugTraceRecording();
        assertEq(target.add(20, 22), 42);
        Vm.DebugStep[] memory steps = vm.stopAndReturnDebugTraceRecording();

        bool foundAdd;
        for (uint256 i; i < steps.length; i++) {
            if (steps[i].contractAddr == address(target) && steps[i].opcode == 0x01) {
                foundAdd = true;
                assertGe(steps[i].stack.length, 2);
                break;
            }
        }

        assertTrue(foundAdd, "ADD opcode not recorded");
    }
    // [!endregion trace]
}
