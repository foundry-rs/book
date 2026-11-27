// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// [!region inherit]
import {SharedVaultChecks} from "../shared/SharedVaultChecks.t.sol";

// Inside `test/unit`, so it runs the inherited `test_startsEmpty`.
contract VaultChecksTest is SharedVaultChecks {}
// [!endregion inherit]
