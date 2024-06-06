## `prompt`

### Signature

```solidity
function prompt(string calldata promptText) external returns (string memory input);
function promptSecret(string calldata promptText) external returns (string memory input);
function promptSecretUint(string calldata promptText) external returns (uint256);
```

### Description

Display an interactive prompt to the user for inserting arbitrary data.

`vm.prompt` displays an interactive input, while `vm.promptSecret` & `vm.promptSecretUint` display a
hidden input, used for passwords and other secret information that should not
leak to the terminal.

> ℹ️ **Note**
>
> This cheatcode is meant to be used in scripts ― not tests. It is also advised to
> follow the best practices below for testing scripts that use `vm.prompt` and
> handling timeouts, since scripts might otherwise hang or revert. This cheatcode
> reverts when running in a non-interactive shell.

### Configuration

In order to prevent unwanted hangups, `vm.prompt` has a timeout configuration.

In your `foundry.toml`:

```toml
prompt_timeout = 120
```

Default value is `120` and values are in seconds.

### Best practices

#### Testing scripts that use `vm.prompt`

When testing scripts containing `vm.prompt` it is recommended to use the
following pattern:

```solidity
contract Script {
    function run() public {
        uint256 myUint = vm.parseUint(vm.prompt("enter uint"));
        run(myUint);
    }

    function run(uint256 myUint) public {
        // actual logic
    }
}
```

That way, we are keeping the UX gain (don't have to provide `--sig` argument
when running the script), but tests can set any value to `myUint` and not just
a hardcoded default.

#### Handling timeouts

When a user fails to provide an input before the timeout expires, the
`vm.prompt` cheatcode reverts. If you'd like, timeouts can be handled by using
`try/catch`:

```solidity
string memory input;

try vm.prompt("Username") returns (string memory res) {
    input = res;
}
catch (bytes memory) {
    input = "Anonymous";
}
```

### Examples

#### Choose RPC endpoint

Provide an option to choose the RPC/chain to run on.

In your `foundry.toml` file:

```toml
[rpc_endpoints]
mainnet = "https://eth.llamarpc.com"
polygon = "https://polygon.llamarpc.com"
```

In your script:

```solidity
string memory rpcEndpoint = vm.prompt("RPC endpoint");
vm.createSelectFork(rpcEndpoint);
```

#### Parse user input into native types

We can use the string parsing cheatcodes to parse the responses from users:

```solidity
uint privateKey = vm.promptSecretUint("Private key");
address to = vm.parseAddress(vm.prompt("Send to"));
uint amount = vm.parseUint(vm.prompt("Amount (wei)"));
vm.broadcast(privateKey);
payable(to).transfer(amount);
```
