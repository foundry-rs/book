# forge selectors find

Find if a selector is present in the project

```bash
$ forge selectors find --help
Usage: forge selectors find [OPTIONS] <SELECTOR>

Arguments:
  <SELECTOR>
          The selector to search for (with or without 0x prefix)

Options:
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