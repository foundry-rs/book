## forge config

### NAME

forge-config - Display the current config.

### SYNOPSIS

``forge config`` [*options*]

### DESCRIPTION

Display the current config.

This command can be used to create a new basic `foundry.toml` or to see
what values are currently set, taking environment variables and the global
configuration file into account.

The command supports almost all flags of the other commands in Forge to allow
overriding values in the displayed configuration.

### OPTIONS

#### Config Options

`--basic`  
&nbsp;&nbsp;&nbsp;&nbsp;Prints a basic configuration file.

`--fix`  
&nbsp;&nbsp;&nbsp;&nbsp;Attempts to fix any configuration warnings.

{{#include common-options.md}}

### EXAMPLES

1. Create a new basic config:
    ```sh
    forge config > foundry.toml
    ```

2. Enable FFI in `foundry.toml`:
    ```sh
    forge config --ffi > foundry.toml
    ```

### SEE ALSO

[forge](./forge.md)
