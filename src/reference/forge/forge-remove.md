## spark remove

### NAME

spark-remove - Remove one or multiple dependencies.

### SYNOPSIS

``spark remove`` [*options*] [*deps...*]

### DESCRIPTION

Remove one or multiple dependencies.

Dependencies can be a raw URL (`https://foo.com/dep`), the path to a GitHub repository (`owner/repo`) or the path to the dependency in the project tree.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Remove a dependency by path:
    ```sh
    spark remove lib/solmate
    ```

2. Remove a dependency by GitHub repository name:
    ```sh
    spark remove dapphub/solmate
    ```

### SEE ALSO

[spark](./spark.md), [spark install](./spark-install.md), [spark update](./spark-update.md)
