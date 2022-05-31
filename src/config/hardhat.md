## Integrating with Hardhat

It's possible to have your Foundry project work alongside [Hardhat](https://hardhat.org/). This assume that you have a working Foundry project and want to add Hardhat. It also assumes familiarity with Hardhat.

### Why does this not work out of the box?

Hardhat by default expects libraries to be installed in `node_modules`, the default folder for all NodeJS dependencies. Foundry expects them to be in `lib`. Of course [we can configure Foundry](../reference/config.md) but not easily to the directory structure of `node_modules`.

For this reason, the recommended setup is to use [hardhat-preprocessor](https://www.npmjs.com/package/hardhat-preprocessor). Hardhat-preprocessor is, as the name suggests, a Hardhat plugin which allows us to preprocess our contracts before they are run through the Solidity compiler.

We use this to modify the import directives in our Solidity files to resolve absolute paths to the libraries based on the Foundry `remappings.txt` file before Hardhat attempts to compile them. This of course just happens in memory so your actual Solidity files are never changed. Now, Hardhat is happy to comply and compiles using the libraries you installed with Foundry.

### Just show me the example repo!

[Enjoy!](https://github.com/foundry-rs/hardhat-foundry-template)

If you want to adapt this to a Foundry project you already have or learn how it works, read below:

### Instructions

Inside your Foundry project working directory:

1. `npm init` - Setup your project details as usual.
2. `npm install --save-dev hardhat` - Install Hardhat.
3. `npx hardhat` - Setup your Hardhat project as you see fit in the same directory.
4. `forge remappings > remappings.txt` - You will need to re-run this everytime you modify libraries in Foundry.

Now you need to make the following changes to your Hardhat project. The following assumes a TypeScript setup:

1. `npm install --save-dev hardhat-preprocessor` - [Details on hardhat-preprocessor](https://www.npmjs.com/package/hardhat-preprocessor)
2. Add `import "hardhat-preprocessor";` to your `hardhat.config.ts` file.
3. Ensure the following function is present (you can add it to your `hardhat.config.ts` file or somewhere else and import it):

```typescript
function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean) // remove empty lines
    .map((line) => line.trim().split("="));
}
```

*Thanks to [@DrakeEvansV1](https://twitter.com/drakeevansv1) for this snippet*

4. Add the following to your exported `HardhatUserConfig` object:

```typescript
...
preprocess: {
  eachLine: (hre) => ({
    transform: (line: string) => {
      if (line.match(/^\s*import /i)) {
        getRemappings().forEach(([find, replace]) => {
          if (line.match('"' + find)) {
            line = line.replace('"' + find, '"' + replace);
          }
        });
      }
      return line;
    },
  }),
},
paths: {
  sources: "./src",
  cache: "./cache_hardhat",
},
...
```

Now, Hardhat should work well with Foundry. You can run Foundry tests or Hardhat tests / scripts and have access to your contracts.
