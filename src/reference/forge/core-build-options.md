#### Cache Options

`--force`  
&nbsp;&nbsp;&nbsp;&nbsp;Clear the cache and artifacts folder and recompile.

#### Linker Options

`--libraries` *libraries*  
&nbsp;&nbsp;&nbsp;&nbsp;Set pre-linked libraries.

&nbsp;&nbsp;&nbsp;&nbsp;The parameter must be in the format `<file>:<library name>:<address>`, e.g. `src/Contract.sol:Library:0x...`.

{{#include compiler-options.md}}

{{#include project-options.md}}

`--config-path` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;Path to the config file.

`-o` *path*  
`--out` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's artifacts directory.
