// SPDX-License-Identifier: UNLICENSED
// ANCHOR: all
pragma solidity 0.8.10;

// ANCHOR: import
import "forge-std/Test.sol";
// ANCHOR_END: import

contract ContractBTest is Test {
    uint256 testNumber;

    // ANCHOR: setUp
    function setUp() public {
        testNumber = 42;
    }
    // ANCHOR_END: setUp

    // ANCHOR: testNumberIs42
    function testNumberIs42() public {
        assertEq(testNumber, 42);
    }
    // ANCHOR_END: testNumberIs42

    // ANCHOR: testFailUnderflow
    function testFailUnderflow() public {
        testNumber -= 43;
    }
    // ANCHOR_END: testFailUnderflow

    // ANCHOR: testFailSubtract43
    function testFailSubtract43() public {
        testNumber -= 43;
    }
    // ANCHOR_END: testFailSubtract43
}
// ANCHOR_END: all
