## spark config

### NAME

spark-config - Display the current config.

### SYNOPSIS

``spark config`` [*options*]

### DESCRIPTION

Display the current config.

This command can be used to create a new basic `foxar.toml` or to see
what values are currently set, taking environment variables and the global
configuration file into account.

The command supports almost all flags of the other commands in Spark to allow
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
    spark config > foxar.toml
    ```

2. Enable FFI in `foxar.toml`:
    ```sh
    spark config --ffi > foxar.toml
    ```

### SEE ALSO

[spark](./spark.md)
