# forge geiger

Detects usage of unsafe cheat codes in a project and its dependencies

```bash
$ forge geiger --help
```

```txt
Usage: forge geiger [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Paths to files or directories to detect

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --check
          Run in "check" mode.
          
          The exit code of the program will be the number of unsafe cheatcodes
          found.

      --ignore <PATH>...
          Globs to ignore

      --full
          Print a report of all files, even if no unsafe functions are found

  -h, --help
          Print help (see a summary with '-h')
```