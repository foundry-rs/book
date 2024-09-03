# forge soldeer install

Install a dependency

```bash
$ forge soldeer install --help
Usage: forge soldeer install [OPTIONS] [DEPENDENCY~VERSION] [URL]

Arguments:
  [DEPENDENCY~VERSION]
          The dependency name and version, separated by a tilde.
          
          If not present, this command will perform `soldeer update`

  [URL]
          The URL to the dependency zip file, if not from the Soldeer repository
          
          Example: https://my-domain/dep.zip

Options:
      --rev <REV>
          A Git revision

      --tag <TAG>
          A Git tag

      --branch <BRANCH>
          A Git branch

  -g, --regenerate-remappings
          If set, this command will delete the existing remappings and re-create them

  -d, --recursive-deps
          If set, this command will install the recursive dependencies (via submodules or via
          soldeer)

  -h, --help
          Print help (see a summary with '-h')

For more information, read the README.md
```