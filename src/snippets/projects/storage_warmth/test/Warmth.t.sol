// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {WarmthVm} from "./WarmthVm.sol";

contract WarmthTest {
    WarmthVm constant vm = WarmthVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    uint256 a = 1; // slot 0
    uint256 b = 2; // slot 1

    // EIP-2929: a cold SLOAD costs 2100 gas, a warm one 100.
    uint256 constant COLD_SURCHARGE = 2000;

    // [!region sload-gas]
    /// Returns the gas an SLOAD of `slot` in this contract costs, plus a fixed overhead.
    function sloadGas(uint256 slot) internal view returns (uint256 used) {
        assembly {
            let start := gas()
            let value := sload(slot)
            used := sub(start, gas())
            // Keeps the optimizer from removing the read.
            if eq(value, 0xdead) { revert(0, 0) }
        }
    }
    // [!endregion sload-gas]

    // [!region warm-slot]
    function testWarmSlot() public {
        // The first read of a slot is cold, the next one is warm.
        uint256 cold = sloadGas(0);
        uint256 warm = sloadGas(0);
        vm.assertEq(cold - warm, COLD_SURCHARGE);

        // After `cool`, `warmSlot` makes the next read of slot 0 warm again.
        vm.cool(address(this));
        vm.warmSlot(address(this), bytes32(uint256(0)));
        vm.assertEq(sloadGas(0), warm);
    }

    function testWarmSlotNeedsLoadedSlot() public {
        // Slot 1 has not been read or written in this transaction, so `warmSlot` has no effect.
        vm.warmSlot(address(this), bytes32(uint256(1)));
        uint256 first = sloadGas(1);
        vm.assertEq(first - sloadGas(1), COLD_SURCHARGE);
    }
    // [!endregion warm-slot]

    // [!region cool-slot]
    function testCoolSlot() public {
        uint256 cold = sloadGas(0);
        uint256 warm = sloadGas(0);

        // `coolSlot` makes the next read of the slot pay the cold price again.
        vm.coolSlot(address(this), bytes32(uint256(0)));
        vm.assertEq(sloadGas(0), cold);
        vm.assertEq(sloadGas(0), warm);
    }
    // [!endregion cool-slot]

    // [!region cool]
    function testCool() public {
        uint256 cold = sloadGas(0);
        sloadGas(1);

        // `cool` marks the account and every slot it has loaded as cold.
        vm.cool(address(this));
        vm.assertEq(sloadGas(0), cold);
        vm.assertEq(sloadGas(1), cold);

        // Storage values are unchanged.
        vm.assertEq(a + b, 3);
    }
    // [!endregion cool]
}
