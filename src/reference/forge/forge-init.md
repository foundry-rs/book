## forge init

### NAME

forge-init - Create a new Forge project.

### SYNOPSIS

``forge init`` [*options*] [*root*]

### DESCRIPTION

Create a new Forge project in the directory *root* (by default the current working directory).

The default template creates the following project layout:

```ignore
{{#include ../../output/hello_foundry/tree-with-files:output}}
```

However, it is possible to create a project from another using `--template`.

By default, `forge init` will also initialize a new git repository, install some submodules and create an initial commit message.

If you do not want this behavior, pass `--no-git`.

### OPTIONS

#### Init Options

`--force`  
&nbsp;&nbsp;&nbsp;&nbsp;Create the project even if the specified root directory is not empty.

`-t` *template*  
`--template` *template*  
&nbsp;&nbsp;&nbsp;&nbsp;The template to start from.

`--vscode`  
&nbsp;&nbsp;&nbsp;&nbsp;Create a `.vscode/settings.json` file with Solidity settings, and generate a `remappings.txt` file.

`--offline`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not install dependencies from the network.

#### VCS Options

`--no-commit`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not create an initial commit.

`--no-git`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not create a git repository.

#### Display Options

`-q`  
`--quiet`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not print any messages.

{{#include common-options.md}}

### EXAMPLES

1. Create a new project:
    ```sh
    forge init hello_foundry
    ```

2. Create a new project, but do not create a git repository:
    ```sh
    forge init --no-git hello_foundry
    ```

3. Forcibly create a new project in a non-empty directory:
    ```sh
    forge init --force 
    ```

### SEE ALSO

[forge](./forge.md)
