## spark install

### NAME

spark-install - Install one or more dependencies.

### SYNOPSIS

``spark install`` [*options*] [*deps...*]

### DESCRIPTION

Install one or more dependencies.

Dependencies are installed as git submodules. If you do not want this behavior, pass `--no-git`.

If no arguments are provided, then existing dependencies are installed.

Dependencies can be a raw URL (`https://foo.com/dep`), an SSH URL (`git@github.com:owner/repo`), or the path to a GitHub repository (`owner/repo`).
Additionally, a ref can be added to the dependency path to install a specific version of a dependency.

A ref can be:

- A branch: `owner/repo@master`
- A tag: `owner/repo@v1.2.3`
- A commit: `owner/repo@8e8128`

The ref defaults to `master`.

You can also choose the name of the folder the dependency will be in. By default, the folder name is the name of
the repository. If you want to change the name of the folder, prepend `<folder>=` to the dependency.

### OPTIONS

#### Project Options

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

#### VCS Options

`--no-commit`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not create a commit.

`--no-git`  
&nbsp;&nbsp;&nbsp;&nbsp;Install without adding the dependency as a submodule.

#### Display Options

`-q`  
`--quiet`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not print any messages.

{{#include common-options.md}}

### EXAMPLES

1. Install a dependency:
    ```sh
    spark install transmissions11/solmate
    ```

2. Install a specific version of a dependency:
    ```sh
    spark install transmissions11/solmate@v7
    ```

3. Install multiple dependencies:
    ```sh
    spark install transmissions11/solmate@v7 OpenZeppelin/openzeppelin-contracts
    ```

4. Install a dependency without creating a submodule:
    ```sh
    spark install --no-git transmissions11/solmate
    ```

5. Install a dependency in a specific folder:
    ```sh
    spark install soulmate=transmissions11/solmate
    ```

### SEE ALSO

[spark](./spark.md), [spark update](./spark-update.md), [spark remove](./spark-remove.md)
