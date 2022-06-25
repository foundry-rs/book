## forge completions

### NAME

forge-completions - Generate shell completions script

### SYNOPSIS

``forge completions`` *shell*

### DESCRIPTION

Generates a shell completions script for the given shell.

Supported shells are:

- bash
- elvish
- fish
- powershell
- zsh

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Generate shell completions script for zsh:
    ```sh
    forge completions zsh > $HOME/.oh-my-zsh/completions/_forge
    ```
2. For docker, the procedure would be :
    ```sh
    # cd
    # apk add zsh
    # vi /etc/passwd
    # apk add git
    # apk add curl
    # sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    # cd .oh-my-zsh 
    # mkdir completions
    # cd
    # forge completions zsh > $HOME/.oh-my-zsh/completions/_forge
    ```
    And, after that, you can utilize `cat $HOME/.oh-my-zsh/completions/_forge` to confirm the result.

### SEE ALSO

[forge](./forge.md)
