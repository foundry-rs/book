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

### SEE ALSO

[forge](./forge.md)
