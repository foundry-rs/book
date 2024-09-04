# forge soldeer

Soldeer dependency manager

```bash
$ forge soldeer --help
Usage: forge soldeer install [DEPENDENCY]~[VERSION] <REMOTE_URL>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL> --rev <REVISION>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL> --rev <TAG>
    forge soldeer push [DEPENDENCY]~[VERSION] <CUSTOM_PATH_OF_FILES>
    forge soldeer login
    forge soldeer update
    forge soldeer version

Commands:
  install          Install a dependency from soldeer repository or from a custom url that points to a zip file or from git using a git link. 
                           IMPORTANT!! The `~` when specifying the dependency is very important to differentiate between the name and the version that needs to be installed.
                           Example from remote repository: soldeer install @openzeppelin-contracts~2.3.0 
                           Example custom url: soldeer install @openzeppelin-contracts~2.3.0 https://github.com/OpenZeppelin/openzeppelin-contracts/archive/refs/tags/v5.0.2.zip
                           Example git: soldeer install @openzeppelin-contracts~2.3.0 git@github.com:OpenZeppelin/openzeppelin-contracts.git
                           Example git with specified commit: soldeer install @openzeppelin-contracts~2.3.0 git@github.com:OpenZeppelin/openzeppelin-contracts.git --rev 05f218fb6617932e56bf5388c3b389c3028a7b73
  update           Update dependencies by reading the config file.
  login            Login into the central repository to push the dependencies.
  push             Push a dependency to the repository. The PATH_TO_DEPENDENCY is optional and if not provided, the current directory will be used.
                       Example: If the directory is /home/soldeer/my_project and you do not specify the PATH_TO_DEPENDENCY,
                       the files inside the /home/soldeer/my_project will be pushed to the repository.
                       If you specify the PATH_TO_DEPENDENCY, the files inside the specified directory will be pushed to the repository.
                       If you want to ignore certain files, you can create a .soldeerignore file in the root of the project and add the files you want to ignore.
                       The .soldeerignore works like .gitignore.
                       For dry-run please use the --dry-run argument set to true, `soldeer push ... --dry-run true`. This will create a zip file that you can inspect and see what it will be pushed to the central repository.
  version-dry-run  
  help             Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```