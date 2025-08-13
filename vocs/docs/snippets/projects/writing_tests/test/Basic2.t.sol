// SPDX-License-Identifier: UNLICENSED
// [!region all
pragma solidity 0.8.10;

// [!region import]
import {Test, stdError} from "forge-std/Test.sol";
// [!endregion import]

contract ContractBTest is Test {
    uint256 testNumber;

    // [!region setUp]
    function setUp() public {
        testNumber = 42;
    }
    // [!endregion setUp]

    // [!region testCannotSubtract43]
    function test_CannotSubtract43() public {
        vm.expectRevert(stdError.arithmeticError);
        testNumber -= 43;
    }
    // [!endregion testCannotSubtract43]
}
// [!endregion all]
