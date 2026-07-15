// SPDX-License-Identifier: MIT
// [!region all]
pragma solidity ^0.8.20;

contract CorpusTest {
    function testFuzz_classify(uint256 value) public pure {
        if (value == 0xF00DF00D) {
            assert(value > 1_000_000);
        } else if (value < 10) {
            assert(value * value < 100);
        } else {
            assert(value >= 10);
        }
    }
}
// [!endregion all]
