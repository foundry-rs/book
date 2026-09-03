import react from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";
import { vocs } from "vocs/vite";

export default defineConfig({
  fmt: {
    ignorePatterns: [
      ".all-contributorsrc",
      "bun.lock",
      "src/data/**",
      "src/pages.gen.ts",
      "src/pages/benchmarks.mdx",
      "src/pages/reference/**",
      "src/snippets/output/**",
      "src/snippets/projects/**/cache/**",
      "src/snippets/projects/**/lib/**",
      "src/snippets/projects/**/out/**",
      "sidebar/*-reference.ts",
    ],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [vocs(), react()]),
});
