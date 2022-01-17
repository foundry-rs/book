## Creating a New Project

To start a new project with Foundry, use `forge init`:

```sh
$ forge init hello_foundry
```

This creates a new directory `hello_foundry` from the default template. This also initializes a new `git` repository.

If you want to create a new project using a different template, you would pass the `--template` flag, like so:

```sh
forge init --template https://github.com/FrankieIsLost/forge-template hello_template
```

For now, let's check what the default template looks like:

```sh
$ cd hello_foundry
$ tree .
.
├── lib
│   └── ds-test
└── src
    ├── Contract.sol
    └── test
        └── Contract.t.sol

6 directories, 7 files
```

The default template comes with one dependency installed: `ds-test`. This is the preferred assertion library used for Foundry projects. Additionally, the template also comes with an empty starter contract and a simple test.

Let's build the project:

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

You'll notice that two new directories have popped up: `out` and `cache`.

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by `forge` to only recompile what is necessary.
