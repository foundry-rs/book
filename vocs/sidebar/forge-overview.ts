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
            { text: 'Writing Tests', link: '/forge/tests/writing-tests' },
            { text: 'Cheatcodes', link: '/forge/tests/cheatcodes' },
            { text: 'Forge Standard Library Overview', link: '/forge/tests/forge-std' },
            { text: 'Understanding Traces', link: '/forge/tests/traces' },
            { text: 'Fork Testing', link: '/forge/tests/fork-testing' },
            { text: 'Replaying Failures', link: '/forge/tests/replay-testing' }
        ]
    },
    {
        text: 'Advanced Testing',
        link: '/forge/advanced-testing',
        items: [
            { text: 'Fuzz Testing', link: '/forge/advanced-testing/fuzz-testing' },
            { text: 'Invariant Testing', link: '/forge/advanced-testing/invariant-testing' },
            { text: 'Differential Testing', link: '/forge/advanced-testing/differential-ffi-testing' }
        ]
    },
    { text: 'Deploying and Verifying', link: '/forge/deploying' },
    {
        text: 'Gas Tracking',
        link: '/forge/gas-tracking',
        items: [
            { text: 'Gas Reports', link: '/forge/gas-tracking/gas-reports' },
            { text: 'Gas Function Snapshots', link: '/forge/gas-tracking/gas-function-snapshots' },
            { text: 'Gas Section Snapshots', link: '/forge/gas-tracking/gas-section-snapshots' }
        ]
    },
    { text: 'Debugger', link: '/forge/debugger' }
]