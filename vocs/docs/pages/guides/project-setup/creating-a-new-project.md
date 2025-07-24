---
description: Initialize a new Foundry project using forge init with default templates and project structure.
---

## Creating a New Project

::::steps

#### Initialize the project

To start a new project with Foundry, use [`forge init`](/forge/reference/forge-init):

```sh
// [!include ~/snippets/output/hello_foundry/forge-init:command]
```

This creates a new directory `hello_foundry` from the default template. This also initializes a new `git` repository.

:::info
If you want to create a new project using a different template, you would pass the `--template` flag, like so:
```sh
forge init --template https://github.com/foundry-rs/forge-template hello_template
```
:::

#### Navigate to the project directory

Move into your newly created project:

```sh
cd hello_foundry
```

#### Explore the project structure

Let's check what the default template looks like:

```sh
// [!include ~/snippets/output/hello_foundry/tree:all]
```

The default template comes with one dependency installed: Forge Standard Library. This is the preferred testing library used for Foundry projects. Additionally, the template also comes with an empty starter contract and a simple test.

#### Build the project

Compile your contracts:

```sh
// [!include ~/snippets/output/hello_foundry/forge-build:all]
```

#### Run the tests

Execute the test suite:

```sh
// [!include ~/snippets/output/hello_foundry/forge-test:all]
```

You'll notice that two new directories have popped up: `out` and `cache`.

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by `forge` to only recompile what is necessary.

::::
