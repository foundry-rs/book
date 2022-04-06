## First Steps with Foundry

This section provides an overview of the `forge` command line tool. We demonstrate how to create a new project, compile, and test it.

To start a new project with Foundry, use `forge init`:

```sh
{{#include ../output/hello_foundry/forge-init:command}}
```

Let's check out what `forge` generated for us:

```sh
$ cd hello_foundry
{{#include ../output/hello_foundry/tree:all}}
```

We can build the project:

```sh
{{#include ../output/hello_foundry/forge-build:all}}
```

And run the tests:

```sh
{{#include ../output/hello_foundry/forge-test:all}}
```
<br>

> 💡 **Tip**
> 
> You can always print help for any subcommand (or their subcommands) by adding `--help` at the end.
