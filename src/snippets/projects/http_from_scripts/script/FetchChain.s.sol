// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Vm} from "forge-std/Vm.sol";

contract FetchChain is Script {
    function run() external {
        string memory baseUrl = vm.envOr("API_URL", string("http://127.0.0.1:8000"));
        (uint256 status, string memory body) = httpGet(string.concat(baseUrl, "/chains/1.json"));
        require(status == 200, string.concat("unexpected HTTP status ", vm.toString(status)));

        string memory name = vm.parseJsonString(body, ".name");
        address router = vm.parseJsonAddress(body, ".router");
        bool active = vm.parseJsonBool(body, ".active");
        console.log(name, router, active);
    }

    function httpGet(string memory url) internal returns (uint256 status, string memory body) {
        string[] memory cmd = new string[](10);
        cmd[0] = "curl";
        cmd[1] = "--silent";
        cmd[2] = "--fail-with-body"; // exit code 22 on HTTP >= 400, body still printed
        cmd[3] = "--max-time";
        cmd[4] = "10";
        cmd[5] = "--retry";
        cmd[6] = "2";
        cmd[7] = "--write-out";
        cmd[8] = "%{stderr}%{http_code}"; // status code on stderr, body on stdout
        cmd[9] = url;

        Vm.FfiResult memory res = vm.tryFfi(cmd);
        // 0: success, 22: HTTP error status; anything else: no usable response
        // (6: host not resolved, 7: connection failed, 28: timeout).
        if (res.exitCode != 0 && res.exitCode != 22) {
            revert(string.concat("curl failed with exit code ", vm.toString(res.exitCode)));
        }
        return (vm.parseUint(string(res.stderr)), string(res.stdout));
    }
}
