// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {WarmthVm} from "./WarmthVm.sol";
import {Counter} from "../src/Counter.sol";

/// forge-config: default.isolate = true
contract AccessListTest {
    WarmthVm constant vm = WarmthVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    Counter counter;

    function setUp() public {
        counter = new Counter();
    }

    // [!region call-gas]
    function callGas() internal returns (uint256 used) {
        uint256 start = gasleft();
        counter.setNumber(2);
        used = start - gasleft();
    }
    // [!endregion call-gas]

    // [!region access-list]
    function testAccessList() public {
        callGas();
        uint256 base = callGas();

        // List an unrelated account with one storage key.
        WarmthVm.AccessListItem[] memory access = new WarmthVm.AccessListItem[](1);
        bytes32[] memory keys = new bytes32[](1);
        access[0] = WarmthVm.AccessListItem(address(0xbeef), keys);
        vm.accessList(access);

        // Each isolated call now pays the EIP-2930 cost: 2400 per account, 1900 per key.
        vm.assertEq(callGas(), base + 2400 + 1900);
        vm.assertEq(callGas(), base + 2400 + 1900);

        // `noAccessList` removes the list from later calls.
        vm.noAccessList();
        vm.assertEq(callGas(), base);
    }
    // [!endregion access-list]

    // [!region warm-entries]
    function testAccessListWarmsEntries() public {
        callGas();
        uint256 base = callGas();

        // List `counter` and its `number` slot. The call is the transaction's
        // recipient, so the account is already warm and only the slot saves gas.
        WarmthVm.AccessListItem[] memory access = new WarmthVm.AccessListItem[](1);
        bytes32[] memory keys = new bytes32[](1);
        keys[0] = bytes32(uint256(0));
        access[0] = WarmthVm.AccessListItem(address(counter), keys);
        vm.accessList(access);

        vm.assertEq(callGas(), base + 2400 + 1900 - 2100);
    }
    // [!endregion warm-entries]
}
