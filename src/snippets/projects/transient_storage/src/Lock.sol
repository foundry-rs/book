// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Lock {
    bytes32 constant SLOT = keccak256("lock");

    function locked() external returns (bool l) {
        bytes32 slot = SLOT;
        assembly {
            l := tload(slot)
        }
    }

    function isLocked() external view returns (bool l) {
        bytes32 slot = SLOT;
        assembly {
            l := tload(slot)
        }
    }
}
