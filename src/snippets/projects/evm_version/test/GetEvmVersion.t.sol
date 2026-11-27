// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {EvmVersionVm} from "./EvmVersionVm.sol";

contract GetEvmVersionTest {
    EvmVersionVm constant vm = EvmVersionVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testGetEvmVersion() public pure {
        vm.assertEq(vm.getEvmVersion(), "cancun");
    }
}
