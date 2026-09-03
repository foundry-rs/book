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

    // [!region create]
    function testMeasureContractCreationFrame() public {
        new GasTarget();

        Vm.Gas memory gas = vm.lastFrameGas();

        assertGt(gas.gasTotalUsed, 0);
    }
    // [!endregion create]
}
