// SPDX-License-Identifier: MIT
// [!region all]
pragma solidity ^0.8.20;

contract Pricing {
    function fee(uint256 amount, bool preferred) external pure returns (uint256) {
        if (preferred) {
            return amount / 100;
        }
        if (amount >= 100 ether) {
            return amount * 2 / 100;
        }
        return amount * 3 / 100;
    }
}
// [!endregion all]
