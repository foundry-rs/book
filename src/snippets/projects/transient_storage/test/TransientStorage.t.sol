// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {TransientVm} from "./TransientVm.sol";
import {Lock} from "../src/Lock.sol";

TransientVm constant vm = TransientVm(address(uint160(uint256(keccak256("hevm cheat code")))));

contract Helper {
    function storeAndCall(Lock lock, bytes32 slot, bytes32 value) external returns (bool) {
        vm.storeTransient(address(lock), slot, value);
        return lock.locked();
    }
}

contract TransientStorageTest {
    bytes32 constant SLOT = keccak256("lock");
    Lock lock;
    Helper helper;

    function setUp() public {
        lock = new Lock();
        helper = new Helper();
    }

    function testStoreAndLoad() public {
        vm.storeTransient(address(lock), SLOT, bytes32(uint256(1)));
        vm.assertEq(vm.loadTransient(address(lock), SLOT), bytes32(uint256(1)));
        // Persistent storage is unchanged.
        vm.assertEq(vm.load(address(lock), SLOT), bytes32(0));
    }

    function testIsolatedCall() public {
        vm.storeTransient(address(lock), SLOT, bytes32(uint256(1)));
        // With isolation, a top-level call runs as its own transaction and reads 0.
        vm.assertEq(lock.locked(), false);
        // A static call stays in the test's transaction and sees the value.
        vm.assertEq(lock.isLocked(), true);
        // Storing and calling inside one call makes the value visible.
        vm.assertEq(helper.storeAndCall(lock, SLOT, bytes32(uint256(1))), true);
    }
}
