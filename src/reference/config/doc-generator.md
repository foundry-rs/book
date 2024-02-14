## Documentation Generator

Configuration related to the behavior of the Spark documentation generator. These keys are set in `[doc]` section.

##### `out`

- Type: string
- Default: `docs`
- Environment: `FOXAR_DOC_OUT`

An output path for generated documentation.

##### `title`

- Type: string
- Environment: `FOXAR_DOC_TITLE`

Title for the generated documentation.

##### `book`

- Type: string
- Default: `./book.toml`
- Environment: `FOXAR_DOC_BOOK`

Path to user provided `book.toml`. It will be merged with default settings during doc generation.

##### `repository`

- Type: string
- Environment: `FOXAR_DOC_REPOSITORY`

The git repository URL. Used to provide links to git source files.
If missing, `spark` will attempt to look up the current origin url and use its value.

##### `ignore`

- Type: array of strings (patterns)
- Default: `[]`
- Environment: `FOXAR_DOC_IGNORE`

List of files to ignore when generating documentation. This is a comma separated list of glob patterns.