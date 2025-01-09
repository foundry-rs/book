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
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: stable

      - name: Run tests
        run: forge test -vvv
```

### Travis CI

To test your project using Travis CI, here is a sample workflow:

```yml
language: rust
cache:
  cargo: true
  directories:
    - $HOME/.foundry

install:
  - curl -L https://foundry.paradigm.xyz | bash
  - export PATH=$PATH:$HOME/.foundry/bin
  - foundryup -b master

script:
  - forge test -vvv
```

## GitLab CI

To test your project using GitLab CI, here is a sample workflow:
Note: check out [Policy](https://docs.gitlab.com/runner/executors/docker.html#how-pull-policies-work) to fetch the remote image

```yml
variables:
  GIT_SUBMODULE_STRATEGY: recursive

jobs:
  image: ghcr.io/foundry-rs/foundry
  script:
    - forge install
    - forge test -vvv
```
