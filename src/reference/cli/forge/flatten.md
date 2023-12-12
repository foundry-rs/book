# forge flatten

Flatten a source file and all of its imports into one file

```bash
$ forge flatten --help
Usage: forge flatten [OPTIONS] <PATH>

Arguments:
  <PATH>
          The path to the contract to flatten

Options:
  -o, --output <PATH>
          The path to output the flattened contract.
          
          If not specified, the flattened contract will be output to stdout.

  -h, --help
          Print help (see a summary with '-h')

Project options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

  -C, --contracts <PATH>
          The contracts source directory

  -R, --remappings <REMAPPINGS>
          The project's remappings

      --remappings-env <ENV>
          The project's remappings from the environment

      --cache-path <PATH>
          The path to the compiler cache

      --lib-paths <PATH>
          The path to the library folder

      --hardhat
          Use the Hardhat-style project layout.
          
          This is the same as using: `--contracts contracts --lib-paths node_modules`.
          
          [aliases: hh]

      --config-path <FILE>
          Path to the config file
```