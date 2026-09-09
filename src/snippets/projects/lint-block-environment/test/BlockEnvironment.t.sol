// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface VmBlockEnvironment {
    function roll(uint256 blockNumber) external;
    function warp(uint256 timestamp) external;
    function getBlockNumber() external view returns (uint256);
    function getBlockTimestamp() external view returns (uint256);
}

contract BlockEnvironmentTest {
    VmBlockEnvironment private constant vm =
        VmBlockEnvironment(address(uint160(uint256(keccak256("hevm cheat code")))));

    function exampleRawNumber() public {
        // [!region number-bad]
        vm.roll(100);
        uint256 saved = block.number; // Warning: this capture can cross the next roll.
        vm.roll(200);
        vm.roll(saved);
        // [!endregion number-bad]
    }

    function testNumberGetterCapture() public {
        // [!region number-good]
        vm.roll(100);
        uint256 saved = vm.getBlockNumber();
        vm.roll(200);
        vm.roll(saved); // Restores 100.
        // [!endregion number-good]
        require(vm.getBlockNumber() == 100, "original block number was not restored");
    }

    function exampleSuppressedNumber() public {
        vm.roll(100);
        // [!region number-suppression]
        // forge-lint: disable-next-line(block-number-across-roll)
        uint256 saved = block.number;
        // [!endregion number-suppression]
        vm.roll(200);
        vm.roll(saved);
    }

    function exampleRawTimestamp() public {
        // [!region timestamp-bad]
        vm.warp(100);
        uint256 saved = block.timestamp; // Warning: this capture can cross the next warp.
        vm.warp(200);
        vm.warp(saved);
        // [!endregion timestamp-bad]
    }

    function testTimestampGetterCapture() public {
        // [!region timestamp-good]
        vm.warp(100);
        uint256 saved = vm.getBlockTimestamp();
        vm.warp(200);
        vm.warp(saved); // Restores 100.
        // [!endregion timestamp-good]
        require(vm.getBlockTimestamp() == 100, "original timestamp was not restored");
    }

    function exampleSuppressedTimestamp() public {
        vm.warp(100);
        // [!region timestamp-suppression]
        // forge-lint: disable-next-line(block-timestamp-across-warp)
        uint256 saved = block.timestamp;
        // [!endregion timestamp-suppression]
        vm.warp(200);
        vm.warp(saved);
    }
}
