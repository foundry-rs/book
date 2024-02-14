## probe completions

### NAME

probe-completions - Generate shell completions script

### SYNOPSIS

``probe completions`` *shell*

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
    probe completions zsh > $HOME/.oh-my-zsh/completions/_probe
    ```

### SEE ALSO

[probe](./probe.md)
