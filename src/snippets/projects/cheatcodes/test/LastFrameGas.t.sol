// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

contract GasTarget {
    uint256 public value;

    function setValue(uint256 newValue) external {
        value = newValue;
    }
}

contract LastFrameGasTest is Test {
    // [!region call]
    function testMeasureLastCallFrame() public {
        GasTarget target = new GasTarget();
        target.setValue(42);

        Vm.Gas memory gas = vm.lastFrameGas();

        assertGt(gas.gasLimit, 0);
        assertGt(gas.gasTotalUsed, 0);
        assertEq(gas.gasMemoryUsed, 0);
        assertGt(gas.gasRemaining, 0);
    }
    // [!endregion call]

    // [!region components]
    function testMeasureGasComponents() public {
        GasTarget target = new GasTarget();
        target.setValue(42);
        Vm.Gas memory gas = vm.lastFrameGas();

        uint256 regularGasUsed = uint256(gas.gasTotalUsed);
        int256 netStateGasUsed = int256(gas.gasStateUsed);
        int256 netMeasuredGas = int256(regularGasUsed) + netStateGasUsed;

        // These are measured components, not a transaction gas-limit estimate.
        emit log_named_uint("Regular gas (excludes state gas)", regularGasUsed);
        emit log_named_int("State gas (after state refills)", netStateGasUsed);
        emit log_named_int("Net sum of measured components", netMeasuredGas);
        emit log_named_int("Ordinary refund (excludes state refills)", int256(gas.gasRefunded));
    }
    // [!endregion components]

    // [!region create]
    function testMeasureContractCreationFrame() public {
        new GasTarget();

        Vm.Gas memory gas = vm.lastFrameGas();

        assertGt(gas.gasTotalUsed, 0);
    }
    // [!endregion create]
}
