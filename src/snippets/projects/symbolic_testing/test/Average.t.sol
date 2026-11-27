// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AverageSymbolicTest {
    function check_average(uint256 a, uint256 b) external pure {
        uint256 average;
        unchecked {
            average = (a + b) / 2;
        }

        assert(average >= (a <= b ? a : b));
    }
}
