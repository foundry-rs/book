---
title: Cheatcode Tutorial
author: Brock Elmore
version: 2022.04
tags: ["cheatcode", "tutorial", "ffi", "hevm", "forge", "stdlib"]
---
<!-- @source {@link https://github.com/foundry-rs/foundry/blob/d34e6926c90331980b7d1bcf1a5451c900e71d25/CheatcodeTutorial.md} -->


# Cheatcode Tutorial

Cheatcodes give you more power and flexibility when writing your tests. They unlock the entire blockchain's state and transaction context for you, as well as empowering you
with things like deriving an address from a private key.

Below is an example test contract. Each test function would be ran upon calling `forge test`. Look through each test and the associated comments to see how each might be useful to you.

```solidity
import "ds-test/test.sol";

interface Vm {
    // Set block.timestamp (newTimestamp)
    function warp(uint256) external;
    // Set block.height (newHeight)
    function roll(uint256) external;
    // Loads a storage slot from an address (who, slot)
    function load(address,bytes32) external returns (bytes32);
    // Stores a value to an address' storage slot, (who, slot, value)
    function store(address,bytes32,bytes32) external;
    // Signs data, (privateKey, digest) => (v, r, s)
    function sign(uint256,bytes32) external returns (uint8,bytes32,bytes32);
    // Gets address for a given private key, (privateKey) => (address)
    function addr(uint256) external returns (address);
    // Performs a foreign function call via terminal, (stringInputs) => (result)
    function ffi(string[] calldata) external returns (bytes memory);
    // Calls another contract with a specified `msg.sender`, (newSender, contract, input) => (success, returnData)
    function prank(address, address, bytes calldata) external payable returns (bool, bytes memory);
    // Sets an address' balance, (who, newBalance)
    function deal(address, uint256) external;
    // Sets an address' code, (who, newCode)
    function etch(address, bytes calldata) external;
}

contract Bar {
    uint256 private youCantReadMe;

    function setYCRM(uint256 val) public {
        youCantReadMe = val;   
    }

    function checkSender() public returns (address) {
        return msg.sender;
    }

    receive() {
        require(false, "I cannot receive ether");
    }
}

contract BarTest is DSTest {
    // Cheatcodes live at a specific address; you can think of them as
    // precompiles in a sense. It is derived from:
    // address vm == uint160(uint256(keccak256('hevm cheat code')));

    Vm vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    Bar bar;

    function setUp() public {
        // This is effective a "beforeEach" block. It will run
        // prior to each test
        bar = new Bar();
    }

    // `warp` changes the block timestamp
    function testWarp() public {
        // block.timestamp is by default set to 0, unless otherwise
        // specified in environment variables
        assertEq(block.timestamp, 0);

        // sets block.timestamp
        vm.warp(100);

        assertEq(block.timestamp, 100);
    }

    // `roll` changes the block number/height
    function testRoll() public {
        // block.height is by default set to 0, unless otherwise
        // specified in environment variables
        assertEq(block.height, 0);

        // sets block.height
        vm.roll(100);

        assertEq(block.height, 100);
    }

    // `load` lets you read a storage slot from another
    // contract
    function testLoad() public {
        // We have no way to read the private `youCantReadMe` variable
        // in the `Bar` contract, in normal solidity.
        //
        // To allow us to test against private variables state changes,
        // if you know the storage slot of the variable you can call `load`

        // We provide the address we want to load storage from,
        // and the slot we want to read. in this case, we know it is in
        // slot 0

        bar.setYCRM(100);

        uint256 youCantReadMe = uint256(vm.load(address(bar), bytes32(uint256(0))));

        assertEq(youCantReadMe, 100);
    }

    // `store` lets you store a storage slot from another
    // contract
    function testStore() public {
        // This is much the same has `load` but lets us *set* arbitrary
        // storage for another contract instead of read.

        // We provide the address and slot we want to store a value to.
        //
        //         target             slot              value to store
        //       v----------v  v-----------------v  v-------------------v
        vm.store(address(bar), bytes32(uint256(0)), bytes32(uint256(100)));

        uint256 youCantReadMe = uint256(vm.load(address(bar), bytes32(uint256(0))));

        assertEq(youCantReadMe, 100);
    }

    // `sign` lets you sign a digest, like a `permit`/EIP-2612 digest, given a private key as a uint256.
    // `addr` converts a private key into an address
    function testSignAndAddr() public {
        // `addr` computes the address from a private key
        address vmAddr = vm.addr(1);
        bytes32 hash = keccak256("hi there!");

        // internally, `forge` signs the hash for you
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);

        // we can recover the signer address using solidity's builtin `ecrecover`
        address signer = ecrecover(hash, v, r, s);

        // and our derived address from forge matches the ecrecovered address
        assertEq(vmAddr, signer);
    }

    // `ffi` lets you call a function in the terminal
    // NOTE: this functionality must be enabled in the environment variables otherwise it will fail.
    function testFFI() public {
        // we want to echo out "acab" in our terminal, so we construct the arguments
        string[] memory inputs = new string[](3);
        inputs[0] = "echo";
        inputs[1] = "-n";
        inputs[2] = "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000046163616200000000000000000000000000000000000000000000000000000000";

        // the vm calls out to the terminal and grabs the output
        bytes memory res = vm.ffi(inputs);
        (string memory output) = abi.decode(res, (string));
        assertEq(output, "acab");
    }

    // `prank` lets you change the `msg.sender` of a particular low level call.
    function testPrank() public {
        // we the msg.sender of the new call to be address(1337)
        address newSender = address(1337);
        bytes4 sig = bar.checkSender.selector;
        bytes memory calld = abi.encodePacked(sig);

        // as of now, prank is treated like a low level call
        // this may change in the future to work more like `expectRevert` (an upcoming cheatcode)
        (bool success, bytes memory ret) = vm.prank(newSender, address(bar), calld);
        assertTrue(success);

        // we can decode the return data & check the returned sender of the call
        address barSender = abi.decode(ret, (address));
        assertEq(barSender, newSender);
    }

    // `deal` lets you set the balance of an address *without* performing a transfer
    function testDeal() public {
        address b = address(bar);
        assertEq(b.balance, 0);

        // note: the `Bar` contract *cannot* be transferred Ether as it's `receive` function reverts
        // but since `deal` doesn't perform a transfer we can do this.
        vm.deal(b, 1338);
        assertEq(b.balance, 1338);
    }

    // `etch` sets the code of a particular address. This can be useful for mocking particular contracts at particular addresses
    function testEtch() public {
        address rewriteCode = address(1337);
        
        // we want the new code to be 0x1338 of address(1337)
        bytes memory newCode = hex"1338";
        vm.etch(rewriteCode, newCode);

        // call a helper function to get the code
        bytes memory nCode = getCode(rewriteCode);
        assertEq(string(newCode), string(nCode));
    }

    function getCode(address who) internal returns (bytes memory oCode) {
        assembly {
            // retrieve the size of the code, this needs assembly
            let size := extcodesize(who)
            // allocate output byte array - this could also be done without assembly
            // by using oCode = new bytes(size)
            oCode := mload(0x40)
            // new "memory end" including padding
            mstore(0x40, add(oCode, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // store length in memory
            mstore(oCode, size)
            // actually retrieve the code, this needs assembly
            extcodecopy(who, add(oCode, 0x20), 0, size)
        }
    }
}


```
