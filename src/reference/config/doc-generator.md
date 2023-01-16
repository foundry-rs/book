## Documentation Generator

Configuration related to the behavior of the Forge documentation generator. These keys are set in `[doc]` section.

##### `out`

- Type: string
- Default: `docs`
- Environment: `FOUNDRY_DOC_OUT`

An output path for generated documentation.

##### `title`

- Type: string
- Environment: `FOUNDRY_DOC_TITLE`

Title for the generated documentation.

##### `book`

- Type: string
- Default: `./book.toml`
- Environment: `FOUNDRY_DOC_BOOK`

Path to user provided `book.toml`. It will be merged with default settings during doc generation.

##### `repository`

- Type: string
- Environment: `FOUNDRY_DOC_REPOSITORY`

The git repository URL. Used to provide links to git source files.
If missing, `forge` will attempt to look up the current origin url and use its value. 