# forge init

Create a new Forge project

```bash
$ forge init --help
Usage: forge init [OPTIONS] [PATH]

Arguments:
  [PATH]
          The root directory of the new project
          
          [default: .]

Options:
  -t, --template <TEMPLATE>
          The template to start from

  -b, --branch <BRANCH>
          Branch argument that can only be used with template option. If not specified, the default
          branch is used

      --offline
          Do not install dependencies from the network
          
          [aliases: no-deps]

      --force
          Create the project even if the specified root directory is not empty

      --vscode
          Create a .vscode/settings.json file with Solidity settings, and generate a remappings.txt
          file

      --shallow
          Perform shallow clones instead of deep ones.
          
          Improves performance and reduces disk usage, but prevents switching branches or tags.

      --no-git
          Install without adding the dependency as a submodule

      --no-commit
          Do not create a commit

  -q, --quiet
          Do not print any messages

  -h, --help
          Print help (see a summary with '-h')
```