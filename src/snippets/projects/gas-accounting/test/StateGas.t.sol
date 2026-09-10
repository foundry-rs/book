// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

contract StateGasTarget {
    uint256 public value;

    function setValue(uint256 newValue) external {
        value = newValue;
    }
}

contract StateGasTest is Test {
    // [!region components]
    /// forge-config: default.isolate = false
    function testNestedFrameCanRefillStateGas() public {
        StateGasTarget target = new StateGasTarget();
        target.setValue(42); // Creates a slot that was zero at transaction start.
        assertGt(vm.lastFrameGas().gasStateUsed, 0);

        target.setValue(0); // Clears it again: this frame refills state gas.
        Vm.Gas memory gas = vm.lastFrameGas();
        assertLt(gas.gasStateUsed, 0);

        // Widen before adding: this is a signed measurement, not a gas-limit estimate.
        int256 netMeasuredGas = int256(uint256(gas.gasTotalUsed)) + int256(gas.gasStateUsed);
        emit log_named_int("Net sum of measured components", netMeasuredGas);
    }
    // [!endregion components]
}
