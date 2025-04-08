## forge update

### NAME

forge-update - Update one or more dependencies.

### SYNOPSIS

`forge update` [*options*] [*dep*]

### DESCRIPTION

Update one or more dependencies.

The argument _dep_ is a path to the dependency you want to update.
Forge will update to the latest version on the ref you specified for the dependency when you ran [`forge install`](./forge-install.md).

If no argument is provided, then all dependencies are updated.

### Lockfile

Post [foundry#9522](https://github.com/foundry-rs/foundry/pull/9522), every `install`, `update` or `remove` syncs the lockfile (`foundry.lock`) which has been introduced to ensure that git submodules stay pinned to the tag/revision that the user specified while installing the dependency.

Without the lockfile submodules pinned to a tag/revision get silently updated to the master/main branch of the dependency. See [foundry#7225](https://github.com/foundry-rs/foundry/issues/7225)

If you wish to update your dependencies tag/rev you can do so using:

```sh
# Update the tag of the dependency
forge update owner/dependency-name@new-tag
forge update owner/dependency-name@tag=some-tag

# Update the revision of the dependency
forge update owner/dependency-name@01234abc
forge update owner/dependency-name@rev=01234abc
```

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Update a dependency:

   ```sh
   forge update lib/solmate
   ```

2. Update all dependencies:

   ```sh
   # Note: Dependencies pinned to tags/revs in `foundry.lock` will not be updated.
   # They must be overwritten explicitly.
   forge update
   ```

3. Update the tag/rev of a dependency:

   ```sh
   # Update the tag of the dependency
   forge update owner/dependency-name@new-tag
   forge update owner/dependency-name@tag=some-tag

   # Update the revision of the dependency
   forge update owner/dependency-name@01234abc
   forge update owner/dependency-name@rev=01234abc
   ```

### SEE ALSO

[forge](./forge.md), [forge install](./forge-install.md), [forge remove](./forge-remove.md)
