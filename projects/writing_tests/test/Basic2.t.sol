// SPDX-License-Identifier: UNLICENSED
// ANCHOR: all
pragma solidity 0.8.10;

// ANCHOR: import
import {Test, stdError} from "forge-std/Test.sol";
// ANCHOR_END: import

contract ContractBTest is Test {
    uint256 testNumber;

    // ANCHOR: setUp
    function setUp() public {
        testNumber = 42;
    }
    // ANCHOR_END: setUp

    // ANCHOR: testCannotSubtract43
    function test_CannotSubtract43() public {
        vm.expectRevert(stdError.arithmeticError);
        testNumber -= 43;
    }
    // ANCHOR_END: testCannotSubtract43
}
// ANCHOR_END: all
