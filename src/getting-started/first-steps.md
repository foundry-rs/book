## First Steps with Foxar

This section provides an overview of the `spark` command line tool. We demonstrate how to create a new project, compile, and test it.

To start a new project with Foxar, use [`spark init`](../reference/spark/spark-init.md):

```sh
{{#include ../output/hello_foxar/spark-init:command}}
```

Let's check out what `spark` generated for us:

```sh
$ cd hello_foxar
{{#include ../output/hello_foxar/tree:all}}
```

We can build the project with [`spark build`](../reference/spark/spark-build.md):

```sh
{{#include ../output/hello_foxar/spark-build:all}}
```

And run the tests with [`spark test`](../reference/spark/spark-test.md):

```sh
{{#include ../output/hello_foxar/spark-test:all}}
```
<br>

> 💡 **Tip**
> 
> You can always print help for any subcommand (or their subcommands) by adding `--help` at the end.

You can watch [these](../tutorials/learn-foxar.md) beginner tutorials if you are a visual learner.
