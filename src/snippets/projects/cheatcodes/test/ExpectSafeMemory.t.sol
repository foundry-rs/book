// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract MemoryWriter {
    function write(uint256 offset, bytes32 value) external pure {
        assembly {
            mstore(offset, value)
        }
    }
}

contract ExpectSafeMemoryTest is Test {
    // [!region current]
    function testRestrictCurrentContext() public {
        vm.expectSafeMemory(0x80, 0xa0);

        assembly {
            mstore(0x80, 0xc0ffee)
        }
    }
    // [!endregion current]

    // [!region next-call]
    function testRestrictNextCall() public {
        MemoryWriter writer = new MemoryWriter();
        vm.expectSafeMemoryCall(0x80, 0xa0);

        writer.write(0x80, bytes32(uint256(0xc0ffee)));
    }
    // [!endregion next-call]

    // [!region stop]
    function testAddRangesAndStop() public {
        vm.expectSafeMemory(0x80, 0xe0);
        vm.expectSafeMemory(0x100, 0x120);

        assembly {
            mstore(0x80, 1)
            mstore(0x100, 2)
        }

        vm.stopExpectSafeMemory();

        assembly {
            mstore(0x100, 3)
        }
    }
    // [!endregion stop]
}
