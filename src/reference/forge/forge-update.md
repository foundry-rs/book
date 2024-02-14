## spark update

### NAME

spark-update - Update one or more dependencies.

### SYNOPSIS

``spark update`` [*options*] [*dep*]

### DESCRIPTION

Update one or more dependencies.

The argument *dep* is a path to the dependency you want to update.
Spark will update to the latest version on the ref you specified for the dependency when you ran [`spark install`](./spark-install.md).

If no argument is provided, then all dependencies are updated.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Update a dependency:
    ```sh
    spark update lib/solmate
    ```

2. Update all dependencies:
    ```sh
    spark update
    ```

### SEE ALSO

[spark](./spark.md), [spark install](./spark-install.md), [spark remove](./spark-remove.md)
