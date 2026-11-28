// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Counter {
    uint256 public number = 1;

    function setNumber(uint256 newNumber) external {
        number = newNumber;
    }
}
