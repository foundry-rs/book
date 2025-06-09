---
description: Initialize a new Foundry project using forge init with default templates and project structure.
---

## Creating a New Project

To start a new project with Foundry, use [`forge init`](/forge/reference/forge-init):

```sh
// [!include ~/snippets/output/hello_foundry/forge-init:command]
```

This creates a new directory `hello_foundry` from the default template. This also initializes a new `git` repository.

If you want to create a new project using a different template, you would pass the `--template` flag, like so:

```sh
forge init --template https://github.com/foundry-rs/forge-template hello_template
```

For now, let's check what the default template looks like:

```sh
cd hello_foundry
```

```sh
// [!include ~/snippets/output/hello_foundry/tree:all]
```

The default template comes with one dependency installed: Forge Standard Library. This is the preferred testing library used for Foundry projects. Additionally, the template also comes with an empty starter contract and a simple test.

Let's build the project:

```sh
// [!include ~/snippets/output/hello_foundry/forge-build:all]
```

And run the tests:

```sh
// [!include ~/snippets/output/hello_foundry/forge-test:all]
```

You'll notice that two new directories have popped up: `out` and `cache`.

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by `forge` to only recompile what is necessary.
