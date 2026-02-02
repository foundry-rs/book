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

### Getting recognition

If your pull request is merged, or your issue was addressed, feel free to ping @all-contributors to be added to the README. More information here: https://allcontributors.org/docs/en/bot/overview

### Writing Style Guide

This section documents the standards for writing used throughout the book.

---

#### Voice and Tone

- **Use second person ("you")** – Address the reader directly
  - ✅ "You can run this command..."
  - ❌ "We can run this command..." / "Let's run this command..."
- Write in a clear, direct, and professional tone
- Assume familiarity with Solidity and smart contract concepts

---

#### Page Types

The book uses three primary page structures:

##### Hub Pages
Introductory pages that orient readers and link to related content.

Structure:
1. Brief introduction (≤3 paragraphs)
2. Card grid or link list to child pages
3. Optional "Next steps" section

##### Guide Pages
Step-by-step tutorials that walk readers through a task.

Structure:
1. **Introduction** – What you'll accomplish
2. **Prerequisites** – Required tools, knowledge, or setup
3. **Steps** – Numbered instructions (use H4 for each step)
4. **Verify** – How to confirm success
5. **Next steps** – Related guides or reference material

##### Reference Pages
Technical documentation for commands, APIs, or configuration.

Structure:
1. **Summary** – One-sentence description
2. **Usage** – Command syntax or API signature
3. **Options/Parameters** – Table or definition list
4. **Examples** – Practical usage examples

---

#### Heading Hierarchy

- **H2 (`##`)** – Page title (every page starts with H2, not H1)
- **H3 (`###`)** – Major sections
- **H4 (`####`)** – Subsections

```md
## Page Title

### Section

#### Subsection
```

---

#### Content Guidelines

- **Introductions** – Keep to ≤3 paragraphs; get to the point quickly
- **Prefer bullet points** – Use lists over long paragraphs when presenting multiple items
- **Be concise** – Avoid unnecessary words and filler phrases

---

#### Code Blocks

Always specify the language for syntax highlighting:

````md
```solidity
contract Example {}
```
````

For terminal commands, prefix each command with `$ `:

````md
```bash
$ forge build
```
````

---

#### Auto-Generated CLI Output

Most CLI output is auto-generated to stay in sync with Foundry changes.

Each output file has three anchors:

**Display the command _and_ the output:**
```handlebars
// [!include ~/snippets/output/abc/xyz:all]
```

**Display just the command:**
```handlebars
// [!include ~/snippets/output/abc/xyz:command]
```

**Display just the output:**
```handlebars
// [!include ~/snippets/output/abc/xyz:output]
```

Learn more in the [output folder](./vocs/docs/snippets/output).

---

#### Source Code Snippets

Do **not** inline Solidity code. Instead, include source files from the [projects folder](./vocs/docs/snippets/projects):

```md
// [!include ~/snippets/projects/hello_foundry/src/Counter.sol]
```

This allows examples to be updated in one place and stay consistent across pages.

Learn more about including snippets in the [Vocs documentation](https://vocs.dev/docs/guides/code-snippets#physical-file-snippets).

---

#### Vocs Markdown Features

The documentation uses [Vocs](https://vocs.dev), which provides several useful markdown extensions.

##### Code Block Titles

Use titles instead of comments for single-action commands:

````md
```bash [Check an address balance]
$ cast balance vitalik.eth --ether
```
````

##### Inline Terminal Output

Use `// @log:` to show command output inline:

````md
```bash
$ forge test -vv
// @log: Ran 2 tests for test/Counter.t.sol:CounterTest
// @log: [PASS] test_Increment() (gas: 31293)
// @log: Suite result: ok. 2 passed; 0 failed; 0 skipped
```
````

##### Steps

Use `::::steps` for sequential instructions:

````md
::::steps

### Install foundryup

```bash
$ curl -L https://foundry.paradigm.xyz | bash
```

### Install Foundry

```bash
$ foundryup
```

::::
````

##### Callouts

Use callouts for warnings, tips, and notes:

````md
:::tip
Run any command with `--help` for detailed usage.
:::

:::warning
This will overwrite existing files.
:::

:::note
This feature requires Foundry v1.0 or later.
:::
````

##### Cards

Use `Cards` and `Card` components for navigation grids:

````mdx
import { Cards, Card } from 'vocs'

<Cards>
  <Card
    title="Forge"
    description="Build and test smart contracts."
    to="/forge/overview"
    icon="lucide:hammer"
  />
</Cards>
````

##### Code Groups

Use `:::code-group` for tabbed code examples. Code groups are ideal for:

- **Related commands** – Multiple ways to do the same thing (e.g., install options)
- **Good vs. bad examples** – Show preferred and discouraged patterns
- **Multi-file examples** – Related files that work together (e.g., test + harness)

````md
:::code-group

```bash [npm]
$ npm install
```

```bash [pnpm]
$ pnpm install
```

```bash [bun]
$ bun install
```

:::
````

For good/bad examples, use clear tab names:

````md
:::code-group

```solidity [Good]
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

```solidity [Avoid]
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

:::
````

For multi-file examples, use file paths as tab names:

````md
:::code-group

```solidity [test/harnesses/TokenHarness.sol]
contract TokenHarness is Token {
    function exposed_mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
```

```solidity [test/Token.t.sol]
contract TokenInternalTest is Test {
    function test_MintIncreasesSupply() public {
        token.exposed_mint(alice, 1000);
        assertEq(token.totalSupply(), 1000);
    }
}
```

:::
````

Learn more in the [Vocs Markdown Reference](https://vocs.dev/docs/markdown).
