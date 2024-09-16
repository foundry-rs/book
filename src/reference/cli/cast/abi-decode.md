# cast abi-decode

Decode ABI-encoded input or output data.

```bash
$ cast abi-decode --help
```

```txt
Usage: cast abi-decode [OPTIONS] <SIG> <CALLDATA>

Arguments:
  <SIG>
          The function signature in the format `<name>(<in-types>)(<out-types>)`

  <CALLDATA>
          The ABI-encoded calldata

Options:
  -h, --help
          Print help (see a summary with '-h')

Decode input data instead of output data:
  -i, --input
          Whether to decode the input or output data

Display options:
  -j, --json
          Print the decoded calldata as JSON
```