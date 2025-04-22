import { Sidebar } from "vocs";
import { forgeOverview } from "./forge-overview";

export const sidebar: Sidebar = [
    {
        text: 'Introduction',
        link: '/introduction',
        items: [
            { text: 'Installation', link: '/installation' },
            { text: 'Getting Started', link: '/first-steps' },
        ]
    },
    {
        text: 'Projects',
        link: '/projects',
        items: [
            { text: 'Creating a New Project', link: '/projects/creating-a-new-project' },
            { text: 'Clone a Verified Contract on Chain', link: '/projects/clone-a-verified-contract' },
            { text: 'Dependencies', link: '/projects/dependencies' },
            { text: 'Soldeer', link: '/projects/soldeer' },
            { text: 'Project Layout', link: '/projects/project-layout' }
        ]
    },
    {
        text: 'Forge Overview',
        link: '/forge/README',
        items: forgeOverview,
    },
    {
        text: 'Cast Overview',
        link: '/cast/README'
    },
    {
        text: 'Anvil Overview',
        link: '/anvil/README'
    },
    {
        text: 'Chisel Overview',
        link: '/chisel/README'
    },
    {
        text: 'Configuration',
        link: '/config/README',
        items: [
            { text: 'Configuring with foundry.toml', link: '/config/README' },
            { text: 'Continuous Integration', link: '/config/continuous-integration' },
            { text: 'Integrating with VSCode', link: '/config/vscode' },
            { text: 'Shell Autocompletion', link: '/config/shell-autocompletion' },
            { text: 'Static Analyzers', link: '/config/static-analyzers' },
            { text: 'Integrating with Hardhat', link: '/config/hardhat' },
            { text: 'Vyper support', link: '/config/vyper' }
        ]
    },
    {
        text: 'Guides',
        link: '/guides',
        items: [
            { text: 'Foundry v1.0 migration guide', link: '/guides/v1.0-migration' },
            { text: 'Best Practices', link: '/guides/best-practices' },
            { text: 'Scripting with Solidity', link: '/guides/scripting-with-solidity' },
            { text: 'Deterministic deployments using CREATE2', link: '/guides/deterministic-deployments-using-create2' },
            { text: 'Forking Mainnet with Cast and Anvil', link: '/guides/forking-mainnet-with-cast-anvil' },
            { text: 'Running Foundry inside of Docker', link: '/guides/foundry-in-docker' },
            { text: 'Video tutorials', link: '/guides/video-tutorials' }
        ]
    }
]

