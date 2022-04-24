## Working on an Existing Project

If you download an existing project that uses Foundry, it is really easy to get going.

First, get the project from somewhere. In this example, we will clone the `forge-std` repository from GitHub:

```sh
$ git clone https://github.com/foundry-rs/forge-std
$ cd forge-std
$ forge install
```

We run [`forge install`](../reference/forge/forge-install.md) to install the submodule dependencies that are in the project.

To build, use [`forge build`](../reference/forge/forge-build.md):

```sh
{{#include ../output/forge-std/forge-build:all}}
```

And to test, use [`forge test`](../reference/forge/forge-test.md):

```sh
{{#include ../output/forge-std/forge-test:all}}
```
