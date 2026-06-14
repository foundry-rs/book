import { SidebarItem } from "vocs";

export const chiselCliReference: SidebarItem = {
    text: "Reference",
    collapsed: true,
    items: [
        { text: "chisel", link: "/reference/chisel/chisel" },
        {
            text: "Commands",
            collapsed: true,
            items: [
                { text: "chisel clear-cache", link: "/reference/chisel/clear-cache" },
                { text: "chisel eval", link: "/reference/chisel/eval" },
                { text: "chisel list", link: "/reference/chisel/list" },
                { text: "chisel load", link: "/reference/chisel/load" },
                { text: "chisel view", link: "/reference/chisel/view" },
            ],
        },
    ],
};
