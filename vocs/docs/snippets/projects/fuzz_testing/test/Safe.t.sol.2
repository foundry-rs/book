// SPDX-License-Identifier: UNLICENSED
// [!region all]
pragma solidity 0.8.10;

import {Test} from "forge-std/Test.sol";

contract Safe {
    receive() external payable {}

    function withdraw() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}

// [!region contract_prelude]
contract SafeTest is Test {
    // [!endregion contract_prelude]
    Safe safe;

    // Needed so the test contract itself can receive ether
    // when withdrawing
    receive() external payable {}

    function setUp() public {
        safe = new Safe();
    }

    // [!region test]
    function testFuzz_Withdraw(uint256 amount) public {
        payable(address(safe)).transfer(amount);
        uint256 preBalance = address(this).balance;
        safe.withdraw();
        uint256 postBalance = address(this).balance;
        assertEq(preBalance + amount, postBalance);
    }
    // [!endregion test]
}
// [!endregion all]
