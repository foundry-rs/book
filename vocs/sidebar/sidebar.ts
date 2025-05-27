import { Sidebar } from "vocs";
import { forgeOverview } from "./forge-overview";
import { cmdReference } from "./cmd-reference";

export const sidebar: Sidebar = [
    {
        text: 'Introduction',
        link: '/introduction',
        items: [
            { text: 'Installation', link: '/introduction/installation' },
            { text: 'Getting Started', link: '/introduction/getting-started' },
        ]
    },
    {
        text: 'Projects',
        link: '/projects',
        items: [
            { text: 'Creating a New Project', link: '/projects/creating-a-new-project' },
            { text: 'Clone a Verified Contract', link: '/projects/clone-a-verified-contract' },
            { text: 'Dependencies', link: '/projects/dependencies' },
            { text: 'Soldeer', link: '/projects/soldeer' },
            { text: 'Project Layout', link: '/projects/project-layout' }
        ]
    },
    {
        text: 'Forge',
        items: forgeOverview,
    },
    {
        text: 'Cast',
        items: [
            { text: 'Overview', link: '/cast/overview' },
        ]
    },
    {
        text: 'Anvil',
        items: [
            { text: 'Overview', link: '/anvil/overview' },
        ]
    },
    {
        text: 'Chisel',
        items: [
            { text: 'Overview', link: '/chisel/overview' },
        ]
    },
    {
        text: 'Configuration',
        collapsed: false,
        items: [
            { text: 'Overview', link: '/config/overview' },
            { text: 'Dynamic Test Linking', link: '/config/dynamic-test-linking'},
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
            
            { text: 'Best Practices', link: '/guides/best-practices' },
            { text: 'Scripting with Solidity', link: '/guides/scripting-with-solidity' },
            { text: 'Deterministic deployments using CREATE2', link: '/guides/deterministic-deployments-using-create2' },
            { text: 'Forking Mainnet with Cast and Anvil', link: '/guides/forking-mainnet-with-cast-anvil' },
            { text: 'Running Foundry inside of Docker', link: '/guides/foundry-in-docker' },
            { text: 'Video tutorials', link: '/guides/video-tutorials' }
        ]
    },
    {
        text: 'References',
        collapsed: false,
        items: cmdReference,
    },
    {
        text: 'Miscellaneous',
        items: [
            {
              text: 'Announcements', link: '/misc/announcements'
            },
            { text: 'v1.0 migration guide', link: '/misc/v1.0-migration' },
            {
              text: 'Struct Encoding', link: '/misc/struct-encoding' 
            },
            {
              text: 'FAQ', link: '/misc/faq',
            },
        ]
    }
]

