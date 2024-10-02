# forge doc

Generate documentation for the project

```bash
$ forge doc --help
Usage: forge doc [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

  -o, --out <PATH>
          The doc's output path.
          
          By default, it is the `docs/` in project root.

  -b, --build
          Build the `mdbook` from generated files

  -s, --serve
          Serve the documentation

      --open
          Open the documentation in a browser after serving

      --hostname <HOSTNAME>
          Hostname for serving documentation

  -p, --port <PORT>
          Port for serving documentation

      --deployments [<DEPLOYMENTS>]
          The relative path to the `hardhat-deploy` or `forge-deploy` artifact directory. Leave
          blank for default

  -i, --include-libraries
          Whether to create docs for external libraries

  -h, --help
          Print help (see a summary with '-h')
```