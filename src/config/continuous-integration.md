## Continuous Integration

### GitHub Actions

To test your project using GitHub Actions, here is a sample workflow:

```yml
on: [push]

name: test

jobs:
  check:
    name: Foxar project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Install Foxar
        uses: foxar-rs/foxar-toolchain@v1
        with:
          version: nightly

      - name: Run tests
        run: spark test -vvv
```

### Travis CI

To test your project using Travis CI, here is a sample workflow:

```yml
language: rust
cache:
  cargo: true
  directories:
    - $HOME/.foxar

install:
  - curl -L https://foxar.paradigm.xyz | bash
  - export PATH=$PATH:$HOME/.foxar/bin
  - foxarup -b master

script:
  - spark test -vvv
```

## GitLab CI

To test your project using GitLab CI, here is a sample workflow:
Note: check out [Policy](https://docs.gitlab.com/runner/executors/docker.html#how-pull-policies-work) to fetch the remote image

```yml
variables:
  GIT_SUBMODULE_STRATEGY: recursive

jobs:
  image: ghcr.io/foxar-rs/foxar
  script:
    - spark install
    - spark test -vvv
```
