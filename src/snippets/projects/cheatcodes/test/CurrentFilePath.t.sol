// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract CurrentFilePathTest is Test {
    // [!region path]
    function testCurrentFilePath() public view {
        string memory path = vm.currentFilePath();

        assertEq(path, "test/CurrentFilePath.t.sol");
    }
    // [!endregion path]
}
