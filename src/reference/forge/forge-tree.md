## forge tree

### NAME

forge-tree - Display a tree visualization of the project's dependency graph.

### SYNOPSIS

``forge tree`` [*options*]

### DESCRIPTION

Display a visualization of the project's dependency graph.

```ignore
{{#include ../../output/forge_tree/forge-tree:all}}
```

### OPTIONS

#### Flatten Options

`--charset` *charset*  
&nbsp;&nbsp;&nbsp;&nbsp;Character set to use in output: utf8, ascii. Default: utf8

`--no-dedupe`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not de-duplicate (repeats all shared dependencies)

{{#include project-options.md}}

{{#include common-options.md}}

### SEE ALSO

[forge](./forge.md)
