// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {FsVm} from "./FsVm.sol";

contract FileSystemTest {
    FsVm constant vm = FsVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    // [!region directories]
    function testCreateAndRemoveDir() public {
        // Without `recursive`, the parent `scratch/a` must already exist.
        try vm.createDir("scratch/a/b", false) {
            revert("expected a revert");
        } catch {}

        vm.createDir("scratch/a/b", true);
        vm.assertTrue(vm.fsMetadata("scratch/a/b").isDir);

        // Without `recursive`, only an empty directory can be removed.
        try vm.removeDir("scratch/a", false) {
            revert("expected a revert");
        } catch {}

        vm.removeDir("scratch/a", true);
        vm.assertFalse(vm.exists("scratch/a"));
    }
    // [!endregion directories]

    // [!region copy]
    function testCopyFile() public {
        vm.createDir("scratch/copy", true);

        uint64 copied = vm.copyFile("fixtures/greeting.txt", "scratch/copy/greeting.txt");

        vm.assertEq(copied, 12);
        vm.assertEq(vm.fsMetadata("scratch/copy/greeting.txt").length, copied);
        vm.assertEq(vm.readFile("scratch/copy/greeting.txt"), "hello world\n");

        vm.removeDir("scratch/copy", true);
    }
    // [!endregion copy]

    // [!region binary]
    function testWriteFileBinary() public {
        vm.createDir("scratch/binary", true);
        bytes memory data = hex"00ff10";

        vm.writeFileBinary("scratch/binary/data.bin", data);

        vm.assertEq(vm.readFileBinary("scratch/binary/data.bin"), data);
        vm.assertEq(vm.fsMetadata("scratch/binary/data.bin").length, 3);

        vm.removeDir("scratch/binary", true);
    }
    // [!endregion binary]

    // [!region metadata]
    function testFsMetadata() public {
        FsVm.FsMetadata memory file = vm.fsMetadata("fixtures/greeting.txt");
        vm.assertFalse(file.isDir);
        vm.assertEq(file.length, 12);
        // Times are Unix timestamps in seconds, or 0 where the platform does not report them.
        vm.assertTrue(file.modified > 0);

        vm.assertTrue(vm.fsMetadata("fixtures").isDir);

        // A missing path reverts.
        try vm.fsMetadata("fixtures/missing.txt") {
            revert("expected a revert");
        } catch {}
    }
    // [!endregion metadata]
}
