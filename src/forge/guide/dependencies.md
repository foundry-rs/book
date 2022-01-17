## Dependencies

Forge manages dependencies using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) by default, which means that it works with any GitHub repository that contains smart contracts.

### Adding a dependency

To add a dependency, run `forge install`:

```sh
$ forge install Rari-Capital/solmate
Installing solmate in "lib/solmate", (url: https://github.com/rari-capital/solmate, tag: None)
Cloning into 'lib/solmate'...
# Snip...
[master a492c5d] forge install: solmate
 2 files changed, 4 insertions(+)
 create mode 160000 lib/solmate
```

If we now check the `lib` folder:

```sh
$ tree lib -L 1
lib
├── ds-test
└── solmate

2 directories, 0 files
```

We can see that Forge installed `solmate`!

### Remapping dependencies

Forge can remap dependencies to make them easier to import. Forge will automatically try to deduce some remappings for you:

```sh
$ forge remappings
solmate/=lib/solmate/src/
weird-erc20/=lib/solmate/lib/weird-erc20/src/
ds-test/=lib/ds-test/src/
```

These remappings mean:

- To import from `solmate` we would write: `import "solmate/Contract.sol";`
- To import from `weird-erc20` we would write: `import "weird-erc20/Contract.sol";`
- To import from `ds-test` we would write: `import "ds-test/Contract.sol";`

You can customize these remappings by creating a `remappings.txt` file in the root of your project.

Let's create a remapping called `solmate-utils` that points to the `utils` folder in the solmate repository!

```
solmate-utils/=lib/solmate/src/utils/
```

Now we can import any of the contracts in `src/utils` of the solmate repository like so:

```javascript=
import "solmate-utils/Contract.sol";
```

### Hardhat compatibility

Forge also supports Hardhat-style projects where dependencies are npm packages (stored in `node_modules`) and contracts are stored in `contracts` as opposed to source.

To enable Hardhat compatability mode pass the `--hh` flag.
