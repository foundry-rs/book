import { SidebarItem } from "vocs";

export const chiselCliReference: SidebarItem = {
    text: "Reference",
    collapsed: true,
    items: [
        { text: "chisel", link: "/chisel/reference/chisel" },
        {
            text: "Commands",
            collapsed: true,
            items: [
                { text: "chisel clear-cache", link: "/chisel/reference/clear-cache" },
                { text: "chisel eval", link: "/chisel/reference/eval" },
                { text: "chisel list", link: "/chisel/reference/list" },
                { text: "chisel load", link: "/chisel/reference/load" },
                { text: "chisel view", link: "/chisel/reference/view" },
            ],
        },
    ],
};
