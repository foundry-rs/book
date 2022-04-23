## forge update

### NAME

forge-update - Update one or more dependencies.

### SYNOPSIS

``forge update`` [*options*] [*dep*]

### DESCRIPTION

Update one or more dependencies.

The argument *dep* is a path to the dependency you want to update.
Forge will update to the latest version on the ref you specified for the dependency when you ran [`forge install`](./forge-install.md).

If no argument is provided, then all dependencies are updated.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Update a dependency:
    ```sh
    forge update lib/solmate
    ```

2. Update all dependencies:
    ```sh
    forge update
    ```

### SEE ALSO

[forge](./forge.md), [forge install](./forge-install.md), [forge remove](./forge-remove.md)
