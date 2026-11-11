// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Vault {
    uint256 public total; // slot 0
    mapping(address => uint256) public balanceOf; // slot 1

    function deposit() external payable {
        balanceOf[msg.sender] += msg.value;
        total += msg.value;
    }

    function withdraw(uint256 amount) external {
        balanceOf[msg.sender] -= amount;
        total -= amount;
        payable(msg.sender).transfer(amount);
    }
}
