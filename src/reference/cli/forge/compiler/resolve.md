# forge compiler resolve

Retrieves the resolved version(s) of the compiler within the project

```bash
$ forge compiler resolve --help
```

```txt
Usage: forge compiler resolve [OPTIONS]

Options:
  -r, --root <PATH>
          The root directory

  -s, --skip <REGEX>
          Skip files that match the given regex pattern

  -h, --help
          Print help (see a summary with '-h')

Display options:
  -v, --verbosity...
          Verbosity of the output.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Verbosity levels:
          - 0: Print compiler versions.
          - 1: Print compiler version and source paths.
          - 2: Print compiler version, source paths and max supported EVM
          version of the compiler.

  -j, --json
          Print as JSON
```