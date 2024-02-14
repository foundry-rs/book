## spark clean

### NAME

spark-clean - Remove the build artifacts and cache directories.

### SYNOPSIS

``spark clean`` [*options*]

### DESCRIPTION

Remove the build artifacts and cache directories.

### OPTIONS

#### Clean Options

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. Defaults to the current working directory.

{{#include common-options.md}}

### EXAMPLES

1. Clean artifacts and cache in a project:
    ```sh
    spark clean
    ```

### SEE ALSO

[spark](./spark.md)
