## Vyper support

Foundry supports compiling and testing Vyper contracts.

### 1. Compilation

You can install Vyper by following the instructions [here](https://vyper.readthedocs.io/en/stable/installing-vyper.html). If you have `vyper` available in your PATH, foundry will automatically use it.

Otherwise, you can set the path to `vyper` in your `foundry.toml` by adding the following:
```toml
[vyper]
path = "/path/to/vyper"
```

#### Vyper libraries via `forge install`

If you want an import like the following to work in your Vyper contract:

```vyper
from snekmate.utils import eip712_domain_separator
```

You can install Vyper the desired library via `forge install` e.g. `forge install pcaversaccio/snekmate`.

You then need to adjust your `foundry.toml` as follows (replacing "snekmate" with the name of your
desired package):

```toml
skip = ["**/lib/snekmate/**"]
libs = ["lib", "lib/snekmate/src"]
```

#### Vyper libraries via `pip`

Alternatively if you want to install the package via `pip` into your system's python configuration
or a virtual environment you can point foundry to it by modifying your `foundry.toml` as follows:

```toml
# Assuming you have a virtual environment in `.venv` and are using Python 3.12
libs = ["lib", ".venv/lib/python3.12/site-packages/"]
```

Note that compatible alternative python package managers like `uv` will work too.

### 2. Solidity tests

Let's write a test for this simple Counter contract:

```vyper
number: public(uint256)

@deploy
@payable
def __init__(initial_number: uint256):
    self.number = initial_number

@external
def set_number(new_number: uint256):
    self.number = new_number

@external
def increment():
    self.number += 1
```

We can deploy it by using the `deployCode` cheatcode from `forge-std` and test it with the following Solidity test:
```solidity
import {Test} from "forge-std/Test.sol";

interface ICounter {
    function increment() external;
    function number() external view returns (uint256);
    function set_number(uint256 newNumber) external;
}

contract CounterTest is Test {
    ICounter public counter;
    uint256 initialNumber = 5;

    function setUp() public {
        counter = ICounter(deployCode("Counter", abi.encode(initialNumber)));
        assertEq(counter.number(), initialNumber);
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.number(), initialNumber + 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        counter.set_number(x);
        assertEq(counter.number(), x);
    }
}
```

### 3. Deploying

You can deploy Vyper contracts via `forge create` command:
```bash
forge create Counter --constructor-args '1' --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

And with `deployCode` you can deploy Vyper contracts in your scripts as well:
```solidity
import {Script} from "forge-std/Script.sol";

contract CounterScript is Script {
    function run() public {
        vm.broadcast();
        deployCode("src/Counter.vy", abi.encode(1));
    }
}
```

### 4. Vyper scripts

You can write Vyper scripts in the same way as Solidity scripts:
```vyper
interface Vm:
    def startBroadcast(): nonpayable

interface ICounter:
    def increment(): nonpayable
    def number() -> uint256: view

vm: constant(Vm) = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D)

@external
def run(counter: address):
    number_before: uint256 = staticcall ICounter(counter).number()

    extcall vm.startBroadcast()
    extcall ICounter(counter).increment()

    number_after: uint256 = staticcall ICounter(counter).number()

    assert number_after == number_before + 1
```

Such script can be run with the following command:
```bash
forge script script/Increment.s.vy  --sig 'run' '<counter address>' --rpc-url $RPC_URL --broadcast  --private-key $PRIVATE_KEY
```

### 5. Limitations

- While you can write and run tests and scripts in Vyper, there is no `new` keyword in Vyper allowing you to deploy contracts. This will be addressed in the future with new cheatcodes.
- Vyper does not allow overloads with the same names but different parameter types. Thus some cheatcode combinations might require workarounds to be used. (e.g. `startBroadcast(address sender))` and `startBroadcast(uint256 pk)`)
- `forge coverage` currently does not support Vyper contracts.
