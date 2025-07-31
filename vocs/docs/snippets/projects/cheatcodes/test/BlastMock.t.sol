// SPDX-License-Identifier: UNLICENSED
// [!region all]
pragma solidity 0.8.10;

import {Test} from "forge-std/Test.sol";

// Firstly, we implement a mock emulating the actual precompile behavior
contract YieldMock {
    address private constant blastContract = 0x4300000000000000000000000000000000000002;

    mapping(address => uint8) public getConfiguration;

    function configure(address contractAddress, uint8 flags) external returns (uint256) {
        require(msg.sender == blastContract);

        getConfiguration[contractAddress] = flags;
        return 0;
    }

    function claim(address, address, uint256) external pure returns (uint256) {
        return 0;
    }

    function getClaimableAmount(address) external pure returns (uint256) {
        return 0;
    }
}

contract SomeBlastTest is Test {
    function setUp() public {
        vm.createSelectFork("blastRpcUrl");
        // Deploy mock of the precompile
        YieldMock yieldMock = new YieldMock();
        // Set mock bytecode to the expected precompile address
        vm.etch(0x0000000000000000000000000000000000000100, address(yieldMock).code);
    }

    function testSomething() public {
        // Now we can interact with Blast contracts without reverts
    }
}
// [!endregion all]