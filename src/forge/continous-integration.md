## Continuous Integration

### GitHub Actions

To test your project using GitHub Actions, here is a sample workflow:

```yml
on: [push]

name: test

jobs:
  check:
    name: Foundry project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: recursive

      - name: Install Foundry
        uses: onbjerg/foundry-toolchain@v1
        with:
          version: nightly

      - name: Run tests
        run: forge test -vvv
```
