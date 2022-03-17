## Contributing

We'd love your help! Thanks for caring about the book.

### The purpose of the book

The book is intended to serve both as a guide to getting started with Forge and Cast, as well as a quick reference for both of these tools.

The book is split into some major chapters:

- Getting Started, which is intended to walk people through installing Foundry
- Forge Guide, which is intended to be a complete-ish tour of Forge
- Cast Guide, which is similarly intended to be a tour of Cast
- Additional Guides, which is a collection of other various topics such as CI, shell autocompletions
- Reference, which is intended to contain complete reference sheets on Forge and Cast, as well as related tools

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

See [Writing Style](#writing-style) (below).

### Getting recognition

If your pull request is merged, or your issue was addressed, feel free to ping @all-contributors to be added to the README. More information here: https://allcontributors.org/docs/en/bot/overview

### Writing Style
This section documents a few standards for writing used throughout the book.

- Use relative links instead of absolute links:

```text
.
├── current-dir
│   └── you-are-here.md
└── target-dir
    └── target-file.md

... link like [this](../target-dir/target-file.md)
...  not like [this](/target-dir/target-file.md)
```
- Provide console output along with commands, in this format:

```bash
$ command --goes "here"
Output goes here
```

- Use level 2 heading for section titles. Use a heading whenever a subject should be linkable:

```text
## Section title
...
### Subject
...
#### Example
...
```

- Feel free to use callouts where appropriate:

```text
> ℹ️ **Information**
>
> Provide additional information. Useful when many things share the same property but you don't want to document it for every one of them, so you mention it at the end.
```

```
> 💬 **Note**
>
> Add a author's note. Sometimes you may want to add a comment in a tone different than the one in the book, to explain or add context as an author.
```

```
> 📚 **Reference**
>
> When a section teaches a subject that also has [reference docs](../reference/subject.md), use this callout at the bottom of the page.
```
```
> 💡 **Tip**
>
> When it is perfect time to inform a reader about something, but it's only loosely related to the section, use this callout at the bottom of the page.
```

- Add new sections (files) to [`SUMMARY.md`](src/SUMMARY.md) and to the corresponding local summary:
  - Forge Guide [`README.md`](src/forge/README.md)
  - Cast Guide [`README.md`](src/cast/README.md)
  - Additional Guides [`README.md`](src/guides/README.md)
  - Reference [`README.md`](src/reference/README.md)