// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Vault {
    uint256 public totalAssets; // slot 0
    uint64 public lastUpdate; // slot 1, bytes 0..7
    uint64 public feeBps; // slot 1, bytes 8..15
    mapping(address => uint256) public balances; // slot 2

    /// @custom:storage-location erc7201:example.vault.config
    struct Config {
        address owner;
        bool paused;
    }

    function setFee(uint64 lastUpdate_, uint64 feeBps_) external {
        lastUpdate = lastUpdate_;
        feeBps = feeBps_;
    }
}
