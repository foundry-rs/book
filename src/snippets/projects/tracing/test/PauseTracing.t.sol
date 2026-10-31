// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {TracingVm} from "./TracingVm.sol";

contract Counter {
    uint256 public number;

    function increment() public {
        number++;
    }
}

contract PauseTracingTest {
    TracingVm constant vm = TracingVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    Counter counter;

    function setUp() public {
        counter = new Counter();
    }

    function testPauseTracing() public {
        // Setup calls that are not useful when reading the trace.
        vm.pauseTracing();
        for (uint256 i = 0; i < 10; i++) {
            counter.increment();
        }
        vm.resumeTracing();

        // Only the calls after `resumeTracing` appear in the trace.
        counter.increment();
        vm.assertEq(counter.number(), 11);
    }
}
