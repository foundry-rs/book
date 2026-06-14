import { SidebarItem } from "vocs";

export const anvilCliReference: SidebarItem = {
    text: "Reference",
    collapsed: true,
    items: [
        { text: "anvil", link: "/reference/anvil/anvil" },
        {
            text: "General Commands",
            collapsed: true,
            items: [
                { text: "anvil completions", link: "/reference/anvil/completions" },
            ],
        },
    ],
};
