// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public value;

    event Incremented(address indexed caller, uint256 amount, uint256 newValue);

    error ZeroAmount();

    function increment(uint256 amount) external returns (uint256 newValue) {
        if (amount == 0) revert ZeroAmount();

        newValue = value + amount;
        value = newValue;
        emit Incremented(msg.sender, amount, newValue);
    }
}
