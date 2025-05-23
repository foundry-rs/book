## Integrating with Hardhat

It's possible to have your Foundry project work alongside [Hardhat](https://hardhat.org/). This article assumes that you have Foundry and node installed in your system. This article also assumes familiarity with both Foundry and Hardhat.

### Why does this not work out of the box?

Hardhat by default expects libraries to be installed in `node_modules`, the default folder for all NodeJS dependencies. Foundry expects them to be in `lib`. Of course [we can configure Foundry](/config/overview) but not easily to the directory structure of `node_modules`.

For this reason, the recommended setup is to use [hardhat-foundry](https://www.npmjs.com/package/@nomicfoundation/hardhat-foundry). When hardhat-foundry is installed and used correctly, Hardhat will use the same contracts directory that is used by Foundry, and it will be able to use dependencies installed with forge install.

In this article we will cover both scenarios:

1. Adding Hardhat to a Foundry project, and,
2. Adding Foundry to a Hardhat project.

### Just show me the example repo!

[Enjoy!](https://github.com/foundry-rs/HardhatInFoundry)

If you want to adapt this to a Foundry project you already have or learn how it works, read below:

### Adding Hardhat to a Foundry project

Inside your Foundry project working directory:

1. `npm init -y` - This will set up a `package.json` file.
2. `npm i --save-dev hardhat` - Install Hardhat as a dev dependency into your project.
3. `npx hardhat init` - Initialize your Hardhat project inside the same directory and choose the  "**Create an empty hardhat.config.js**" option. This will create a basic `hardhat.config.js` file.
4. `npm i --save-dev @nomicfoundation/hardhat-foundry @nomicfoundation/hardhat-toolbox` - This will install the hardhat-foundry plugin and the Hardhat toolbox plugin which is a combination of all the basic dependencies you need to run Hardhat tests.

Your hardhat.config.js file should look like this to make the plugins work:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};
```

5. By default, a Foundry project ships with a simple `Counter.sol` contract and a couple of tests. Create a file named `Counter.t.js` inside the `test` directory parallel to the default `Counter.t.sol` file.
6. Add the following code to the `Counter.t.js` file:

```javascript
const { expect } = require("chai");
const hre = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Counter contract", function () {
  async function CounterLockFixture() {
    const counter = await ethers.deployContract("Counter");
    await counter.setNumber(0);

    return { counter };
  }

  it("Should increment the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.increment();
    expect(await counter.number()).to.equal(1);
  });

  // This is not a fuzz test because Hardhat does not support fuzzing yet.
  it("Should set the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.setNumber(100);
    expect(await counter.number()).to.equal(100);
  });
});
```

This piece of code will execute the same tests as the default `Counter.t.sol` file.

And this is it!
You can create Hardhat and Foundry tests in the same `test` directory and run them with `npx hardhat test` and `forge test` respectively.
Check out [Hardhat's documentation](https://hardhat.org/docs) to learn more.

### Adding Foundry to a Hardhat project

Inside your Hardhat project working directory:

1. `npm i --save-dev @nomicfoundation/hardhat-foundry`- Install the hardhat-foundry plugin.
2. Add `require("@nomicfoundation/hardhat-foundry");` to the top of your `hardhat.config.js` file.

> ℹ️ **Note**
> Step number 3 will only work if your directory is an initialized git repository. Run `git init` if you haven't already.

3. Run `npx hardhat init-foundry` in your terminal. This will generate a `foundry.toml` file based on your Hardhat project's existing configuration, and will install the `forge-std` library.

Hardhat will now set up a basic Foundry project inside the same directory with a few configurations inside the `foundry.toml` file to make sure that Foundry knows where to look for your contracts, tests and dependencies. You can always change these configurations later by editing the `foundry.toml` file.