# cast upload-signature

Upload the given signatures to https://openchain.xyz.

```bash
$ cast upload-signature --help
```

```txt
Usage: cast upload-signature [OPTIONS] [SIGNATURES]...

Arguments:
  [SIGNATURES]...
          The signatures to upload.
          
          Prefix with 'function', 'event', or 'error'. Defaults to function if
          no prefix given. Can also take paths to contract artifact JSON.

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
      --color <COLOR>
          Log messages coloring

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```