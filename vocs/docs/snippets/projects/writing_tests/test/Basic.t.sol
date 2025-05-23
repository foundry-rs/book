// SPDX-License-Identifier: UNLICENSED
// [!region all]
pragma solidity 0.8.10;

// [!region import]
import {Test} from "forge-std/Test.sol";
// [!endregion import]

contract ContractBTest is Test {
    uint256 testNumber;

    // [!region setUp]
    function setUp() public {
        testNumber = 42;
    }
    // [!endregion setUp]

    // [!region testNumberIs42]
    function test_NumberIs42() public {
        assertEq(testNumber, 42);
    }
    // [!endregion testNumberIs42]

    // [!region testRevert_Subtract43]
    /// forge-config: default.allow_internal_expect_revert = true
    function testRevert_Subtract43() public {
        vm.expectRevert();
        testNumber -= 43;
    }
    // [!endregion testFailSubtract43]
}
// [!endregion all]
