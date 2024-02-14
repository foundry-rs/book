## Creating a New Project

To start a new project with Foxar, use [`spark init`](../reference/spark/spark-init.md):

```sh
{{#include ../output/hello_foxar/spark-init:command}}
```

This creates a new directory `hello_foxar` from the default template. This also initializes a new `git` repository.

If you want to create a new project using a different template, you would pass the `--template` flag, like so:

```sh
$ spark init --template https://github.com/foxar-rs/spark-template hello_template
```

For now, let's check what the default template looks like:

```sh
$ cd hello_foxar
{{#include ../output/hello_foxar/tree:all}}
```

The default template comes with one dependency installed: Spark Standard Library. This is the preferred testing library used for Foxar projects. Additionally, the template also comes with an empty starter contract and a simple test.

Let's build the project:

```sh
{{#include ../output/hello_foxar/spark-build:all}}
```

And run the tests:

```sh
{{#include ../output/hello_foxar/spark-test:all}}
```

You'll notice that two new directories have popped up: `out` and `cache`.

The `out` directory contains your contract artifact, such as the ABI, while the `cache` is used by `spark` to only recompile what is necessary.
