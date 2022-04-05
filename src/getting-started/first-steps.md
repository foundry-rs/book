## First Steps with Foundry

This section provides an overview of the `forge` command line tool. We demonstrate how to create a new project, compile, and test it.

To start a new project with Foundry, use `forge init`:

```sh
$ forge init hello_foundry
```

Let's check out what `forge` generated for us:

```sh
$ cd hello_foundry
$ tree .
.
├── lib
│   └── ds-test
└── src
    ├── Contract.sol
    └── test
        └── Contract.t.sol

6 directories, 7 files
```

We can build the project:

```sh
$ forge build
[⠊] Compiling...
[⠢] Compiling 3 files with 0.8.10
[⠆] Solc finished in 70.23ms
Compiler run successful
```

And run the tests:

```sh
$ forge test
[⠊] Compiling...
No files changed, compilation skipped

Running 1 test for src/test/Contract.t.sol:ContractTest
[PASS] testExample() (gas: 120)
Test result: ok. 1 passed; 0 failed; finished in 725.84µs
```
<br>

> 💡 **Tip**
> 
> You can always print help for any subcommand (or their subcommands) by adding `--help` at the end.
