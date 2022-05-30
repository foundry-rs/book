## Working on an Existing Project

If you download an existing project that uses Foundry, it is really easy to get going.

First, get the project from somewhere. In this example, we will clone the `femplate` repository from GitHub:

```sh
$ git clone https://github.com/abigger87/femplate
$ cd femplate
$ forge install
```

We run [`forge install`](../reference/forge/forge-install.md) to install the submodule dependencies that are in the project.

To build, use [`forge build`](../reference/forge/forge-build.md):

```sh
{{#include ../output/femplate/forge-build:all}}
```

And to test, use [`forge test`](../reference/forge/forge-test.md):

```sh
{{#include ../output/femplate/forge-test:all}}
```
