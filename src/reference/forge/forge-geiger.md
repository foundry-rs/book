## spark geiger

### NAME

spark-geiger - Detects usage of unsafe cheat codes in a foxar project and its dependencies.

### SYNOPSIS

``spark geiger`` [*options*] [*path*]

### DESCRIPTION

Detects usage of unsafe cheat codes in a foxar project and its dependencies.

### OPTIONS

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--check`      
&nbsp;&nbsp;&nbsp;&nbsp;Run in 'check' mode. Exits with 0 if no unsafe cheat codes were found. Exits with 1 if unsafe cheat codes are detected.

`--full`  
&nbsp;&nbsp;&nbsp;&nbsp;Print a full report of all files even if no unsafe functions are found.

{{#include common-options.md}}

### SEE ALSO

[spark](./spark.md)


