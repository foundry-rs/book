import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { vocs } from "vocs/vite";

export default defineConfig({
  plugins: [react(), vocs()],
});
