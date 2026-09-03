// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract GetRecordedLogsJsonTest is Test {
    event Transfer(address indexed from, address indexed to, uint256 value);

    // [!region json]
    function testGetRecordedLogsJson() public {
        address alice = makeAddr("alice");
        address bob = makeAddr("bob");

        vm.recordLogs();
        emit Transfer(alice, bob, 10 ether);

        string memory logsJson = vm.getRecordedLogsJson();
        string[] memory topics = vm.parseJsonStringArray(logsJson, "[0].topics");
        string memory emitter = vm.parseJsonString(logsJson, "[0].emitter");

        assertEq(vm.parseBytes32(topics[0]), keccak256("Transfer(address,address,uint256)"));
        assertEq(vm.parseAddress(emitter), address(this));
        assertEq(vm.getRecordedLogsJson(), "[]");
    }
    // [!endregion json]
}
