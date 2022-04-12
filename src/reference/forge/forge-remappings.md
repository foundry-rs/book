## forge remappings

### NAME

forge-remappings - Get the automatically inferred remappings for the project.

### SYNOPSIS

``forge remappings`` [*options*]

### DESCRIPTION

Get the automatically inferred remappings for the project.

### OPTIONS

#### Project Options

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--lib-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to the library folder.

{{#include common-options.md}}

### EXAMPLES

1. Create a `remappings.txt` file from the inferred remappings:
    ```sh
    forge remappings > remappings.txt
    ```

### SEE ALSO

[forge](./forge.md)
