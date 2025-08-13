## chisel

### NAME

`chisel` - Test and receive verbose feedback on Solidity inputs within a REPL environment.

### SYNOPSIS

`chisel` [*options*]

#### Subcommands (bin)

1. `chisel list`
   - Displays all cached sessions stored in `~/.foundry/cache/chisel`.
1. `chisel load <id>`
   - If a cached session with `id = <id>` exists, launches the REPL and loads the corresponding session.
1. `chisel view <id>`
   - If a cached session with `id = <id>` exists, displays the source code of the session's REPL contract.
1. `chisel clear-cache`
   - Deletes all cache files within the `~/.foundry/cache/chisel` directory. These sessions are unrecoverable, so use this command with care.

#### Flags

See `man chisel` or `chisel --help` for all available environment configuration flags.

### DESCRIPTION

Chisel is a Solidity REPL (short for "read-eval-print loop") that allows developers to write
and test Solidity code snippets. It provides an interactive environment for writing and executing
Solidity code, as well as a set of built-in commands for working with and debugging your code. This
makes it a useful tool for quickly testing and experimenting with Solidity code without having to
spin up a sandbox foundry test suite.

### Usage

To open chisel, simply execute the `chisel` binary.

From there, input valid Solidity code. There are two kinds of inputs to the chisel prompt apart from commands:

1. Expressions
   - Expressions are statements that return a value or otherwise can be evaluated on their own. For example,
     `1 << 8` is an expression that will evaluate to a `uint256` with the value `256`. Expressions will be
     evaluated up front, and will not persist in the session state past their evaluation.
   - Examples:
     - `address(0).balance`
     - `abi.encode(256, bytes32(0), "Chisel!")`
     - `myViewFunc(128)`
     - ...
1. Statements

   - Statements are snippets of code that are meant to persist in the session's state. Statements include
     variable definitions, calls to non-state-mutating functions that return a value, and contract, function,
     event, error, mapping, or struct definitions. If you would like an expression to be evaluated as a statement,
     a semi-colon (`;`) can be appended to the end.
   - Examples:

     - `uint256 a = 0xa57b`
     - `myStateMutatingFunc(128)` || `myViewFunc(128);`. Notice the `;`
     - ```solidity
       function hash64(
         bytes32 _a,
         bytes32 _b
       ) internal pure returns (bytes32 _hash) {
           assembly {
               // Store the 64 bytes we want to hash in scratch space
               mstore(0x00, _a)
               mstore(0x20, _b)

               // Hash the memory in scratch space
               // and assign the result to `_hash`
               _hash := keccak256(0x00, 0x40)
           }
       }
       ```

     - `event ItHappened(bytes32 indexed hash)`
     - `struct Complex256 { uint256 re; uint256 im; }`
     - ...

#### Available Commands

```text
// [!include ~/snippets/output/chisel/help:output]
```

**General**

`!help` | `!h`

Display all commands.

`!quit` | `!q`

Quit Chisel.

`!exec <command> [args]` | `!e <command> [args]`

Execute a shell command and print the output.

Example:

```sh
➜ !e ls
CHANGELOG.md
LICENSE
README.md
TESTS.md
artifacts
cache
contracts
crytic-export
deploy
deploy-config
deployments
dist
echidna.yaml
forge-artifacts
foundry.toml
hardhat.config.ts
layout-lock.json
node_modules
package.json
scripts
slither.config.json
slither.db.json
src
tasks
test-case-generator
tsconfig.build.json
tsconfig.build.tsbuildinfo
tsconfig.json
```

**Session**

`!clear` | `!c`

Clear current session source.

Under the hood, each Chisel session has an underlying contract that is altered as you input statements. This command clears this contract and resets your session to the default state.

`!source` | `!so`

Display the source code of the current session.

As mentioned above, each Chisel session has an underlying contract. This command will display the source code of this contract.

`!save [id]` | `!s [id]`

Save the current session to cache.

Chisel allows for caching sessions, which can be very useful if you are testing more complex logic in Chisel or if you want to return to a session at a later time. All cached Chisel sessions are stored in `~/.foundry/cache/chisel`.

If an `id` argument is not supplied, Chisel will automatically assign a numerical ID to the session you are saving.

`!load <id>` | `!l <id>`

Load a previous session ID from cache.

This command will load a previously cached session from the cache. Along with the session's source, all environment settings will also be loaded. The `id` argument must correspond with an existing cached session in the `~/.foundry/cache/chisel` directory.

`!list` | `!ls`

List all cached sessions.

This command will display all cached chisel sessions within the `~/.foundry/cache/chisel` directory.

`!clearcache` | `!cc`

Clear the chisel cache of all stored sessions.

Deletes all cache files within the `~/.foundry/cache/chisel` directory. These sessions are unrecoverable, so use this command with care.

`!export` | `!ex`

Export the current session source to a script file.

If `chisel` was executed from the root directory of a foundry project, it is possible to export your current session to a foundry script in the `scripts` dir of your project.

`!fetch <addr> <name>` | `!fe <addr> <name>`

Fetch the interface of a verified contract on Etherscan.

This command will attempt to parse the interface of a verified contract @ `<addr>` from the Etherscan API. If successful, the interface will be inserted into the session source with the name `<name>`.

At the moment, only interfaces of verified contracts on Ethereum mainnet can be fetched. In the future, Chisel will support fetching interfaces from multiple Etherscan-supported chains.

`!edit`

Open the current session's `run()` function in an editor.

chisel will use the editor defined in the `$EDITOR` environment variable.

**Environment**

`!fork <url>` | `!f <url>`

Fork an RPC for the current session. Supply 0 arguments to return to a local network.

Attempts to fork the state of the provided RPC. If no URL is provided, returns to using a blank, local devnet state.

`!traces` | `!t`

Enable / disable traces for the current session.

When tracing is enabled, foundry-style call tracing and logs will be printed after each statement is inserted.

**Debug**

`!memdump` | `!md`

Dump the raw memory of the current state.

Attempts to dump the raw memory of the machine state after the last instruction of the REPL contract's `run` function has finished executing.

`!stackdump` | `!sd`

Dump the raw stack of the current state.

Attempts to dump the raw stack of the machine state after the last instruction of the REPL contract's `run` function has finished executing.

`!rawstack <var>` | `!rs <var>`

Display the raw value of a variable's stack allocation. For variables that are > 32 bytes in length, this will display their memory pointer.

This command is useful when you want to view the full raw stack allocation for a variable that is less than 32 bytes in length.

Example:

```sh
➜ address addr
➜ assembly {
    addr := not(0)
}
➜ addr
Type: address
└ Data: 0xffffffffffffffffffffffffffffffffffffffff
➜ !rs addr
Type: bytes32
└ Data: 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
➜
```
