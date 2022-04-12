## forge install

### NAME

forge-install - Install one or more dependencies.

### SYNOPSIS

``forge install`` [*options*] [*deps...*]

### DESCRIPTION

Install one or more dependencies.

Dependencies are installed as git submodules. If you do not want this behavior, pass `--no-git`.

If no arguments are provided, then existing dependencies are installed.

Dependencies can be a raw URL (`https://foo.com/dep`), or the path to a GitHub repository (`owner/repo`).
Additionally, a ref can be added to the dependency path to install a specific version of a dependency.

A ref can be:

- A branch: `owner/repo@master`
- A tag: `owner/repo@v1.2.3`
- A commit: `owner/repo@8e8128`

The ref defaults to `master`.

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
    forge install Rari-Capital/solmate
    ```

2. Install a specific version of a dependency:
    ```sh
    forge install Rari-Capital/solmate@v6
    ```

3. Install multiple dependencies:
    ```sh
    forge install Rari-Capital/solmate@v6 OpenZeppelin/openzeppelin-contracts
    ```

4. Install a dependency without creating a submodule:
    ```sh
    forge install --no-git Rari-Capital/solmate
    ```

### SEE ALSO

[forge](./forge.md), [forge update](./forge-update.md), [forge remove](./forge-remove.md)
