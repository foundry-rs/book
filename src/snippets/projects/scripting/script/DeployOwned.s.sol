// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

contract OwnedCounter {
    address public immutable owner;
    uint256 public number;

    constructor(address initialOwner) {
        owner = initialOwner;
    }

    function increment() external {
        require(msg.sender == owner, "not owner");
        number++;
    }
}

contract DeployOwned is Script {
    function run() public returns (OwnedCounter counter) {
        address deployer = vm.envAddress("DEPLOYER");

        vm.startBroadcast(deployer);
        counter = new OwnedCounter(deployer);
        counter.increment();
        vm.stopBroadcast();
    }
}
