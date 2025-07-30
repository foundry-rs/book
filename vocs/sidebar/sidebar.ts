import { Sidebar } from "vocs";
import { zksyncSpecifics } from "./zksync-specifics";

export const sidebar: Sidebar = [
  {
    text: "Introduction",
    items: [
      { text: "Installation", link: "/introduction/installation" },
      { text: "Getting Started", link: "/zksync-specifics/overview" },
    ],
  },
  {
    text: "ZKSync Specifics",
    items: zksyncSpecifics,
  },
];
