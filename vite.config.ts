import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";
import { vocs } from "vocs/vite";

export default defineConfig({
  plugins: lazyPlugins(async () => [...(await vocs()), react()]),
});
