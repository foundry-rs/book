# cast calldata-decode

Decode ABI-encoded input data.

```bash
$ cast calldata-decode --help
```

```txt
Usage: cast calldata-decode [OPTIONS] <SIG> <CALLDATA>

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  <CALLDATA>
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
  -j, --json
          Print the decoded calldata as JSON
```