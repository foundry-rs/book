## forge doc

### NAME

forge-doc - Generate documentation for Solidity source files.

### SYNOPSIS

``forge doc`` [*options*]

### DESCRIPTION

Generates and builds an mdbook from Solidity source files.

### OPTIONS

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--out` *path*
&nbsp;&nbsp;&nbsp;&nbsp;The output path for the generated mdbook. By default, it is the `docs/` in project root.

`--build`
&nbsp;&nbsp;&nbsp;&nbsp;Build the `mdbook` from generated files.

`--serve`
&nbsp;&nbsp;&nbsp;&nbsp;Serve the documentation locally.

`--hostname` *hostname*
&nbsp;&nbsp;&nbsp;&nbsp;Hostname for serving documentation. Requires `--serve`.

`--port` *port*
&nbsp;&nbsp;&nbsp;&nbsp;Port for serving documentation. Requires `--serve`.

{{#include common-options.md}}

### EXAMPLES

1. Generate documentation.
    ```sh
    forge doc
    ```
2. Generate and build documentation with specified output directory.
    ```sh
    forge doc --build --out ./documentation
    ```
3. Generate and serve documentation locally on port 4000.
    ```sh
    forge doc --serve --port 4000
    ```

### SEE ALSO

[Doc config](../config/doc-generator.md)
