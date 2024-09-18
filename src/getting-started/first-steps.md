## First Steps with Foundry

This section introduces the `forge` command-line tool. We will walk through creating a new project, compiling it, and running tests.

To start a new project with Foundry, use the [`forge init`](../reference/forge/forge-init.md) command:

```sh
{{#include ../output/hello_foundry/forge-init:command}}
```

Now, let’s explore the structure that `forge` has generated for us:

```sh
$ cd hello_foundry
{{#include ../output/hello_foundry/tree:all}}
```

You can compile the project using [`forge build`](../reference/forge/forge-build.md):

```sh
{{#include ../output/hello_foundry/forge-build:all}}
```

To run the tests, use the [`forge test`](../reference/forge/forge-test.md) command:

```sh
{{#include ../output/hello_foundry/forge-test:all}}
```

<br>

> 💡 **Tip**
>
> You can always view detailed help for any command or subcommand by appending `--help` to it.

For visual learners, be sure to check out these [beginner tutorials](../tutorials/learn-foundry.md).
