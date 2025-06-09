---
description: Best practices for writing secure and maintainable deployment scripts with proper testing and frontrunning protection.
---

## Scripting Practices

### Use `run` as the default function

Stick with `run` as the default function name for clarity.

### Assign correct function visibility

Any methods that are not intended to be called directly in the script should be `internal` or `private`. Generally the only public method should be `run`, as it's easier to read/understand when each script file just does one thing.

### Naming script files

Consider prefixing scripts with a number based on the order they're intended to be run over the protocol's lifecycle. For example, `01_Deploy.s.sol`, `02_TransferOwnership.s.sol`. This makes things more self-documenting. This may not always apply depending on your project.

### Test your scripts

- Unit test them like you would test normal contracts, by writing tests that assert on the state changes made from running the script.
- Write your deploy script and scaffold tests by running that script. Then, run all tests against the state resulting from your production deployment script. This is a great way to gain confidence in a deploy script.
- Within your script itself, use `require` statements (or the `if (condition) revert()` pattern if you prefer) to stop execution of your script if something is wrong. For example, `require(computedAddress == deployedAddress, "address mismatch")`. Using the `assertEq` helpers instead will not stop execution.

### Audit Broadcast Transactions

**Carefully audit which transactions are broadcast**. Transactions not broadcast are still executed in the context of a test, so missing broadcasts or extra broadcasts are easy sources of error in the previous step.

### Avoid getting frontrun

**Watch out for frontrunning**. Forge simulates your script, generates transaction data from the simulation results, then broadcasts the transactions. Make sure your script is robust against chain-state changing between the simulation and broadcast. A sample script vulnerable to this is below:

```solidity
// Pseudo-code, may not compile.
contract VulnerableScript is Script {
   function run() public {
      vm.startBroadcast();

      // Transaction 1: Deploy a new Gnosis Safe with CREATE.
      // Because we're using CREATE instead of CREATE2, the address of the new
      // Safe is a function of the nonce of the gnosisSafeProxyFactory.
      address mySafe = gnosisSafeProxyFactory.createProxy(singleton, data);

      // Transaction 2: Send tokens to the new Safe.
      // We know the address of mySafe is a function of the nonce of the
      // gnosisSafeProxyFactory. If someone else deploys a Gnosis Safe between
      // the simulation and broadcast, the address of mySafe will be different,
      // and this script will send 1000 DAI to the other person's Safe. In this
      // case, we can protect ourselves from this by using CREATE2 instead of
      // CREATE, but every situation may have different solutions.
      dai.transfer(mySafe, 1000e18);

      vm.stopBroadcast();
   }
}
```

### Reading JSON files

For scripts that read from JSON input files, put the input files in `script/input/<chainID>/<description>.json`. Then have `run(string memory input)` (or take multiple string inputs if you need to read from multiple files) as the script's signature, and use the below method to read the JSON file.

```solidity
function readInput(string memory input) internal returns (string memory) {
  string memory inputDir = string.concat(vm.projectRoot(), "/script/input/");
  string memory chainDir = string.concat(vm.toString(block.chainid), "/");
  string memory file = string.concat(input, ".json");
  return vm.readFile(string.concat(inputDir, chainDir, file));
}
```
