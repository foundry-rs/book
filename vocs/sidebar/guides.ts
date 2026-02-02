import { Sidebar } from "vocs";

export const guidesSidebar: Sidebar = {
  "/guides": [
    {
      text: "Guides",
      items: [
        { text: "Overview", link: "/guides" },
        { text: "Deploying Contracts", link: "/guides/deploying-contracts" },
        { text: "Fork Testing", link: "/guides/fork-testing" },
        { text: "Multi-Chain Deployments", link: "/guides/multi-chain-deployments" },
        { text: "Upgrading Contracts", link: "/guides/upgrading-contracts" },
        { text: "Debugging Transactions", link: "/guides/debugging-transactions" },
        { text: "Invariant Testing", link: "/guides/invariant-testing" },
        { text: "Gas Optimization", link: "/guides/gas-optimization" },
        { text: "Docker & Containers", link: "/guides/docker" },
      ],
    },
    {
      text: "Migrations",
      items: [
        { text: "Foundry v1.0", link: "/guides/migrations/foundry-v1" },
      ],
    },
  ],
};
