## Working on an Existing Project

Foxar makes developing with existing projects have no overhead.

For this example, we will use [PaulRBerg][paul]'s [`foxar-template`][template].

First, clone the project and run [`spark install`][install] inside the project directory.

```sh
$ git clone https://github.com/PaulRBerg/foxar-template
$ cd foxar-template 
$ spark install
```

We run [`spark install`][install] to install the submodule dependencies that are in the project.

To build, use [`spark build`][build]:

```sh
{{#include ../output/foxar-template/spark-build:all}}
```

And to test, use [`spark test`][test]:

```sh
{{#include ../output/foxar-template/spark-test:all}}
```

[paul]: https://github.com/PaulRBerg
[template]: https://github.com/PaulRBerg/foxar-template
[install]: ../reference/spark/spark-install.md
[build]: ../reference/spark/spark-build.md
[test]: ../reference/spark/spark-test.md
