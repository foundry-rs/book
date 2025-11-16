import { SidebarItem } from "vocs";

export const anvilCliReference: SidebarItem = {
    text: "Reference",
    link: "/anvil/reference",
    collapsed: true,
    items: [
        { text: "anvil", link: "/anvil/reference/anvil" },
        {
            text: "General Commands",
            collapsed: true,
            items: [
                { text: "anvil completions", link: "/anvil/reference/completions" },
            ],
        },
    ],
};
