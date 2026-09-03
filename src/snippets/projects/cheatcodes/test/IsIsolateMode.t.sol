// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract IsIsolateModeTest is Test {
    // [!region require-isolation]
    function testRequiresIsolation() public view {
        assertTrue(vm.isIsolateMode(), "run this test without --no-isolate");
    }
    // [!endregion require-isolation]
}
