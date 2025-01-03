## Working on an Existing Project

Foundry makes developing with existing projects have no overhead.

For this example, we will use [PaulRBerg][paul]'s [`foundry-template`][template].

First, clone the project and run [`forge install`][install] inside the project directory.

```sh
$ git clone https://github.com/PaulRBerg/foundry-template
$ cd foundry-template 
$ forge install
$ bun install # install Solhint, Prettier, and other Node.js deps
```

We run [`forge install`][install] to install the submodule dependencies that are in the project.

To build, use [`forge build`][build]:

```sh
{{#include ../output/foundry-template/forge-build:all}}
```

And to test, use [`forge test`][test]:

```sh
{{#include ../output/foundry-template/forge-test:all}}
```

> ℹ️ **Note**
> If you are already familiar with the foundry, you will notice the `—-zksync` flag; we’ll cover it in detail in the following sections.


[paul]: https://github.com/PaulRBerg
[template]: https://github.com/PaulRBerg/foundry-template
[install]: ../reference/forge/forge-install.md
[build]: ../reference/forge/forge-build.md
[test]: ../reference/forge/forge-test.md
