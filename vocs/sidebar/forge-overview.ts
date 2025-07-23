import { SidebarItem } from "vocs";
import { forgeCliReference } from "./forge-cli-reference";

export const forgeOverview: SidebarItem[] = [
    {
        text: 'Overview',
        link: '/forge/overview',
    },
    {
        text: 'Tests',
        collapsed: false,
        items: [
            { text: 'Overview', link: '/forge/tests/overview' },
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
        collapsed: true,
        items: [
            { text: 'Overview', link: '/forge/advanced-testing/overview' },
            { text: 'Table Testing', link: '/forge/advanced-testing/table-testing' },
            { text: 'Fuzz Testing', link: '/forge/advanced-testing/fuzz-testing' },
            { text: 'Invariant Testing', link: '/forge/advanced-testing/invariant-testing' },
            { text: 'Differential Testing', link: '/forge/advanced-testing/differential-ffi-testing' }
        ]
    },
    { text: 'Deploying and Verifying', link: '/forge/deploying' },
    {
        text: 'Gas Tracking',
        collapsed: true,
        items: [
            { text: 'Overview', link: '/forge/gas-tracking/overview' },
            { text: 'Gas Reports', link: '/forge/gas-tracking/gas-reports' },
            { text: 'Gas Function Snapshots', link: '/forge/gas-tracking/gas-function-snapshots' },
            { text: 'Gas Section Snapshots', link: '/forge/gas-tracking/gas-section-snapshots' }
        ]
    },
    { text: 'Debugger', link: '/forge/debugger' },
    forgeCliReference,
]
