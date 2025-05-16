import { SidebarItem } from "vocs";

export const forgeOverview: SidebarItem[] = [
    {
        text: 'Overview',
        link: '/forge/overview',
    },
    {
        text: 'Tests',
        link: '/forge/tests',
        items: [
            { text: 'Writing Tests', link: '/forge/writing-tests' },
            { text: 'Cheatcodes', link: '/forge/cheatcodes' },
            { text: 'Forge Standard Library Overview', link: '/forge/forge-std' },
            { text: 'Understanding Traces', link: '/forge/traces' },
            { text: 'Fork Testing', link: '/forge/fork-testing' },
            { text: 'Replaying Failures', link: '/forge/replay-testing' }
        ]
    },
    {
        text: 'Advanced Testing',
        link: '/forge/advanced-testing',
        items: [
            { text: 'Fuzz Testing', link: '/forge/fuzz-testing' },
            { text: 'Invariant Testing', link: '/forge/invariant-testing' },
            { text: 'Differential Testing', link: '/forge/differential-ffi-testing' }
        ]
    },
    { text: 'Deploying and Verifying', link: '/forge/deploying' },
    {
        text: 'Gas Tracking',
        link: '/forge/gas-tracking',
        items: [
            { text: 'Gas Reports', link: '/forge/gas-reports' },
            { text: 'Gas Function Snapshots', link: '/forge/gas-function-snapshots' },
            { text: 'Gas Section Snapshots', link: '/forge/gas-section-snapshots' }
        ]
    },
    { text: 'Debugger', link: '/forge/debugger' }
]