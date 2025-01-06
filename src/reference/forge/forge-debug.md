## forge debug

### NAME

forge-debug - Debug a single smart contract as a script.

### SYNOPSIS

``forge debug`` [*options*] *path* [*args...*]

### DESCRIPTION

Debugs a single smart contract located in the source file (*path*) as a script.

If multiple contracts are in the specified source file, you must pass `--target-contract` to specify
what contract you want to run.

#### Calls

After the script is deployed to the internal EVM a call is made to a function with the signature `setUp()`, if present.

By default, the script is assumed to be contained in a function with the signature `run()`. If you wish to
run a different function, pass `--sig <SIGNATURE>`.

The signature can be a fragment (`<function name>(<types>)`), or raw calldata.

If you pass a fragment, and the function has parameters, you can add the call parameters to the end of the command (*args*).

#### Forking

It is possible to run the script in a forked environment by passing `--fork-url <URL>`.

When the script is running in a forked environment, you can access all the state of the forked chain as you would
if you had deployed the script. [Cheatcodes][cheatcodes] are still available.

You can also specify a block number to fork from by passing `--fork-block-number <BLOCK>`. When forking from a
specific block, the chain data is cached to `~/.foundry/cache`. If you do not want to cache the chain data,
pass `--no-storage-caching`.

#### Debugging

It is possible to run the script in an interactive debugger. To start the debugger, pass `--debug`.

More information on the debugger can be found in the [debugger chapter][debugger].

### OPTIONS

#### Debug Options

`--target-contract` *contract_name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the contract you want to run

`-s` *signature*  
`--sig` *signature*  
&nbsp;&nbsp;&nbsp;&nbsp;The signature of the function you want to call in the contract, or raw calldata. Default: `run()`

`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Open the script in the [debugger][debugger].

{{#include evm-options.md}}

{{#include executor-options.md}}

{{#include core-build-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Execute the `run()` function in a contract:
    ```sh
    forge debug src/Contract.sol
    ```

2. Open a script in the debugger:
    ```sh
    forge debug src/Contract.sol --debug
    ```

3. Execute the `foo()` function in a contract:
    ```sh
    forge debug src/Contract.sol --sig "foo()"
    ```

4. Execute a contract with a function that takes parameters:
    ```sh
    forge debug src/Contract.sol --sig "foo(string,uint256)" "hello" 100
    ```

5. Execute a contract with raw calldata:
    ```sh
    forge debug src/Contract.sol --sig "0x..."
    ```

### SEE ALSO

[forge](./forge.md), [forge test](./forge-test.md)

[debugger]: ../../forge/debugger.md
[cheatcodes]: ../../cheatcodes/
