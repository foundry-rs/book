## Integrating with Hardhat

It's possible to have your Foundry project work alongside Hardhat. This assume that you have a working Foundry project and want to add Hardhat. It also assumes familiarity with Hardhat.

Inside your Foundry project working directory:

1. `npm init` - Setup your project details as usual
2. `npm install --save-dev hardhat` - Install Hardhat
3. `npx hardhat` - Setup your Hardhat project as you see fit in the same directory
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
