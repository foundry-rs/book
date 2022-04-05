## Working on an Existing Project

If you download an existing project that uses Foundry, it is really easy to get going.

First, get the project from somewhere. In this example, we will clone the `forge-std` repository from GitHub:

```sh
$ git clone https://github.com/brockelmore/forge-std
$ forge install
```

We run `forge install` to install the submodule dependencies that are in the project.

To build, use `forge build`:

```sh
{{#include ../output/forge-std/forge-build:all}}
```

And to test, use `forge test`:

```sh
{{#include ../output/forge-std/forge-test:all}}
```
