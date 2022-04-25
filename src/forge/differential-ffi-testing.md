## Differential Testing

Forge can enable differential fuzz testing between different implementations, and even against non-EVM executables using the `ffi` [cheatcode](../cheatcodes/ffi.md).

[Differential testing](https://en.wikipedia.org/wiki/Differential_testing) cross references multiple implementations of the same function by comparing each one's output. Imagine we have a function specification `F(X)`, and two implementations of that specification: `f1(X)` and `f2(X)`. We expect `EQ(f1(x), f2(x))` for all x that exist in an appropriate input space and some equality function EQ. If `!EQ(f1(x), f2(x))`, we know that at least one function is incorrectly implementing `F(X)`. This process of testing for equality and identifying discrepancies is the core of differential testing.

Some real life uses include:
* Comparing upgraded implementations to their predecessors
* Testing code against known reference implementations
* Confirming compatability with third party tools and dependencies

Below are some examples on how you can use Foundry for differential testing.

### Primer: The `ffi` cheatcode

`ffi` allows you to execute an arbitrary shell command and capture the output. Here's a mock example:

```solidity
import "forge-std/Test.sol";

contract TestContract is Test {

    function testMyFFI () public {
        string[] memory cmds = new string[](2);
        cmds[0] = "cat";
        cmds[1] = "address.txt"; // assume contains abi-encoded address.
        bytes memory result = vm.ffi(cmds);
        address loadedAddress = abi.decode(result, (address));
        // Do something with the address
        // ...
    }
}
```
An address has previously been written to `address.txt`, and we read it in using the cheatcode.

### Example: Differential Testing Merkle Tree Implementations
[Merkle Trees](https://en.wikipedia.org/wiki/Merkle_tree) are a cryptographic commitmentment scheme frequently used in blockchain applications. Their popularity means that there are a number of different implementations of Merkle Tree generators, provers, and verifiers. Often, Merkle roots and proofs are generated uisng a language like Javascript or Python, and proofs are verified on-chain in solidity.

[Murky](https://github.com/dmfxyz/murky) is a complete implementation of Merkle roots, proofs, and verification in solidity. Its test suite includes differential tests against OpenZeppelin's Merkle proof verification implementation, as well as root generation tests against a reference Javascript implementation. These tests are powered by Foundry's fuzzing and `ffi` capabilities.

#### Differential Testing against reference TypeScript implementation
Using the `ffi` cheatcode, Murky tests its own Merkle root implementation against a TypeScript implementation using data provided by forge's fuzzer:

```solidity
function testMerkleRootMatchesJSImplementationFuzzed(bytes32[] memory leaves) public {
    vm.assume(leaves.length > 1);
    bytes memory packed = abi.encodePacked(leaves);
    string[] memory runJsInputs = new string[](8);

    // Build ffi command string
    runJsInputs[0] = 'npm';
    runJsInputs[1] = '--prefix';
    runJsInputs[2] = 'differential_testing/scripts/';
    runJsInputs[3] = '--silent';
    runJsInputs[4] = 'run';
    runJsInputs[5] = 'generate-root-cli';
    runJsInputs[6] = leaves.length.toString();
    runJsInputs[7] = packed.toHexString();

    // Run command and capture output
    bytes memory jsResult = vm.ffi(runJsInputs);
    bytes32 jsGeneratedRoot = abi.decode(jsResult, (bytes32));
    
    // Calculate root using Murky
    bytes32 murkyGeneratedRoot = m.getRoot(leaves);
    assertEq(murkyGeneratedRoot, jsGeneratedRoot);
}
```

forge runs `npm --prefix differential_testing/scripts/ --silent run generate-root-cli {numLeaves} {hexEncodedLeaves}`. This calculates the Merkle root for the input data using the reference JavaScript implementation. The script prints the root to stdout, and that printout is captured as `bytes` in the return value of `vm.ffi()`.

The test then calculates the root using the solidity implementation.
Finally, the test asserts that the both roots are exactly equal. If not, the test fails.

#### Differential testing against OpenZeppelin's Merkle Proof Library
You may want to use differential testing against another solidity implementation. In that case, `ffi` is not needed. In this example, the reference implementation is imported directly into the test.

```solidity
import "openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
//...
function testCompatabilityOpenZeppelinProver(bytes32[] memory _data, uint256 node) public {
    vm.assume(_data.length > 1);
    vm.assume(node < _data.length);
    bytes32 root = m.getRoot(_data);
    bytes32[] memory proof = m.getProof(_data, node);
    bytes32 valueToProve = _data[node];
    bool murkyVerified = m.verifyProof(root, proof, valueToProve);
    bool ozVerified = MerkleProof.verify(proof, root, valueToProve);
    assertTrue(murkyVerified == ozVerified);
}
```

#### Standardized Testing against reference data
FFI is also useful for injecting reproducible, standardized data into the testing environment. In the Murky library, this is used as a benchmark for gas snapshotting (see: [forge snapshot](./gas-snapshots.md)).

```solidity
bytes32[100] data;
uint256[8] leaves = [4, 8, 15, 16, 23, 42, 69, 88];

function setUp() public {
    string[] memory inputs = new string[](2);
    inputs[0] = "cat";
    inputs[1] = "src/test/standard_data/StandardInput.txt";
    bytes memory result =  vm.ffi(inputs);
    data = abi.decode(result, (bytes32[100]));
    m = new Merkle();
}
    
function testMerkleGenerateProofStandard() public view {
    bytes32[] memory _data = _getData(); 
    for (uint i = 0; i < leaves.length; ++i) {
        m.getProof(_data, leaves[i]);
    }
}
```
`src/test/standard_data/StandardInput.txt` is a text file that contains an encoded bytes32[100] array. It's generated outside of the test and can be used in any language's web3 sdk. It looks something like:

```ignore
0xf910ccaa307836354233316666386231414464306335333243453944383735313..423532
```

The standardized testing contract reads in the file using `ffi`. It decodes the data into an array and then, in this example, generates proofs for 8 different leaves. Because the data is constant and standard, we can meaningfully measure gas and performance improvements using this test. 

> Of course, one could just hardcode the array into the test! But that makes it much harder to do consistent testing across contracts, implementations, etc.

All source code for the above examples is availabe in [this repo](https://github.com/dmfxyz/murky).