## cast completions

### NAME

cast-completions - Generate shell completions script

### SYNOPSIS

``cast completions`` *shell*

### DESCRIPTION

Generates a shell completions script for the given shell.

Supported shells are:

- bash
- elvish
- fish
- powershell
- zsh

### EXAMPLES

1. Generate shell completions script for zsh:

       cast completions zsh > $HOME/.oh-my-zsh/completions/_cast

### SEE ALSO

[cast](./cast.md)
