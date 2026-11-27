// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract MinimumGasTarget {
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }
}

contract MinimumGasCaller {
    MinimumGasTarget private immutable target;

    constructor(MinimumGasTarget target_) {
        target = target_;
    }

    function addWithGasLimit(uint256 a, uint256 b) external view returns (uint256) {
        return target.add{gas: 50_000}(a, b);
    }
}

contract ExpectCallMinGasTest is Test {
    // [!region minimum-gas]
    function testExpectCallWithMinimumGas() public {
        MinimumGasTarget target = new MinimumGasTarget();
        MinimumGasCaller caller = new MinimumGasCaller(target);

        vm.expectCallMinGas(address(target), 0, 25_000, abi.encodeCall(target.add, (1, 2)));

        assertEq(caller.addWithGasLimit(1, 2), 3);
    }
    // [!endregion minimum-gas]
}
