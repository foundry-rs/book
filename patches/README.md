# Vocs build patch

Vocs 2.8.5 runs its `vocs:llms` build hook in all five Waku/RSC build
environments. Each pass reparses the entire book and writes the same `llms.txt`,
`llms-full.txt`, and per-page Markdown into `dist/public`.

The patch emits those public assets once, after the client bundle is written
(the bundler clears its output directory after `buildEnd`). It leaves the
development server, MDX compilation, link checks, search, and static page
generation unchanged. It also reuses per-file Git modification dates between MDX
compilation and sitemap generation within the production process. Development
lookups remain uncached so new commits are reflected without a restart.

Both the published JavaScript and TypeScript source are patched. Remove this
patch when upgrading to a Vocs release with the same fixes.

The browser smoke suite checks that the Markdown exports are served by the final
production build. When upgrading Vocs, also compare all Markdown exports against
an unpatched build to catch changes in its build/output lifecycle.
