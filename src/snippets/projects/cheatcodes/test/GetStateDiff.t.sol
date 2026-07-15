// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

contract StateDiffCounter {
    uint256 public value;

    function setValue(uint256 newValue) external {
        value = newValue;
    }
}

contract GetStateDiffTest is Test {
    // [!region queries]
    function testReadStateDiffWithoutStopping() public {
        StateDiffCounter counter = new StateDiffCounter();
        vm.label(address(counter), "Counter");

        vm.startStateDiffRecording();
        counter.setValue(42);

        Vm.StorageAccess[] memory accesses = vm.getStorageAccesses();
        string memory textDiff = vm.getStateDiff();
        string memory jsonDiff = vm.getStateDiffJson();

        assertGt(accesses.length, 0);
        assertTrue(vm.contains(textDiff, "Counter"));
        assertTrue(vm.contains(jsonDiff, '"newValue":"0x000000000000000000000000000000000000000000000000000000000000002a"'));

        Vm.AccountAccess[] memory accountAccesses = vm.stopAndReturnStateDiff();
        assertGt(accountAccesses.length, 0);
    }
    // [!endregion queries]
}
