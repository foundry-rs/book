import { SidebarItem } from "vocs";

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
    { text: 'Reference', collapsed: true, items: [
        {
          text: 'General Commands',
          collapsed: true,
          link: '/forge/reference/general-commands',
          items: [
            { text: 'forge', link: '/forge/reference/overview' },
            { text: 'forge help', link: '/forge/reference/forge-help' },
            { text: 'forge completions', link: '/forge/reference/forge-completions' },
          ],
        },
        {
          text: 'Project Commands',
          collapsed: true,
          link: '/forge/reference/project-commands',
          items: [
            { text: 'forge init', link: '/forge/reference/forge-init' },
            { text: 'forge clone', link: '/forge/reference/forge-clone' },
            { text: 'forge install', link: '/forge/reference/forge-install' },
            { text: 'forge update', link: '/forge/reference/forge-update' },
            { text: 'forge remove', link: '/forge/reference/forge-remove' },
            { text: 'forge config', link: '/forge/reference/forge-config' },
            { text: 'forge remappings', link: '/forge/reference/forge-remappings' },
            { text: 'forge tree', link: '/forge/reference/forge-tree' },
            { text: 'forge geiger', link: '/forge/reference/forge-geiger' },
          ],
        },
        {
          text: 'Build Commands',
          collapsed: true,
          link: '/forge/reference/build-commands',
          items: [
            { text: 'forge build', link: '/forge/reference/forge-build' },
            { text: 'forge clean', link: '/forge/reference/forge-clean' },
            { text: 'forge inspect', link: '/forge/reference/forge-inspect' },
          ],
        },
        {
          text: 'Test Commands',
          link: '/forge/reference/test-commands',
          items: [
            { text: 'forge test', link: '/forge/reference/forge-test' },
            { text: 'forge snapshot', link: '/forge/reference/forge-snapshot' },
            { text: 'forge coverage', link: '/forge/reference/forge-coverage' },
          ],
        },
        {
          text: 'Deploy Commands',
          collapsed: true,
          link: '/forge/reference/deploy-commands',
          items: [
            { text: 'forge create', link: '/forge/reference/forge-create' },
            { text: 'forge verify-contract', link: '/forge/reference/forge-verify-contract' },
            { text: 'forge verify-check', link: '/forge/reference/forge-verify-check' },
            { text: 'forge flatten', link: '/forge/reference/forge-flatten' },
          ],
        },
        {
          text: 'Utility Commands',
          collapsed: true,
          link: '/forge/reference/utility-commands',
          items: [
            { text: 'forge bind', link: '/forge/reference/forge-bind' },
            { text: 'forge cache', link: '/forge/reference/forge-cache' },
            { text: 'forge cache clean', link: '/forge/reference/forge-cache-clean' },
            { text: 'forge cache ls', link: '/forge/reference/forge-cache-ls' },
            { text: 'forge script', link: '/forge/reference/forge-script' },
            { text: 'forge upload-selectors', link: '/forge/reference/forge-upload-selectors' },
            { text: 'forge doc', link: '/forge/reference/forge-doc' },
          ],
        },
      ]}
]
