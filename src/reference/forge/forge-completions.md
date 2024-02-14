## spark completions

### NAME

spark-completions - Generate shell completions script

### SYNOPSIS

``spark completions`` *shell*

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
    spark completions zsh > $HOME/.oh-my-zsh/completions/_spark
    ```

### SEE ALSO

[spark](./spark.md)
