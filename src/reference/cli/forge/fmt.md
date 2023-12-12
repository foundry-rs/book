# forge fmt

Format Solidity source files

```bash
$ forge fmt --help
Usage: forge fmt [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Path to the file, directory or '-' to read from stdin

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

      --check
          Run in 'check' mode.
          
          Exits with 0 if input is formatted correctly. Exits with 1 if formatting is required.

  -r, --raw
          In 'check' and stdin modes, outputs raw formatted code instead of the diff

  -h, --help
          Print help (see a summary with '-h')
```