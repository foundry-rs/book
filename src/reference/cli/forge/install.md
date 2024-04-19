# forge install

Install one or multiple dependencies.

```bash
$ forge install --help
Usage: forge install [OPTIONS] [DEPENDENCIES]...
    forge install [OPTIONS] <github username>/<github project>@<tag>...
    forge install [OPTIONS] <alias>=<github username>/<github project>@<tag>...
    forge install [OPTIONS] <https:// git url>...

Arguments:
  [DEPENDENCIES]...
          The dependencies to install.
          
          A dependency can be a raw URL, or the path to a GitHub repository.
          
          Additionally, a ref can be provided by adding @ to the dependency path.
          
          A ref can be: - A branch: master - A tag: v1.2.3 - A commit: 8e8128
          
          Target installation directory can be added via `<alias>=` suffix. The dependency will
          installed to `lib/<alias>`.

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

      --shallow
          Perform shallow clones instead of deep ones.
          
          Improves performance and reduces disk usage, but prevents switching branches or tags.

      --no-git
          Install without adding the dependency as a submodule

      --no-commit
          Do not create a commit

  -q, --quiet
          Do not print any messages

  -h, --help
          Print help (see a summary with '-h')
```