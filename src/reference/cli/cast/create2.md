# cast create2

Generate a deterministic contract address using CREATE2

```bash
$ cast create2 --help
Usage: cast create2 [OPTIONS]

Options:
  -s, --starts-with <HEX>      Prefix for the contract address
  -e, --ends-with <HEX>        Suffix for the contract address
  -m, --matching <HEX>         Sequence that the address has to match
  -c, --case-sensitive         Case sensitive matching
  -d, --deployer <ADDRESS>     Address of the contract deployer [default:
                               0x4e59b44847b379578588920ca78fbf26c0b4956c]
      --salt <HEX>             Salt to be used for the contract deployment. This option separate
                               from the default salt mining with filters
  -i, --init-code <HEX>        Init code of the contract to be deployed
      --init-code-hash <HASH>  Init code hash of the contract to be deployed
  -j, --jobs <JOBS>            Number of threads to use. Defaults to and caps at the number of
                               logical cores
      --caller <ADDRESS>       Address of the caller. Used for the first 20 bytes of the salt
      --seed <HEX>             The random number generator's seed, used to initialize the salt
      --no-random              Don't initialize the salt with a random value, and instead use the
                               default value of 0
  -h, --help                   Print help
```