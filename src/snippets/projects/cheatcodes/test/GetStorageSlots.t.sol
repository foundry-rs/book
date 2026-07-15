// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract StorageLayoutTarget {
    uint256 public value;
    uint256[3] public numbers;
    bytes public payload;

    function setPayload(bytes memory data) external {
        payload = data;
    }
}

contract GetStorageSlotsTest is Test {
    // [!region fixed-array]
    function testGetFixedArraySlots() public {
        StorageLayoutTarget target = new StorageLayoutTarget();

        uint256[] memory slots = vm.getStorageSlots(address(target), "numbers");

        assertEq(slots.length, 3);
        assertEq(slots[0], 1);
        assertEq(slots[1], 2);
        assertEq(slots[2], 3);
    }
    // [!endregion fixed-array]

    // [!region long-bytes]
    function testGetLongBytesSlots() public {
        StorageLayoutTarget target = new StorageLayoutTarget();
        target.setPayload(new bytes(64));

        uint256[] memory slots = vm.getStorageSlots(address(target), "payload");
        uint256 dataStart = uint256(keccak256(abi.encode(uint256(4))));

        assertEq(slots.length, 3);
        assertEq(slots[0], 4);
        assertEq(slots[1], dataStart);
        assertEq(slots[2], dataStart + 1);
    }
    // [!endregion long-bytes]
}
