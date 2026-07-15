// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {DeploymentConfig} from "../src/ConfigTypes.sol";
import {JsonBindings} from "../utils/JsonBindings.sol";

contract JsonBindingsTest {
    using JsonBindings for *;

    function test_deserializeDeploymentConfig() external pure {
        string memory json =
            '{"owner":"0x000000000000000000000000000000000000bEEF","initialValue":7}';

        DeploymentConfig memory config = json.deserializeDeploymentConfig();

        assert(config.owner == address(0xBEEF));
        assert(config.initialValue == 7);
    }
}
