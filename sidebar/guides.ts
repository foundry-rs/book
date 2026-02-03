import { Sidebar } from "vocs";

export const guidesSidebar: Sidebar = {
  "/guides": [
    {
      text: "Guides",
      items: [
        { text: "Overview", link: "/guides" },
      ],
    },
    {
      text: "Deployment",
      items: [
        { text: "Deploying Contracts", link: "/guides/deploying-contracts" },
        { text: "Deterministic Deployments (CREATE2)", link: "/guides/deterministic-deployments-using-create2" },
        { text: "Multi-Chain Deployments", link: "/guides/multi-chain-deployments" },
        { text: "Upgrading Contracts", link: "/guides/upgrading-contracts" },
      ],
    },
    {
      text: "Testing",
      items: [
        { text: "Fork Testing", link: "/guides/fork-testing" },
        { text: "Invariant Testing", link: "/guides/invariant-testing" },
      ],
    },
    {
      text: "Debugging & Optimization",
      items: [
        { text: "Debugging Transactions", link: "/guides/debugging-transactions" },
        { text: "Gas Optimization", link: "/guides/gas-optimization" },
        { text: "Stack Too Deep", link: "/guides/stack-too-deep" },
      ],
    },
    {
      text: "Environment",
      items: [
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
