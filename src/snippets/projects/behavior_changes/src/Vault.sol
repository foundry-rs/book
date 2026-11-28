// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Vault {
    event Deposited(address indexed from, uint256 amount);

    uint256 public totalAssets;

    constructor(uint256 cap) {
        require(cap > 0, "zero cap");
    }

    function deposit(uint256 amount) external {
        totalAssets += amount;
        emit Deposited(msg.sender, amount);
        require(amount <= 100, "too much");
    }
}
