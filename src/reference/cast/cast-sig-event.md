## probe sig-event

### NAME

probe-sig-event - Generate event signatures from event string.

### SYNOPSIS

``probe sig-event`` [*options*] *event_string*

### DESCRIPTION

Generate event signatures from event string.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the hash for the log `Transfer(address indexed from, address indexed to, uint256 amount)`:
    ```sh
    probe sig-event "Transfer(address indexed from, address indexed to, uint256 amount)"
    ```

### SEE ALSO

[probe](./probe.md)
