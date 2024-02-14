# spark remove

Remove one or multiple dependencies

```bash
$ spark remove --help
Usage: spark remove [OPTIONS] [DEPENDENCIES]...

Arguments:
  [DEPENDENCIES]...
          The dependencies you want to remove

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

  -f, --force
          Override the up-to-date check

  -h, --help
          Print help (see a summary with '-h')
```