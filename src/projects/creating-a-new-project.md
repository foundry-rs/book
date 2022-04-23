## Creating a New Project

To start a new project with Foundry, use [`forge init`](../reference/forge/forge-init.md):

```sh
{{#include ../output/hello_foundry/forge-init:command}}
```

This creates a new directory `hello_foundry` from the default template. This also initializes a new `git` repository.

If you want to create a new project using a different template, you would pass the `--template` flag, like so:

```sh
$ forge init --template https://github.com/foundry-rs/forge-template hello_template
```

For now, let's check what the default template looks like:

```sh
$ cd hello_foundry
{{#include ../output/hello_foundry/tree:all}}
```

The default template comes with one dependency installed: DSTest. This is the preferred assertion library used for Foundry projects. Additionally, the template also comes with an empty starter contract and a simple test.

Let's build the project:

```sh
{{#include ../output/hello_foundry/forge-build:all}}
```

And run the tests:

```sh
{{#include ../output/hello_foundry/forge-test:all}}
```

You'll notice that two new directories have popped up: `out` and `cache`.

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by `forge` to only recompile what is necessary.
