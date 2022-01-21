## First Steps with Foundry

This section provides an overview of the `forge` command line tool. We demonstrate how to create a new project, compile, and test it.

To start a new project with Foundry, use `forge init`:

```
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
compiling...
success.
```

And run the tests:

```sh
$ forge test
compiling...
no files changed, compilation skipped.
Running 1 test for ContractTest.json:ContractTest
[PASS] testExample() (gas: 254)
```
