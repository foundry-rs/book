import { SidebarItem } from "vocs";

export const anvilCliReference: SidebarItem = {
    text: "Reference",
    collapsed: true,
    items: [
        { text: "anvil", link: "/anvil/reference" },
        {
            text: "General Commands",
            collapsed: true,
            items: [
                { text: "anvil completions", link: "/anvil/reference/completions" },
                { text: "anvil generate-fig-spec", link: "/anvil/reference/generate-fig-spec" },
            ],
        },
    ],
};
