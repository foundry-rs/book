# forge soldeer push

Push a Dependency to the Repository

```bash
$ forge soldeer push --help
Usage: forge soldeer push [OPTIONS] <DEPENDENCY>~<VERSION> [PATH]

Arguments:
  <DEPENDENCY>~<VERSION>
          The dependency name and version, separated by a tilde.
          
          This should always be used when you want to push a dependency to the central repository:
          `<https://soldeer.xyz>`.

  [PATH]
          Use this if the dependency you want to push is not in the current directory.
          
          Example: `soldeer push mypkg~0.1.0 /path/to/dep`.

Options:
  -d, --dry-run
          Use this if you want to run a dry run. If set, this will generate a zip file that you can
          inspect to see what will be pushed

      --skip-warnings
          Use this if you want to skip the warnings that can be triggered when trying to push
          dotfiles like .env

  -h, --help
          Print help (see a summary with '-h')

For more information, read the README.md
```