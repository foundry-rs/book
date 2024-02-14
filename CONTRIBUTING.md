## Contributing

We'd love your help! Thanks for caring about the book.

### The purpose of the book

The book is intended to serve both as a guide to getting started with Spark and Probe, as well as a quick reference for both of these tools.

The book is split into some major chapters:

- Getting Started, which is intended to walk people through installing Foxar
- Spark Guide, which is intended to be a complete-ish tour of Spark
- Probe Guide, which is similarly intended to be a tour of Probe
- Additional Guides, which is a collection of other various topics such as CI, shell autocompletions
- Reference, which is intended to contain complete reference sheets on Spark and Probe, as well as related tools

Within each chapter there are multiple sections and subsections.

For this particular book, it is OK to assume some familiarity with Solidity and general concepts from other smart contract toolchains, such as Hardhat and Truffle.

### Code of Conduct

The book follows the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct).

### Ways to contribute

#### Issues

If you think that some content is missing or out-of-date, feel free to open an issue. If you find multiple pieces of content lacking, please open up a separate issue for each.

The issues will then be labeled so other contributors can find chunks of work they are interested in more easily.

The issue should contain what is missing, or what could be improved, in as much detail as you deem necessary.

#### Pull requests

Feel free to contribute changes to the book by opening a pull request - anything is welcome, from reformulating a sentence, fixing a typo, to adding new sections or chapters.

When your pull request is open, other contributors will take a look and may request changes. Do not be discouraged!

### Getting recognition

If your pull request is merged, or your issue was addressed, feel free to ping @all-contributors to be added to the README. More information here: https://allcontributors.org/docs/en/bot/overview

### Writing style

This section documents a few standards for writing used throughout the book.

#### Chapters start with a second level heading

We use:

```md
## Some Page
```

We do not use:

```md
# Some Page
```

This is largely a stylistic choice.

#### Always use "we" and not "I"

Pretend like you are explaining Foxar to a friend!

#### Where possible, use auto-generated CLI output

As a small change in the Foxar CLIs can have a large impact on the book, most of the CLI output is auto-generated.

Each output file has three anchors you can use:

**Display the command *and* the output**

```handlebars
{{#include ../output/abc/xyz:all}}
```

**Display just the command**

```handlebars
{{#include ../output/abc/xyz:command}}
```

**Display just the output**

```handlebars
{{#include ../output/abc/xyz:output}}
```

You can learn more about auto-generated CLI output in the [output folder](./src/output).

#### Where possible, do NOT in-line Solidity code

In the same vein as the previous style guideline, opt to include source files, or parts of source files, from the [projects folder](./projects).

This allows us to quickly iterate and improve on our examples without having to change multiple pages.

You can learn more about including files in the [mdbook documentation](https://rust-lang.github.io/mdBook/format/mdbook.html).
