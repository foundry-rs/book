# forge soldeer install

Install a dependency

```bash
$ forge soldeer install --help
```

```txt
Usage: forge soldeer install [OPTIONS] [DEPENDENCY~VERSION] [URL]

Arguments:
  [DEPENDENCY~VERSION]
          The dependency name and version, separated by a tilde. The version is
          always required.
          
          If not present, this command will install all dependencies which are
          missing.

  [URL]
          The URL to the dependency zip file.
          
          If not present, the package will be installed from the Soldeer
          repository.
          
          Example: https://my-domain/dep.zip

Options:
      --rev <REV>
          A Git commit hash

      --tag <TAG>
          A Git tag

      --branch <BRANCH>
          A Git branch

  -g, --regenerate-remappings
          If set, this command will delete the existing remappings and re-create
          them

  -d, --recursive-deps
          If set, this command will install dependencies recursively (via git
          submodules or via soldeer)

      --clean
          Perform a clean install by re-installing all dependencies

  -h, --help
          Print help (see a summary with '-h')

For more information, read the README.md
```