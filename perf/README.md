# Foundry performance site

This Vite app runs at `getfoundry.sh/perf/solar/`. The browser reads only the
same-origin API. GitHub and ClickHouse credentials stay in Vercel Functions.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

## Deployment

The Vercel project root is the Book repository root. It builds the Book, this app,
and its API into one deployment. The app is served at `/perf/solar/`, and
`scripts/build-vercel-api.mjs` adds the `/api/*` route and function to Vocs' Build
Output. The API runs on Node.js 24 with a five-minute execution limit.
Configure these server-only variables in Production and in the Preview environment
used for testing (prefer branch-scoped preview credentials):

```text
CLICKHOUSE_HOST
CLICKHOUSE_DATABASE=solar_perf
CLICKHOUSE_READ_USER
CLICKHOUSE_READ_PASSWORD
CLICKHOUSE_WRITE_USER
CLICKHOUSE_WRITE_PASSWORD

GH_APP_ID
GH_APP_INSTALLATION_ID
GH_APP_PRIVATE_KEY
CRON_SECRET
```

Install the GitHub App only on `paradigmxyz/solar` with Actions and Pull requests
read permission. `CLICKHOUSE_READ_*` may only select the public tables;
`CLICKHOUSE_WRITE_*` may select `runs` and `ingestion_jobs` for idempotency and
insert into the public tables and `ingestion_jobs`. Never expose either account
or the GitHub App private key to the browser.

In production, the Vercel cron invokes
`/api/worker/tick` every 15 minutes. The worker polls GitHub for successful
`main` benchmark runs and imports new artifacts. Solar only uploads its public
benchmark artifact; it has no performance-service secrets or callback step.

The importer stores retry state in ClickHouse. It retries transient GitHub
requests with backoff, keeps failed artifact imports in the queue, and never
runs code from an artifact. A missing run requested through the public data API
is fetched synchronously once, which lets a PR benchmark permalink wait for its
own data without exposing GitHub credentials. Set `INGEST_MAX_RUNS` to a value
from 1 through 20 to change the cron batch size; it defaults to 4.

Use `GITHUB_TOKEN` only for local development. Production must use the GitHub
App credentials above.

## Local database and API

Docker Compose starts a local ClickHouse with the schema mounted as an init
script. It stores data in a named volume and only binds ports 8123 and 9000 on
localhost. The local default-user password is `local-dev`; it is only for this
Compose instance.

```bash
docker compose up -d --wait
cp .dev.vars.example .env.local
set -a && source .env.local && set +a
pnpm db:verify
node scripts/ingest-run.mjs \
  --results /path/to/solar/target/codegen-bench/results.json \
  --artifacts /path/to/solar/target/codegen-bench/artifacts \
  --commit <solar-sha> \
  --workflow-run 1
pnpm dev
```

Open `http://127.0.0.1:5173/perf/solar/?base=<base-sha>&head=<head-sha>`.

To preview the dashboard without ClickHouse or credentials, run the Vite server with
`PERF_DEMO_DATA=1`. The same explicit flag works in Vercel as a rollback: set it and
redeploy to serve synthetic runs and artifacts without database access or imports.
Remove the flag and redeploy to restore live data. Missing credentials never silently
enable demo mode.

## Deployment verification

Initialize the schema once with an administrative database account using `pnpm db:schema`;
the runtime reader and writer should not have schema-management permissions.
`GET /api/health` must return HTTP 200 with `source: "clickhouse"`; it verifies queries
against the three public tables. It does not verify GitHub or writer permissions.

On a preview, manually invoke `GET /api/worker/tick` with `Authorization: Bearer <CRON_SECRET>`
and check the returned `failed`, `imported`, and `scanned` counts. Vercel schedules cron
jobs only on production deployments. Check that `/api/data/index.json` contains real runs,
then compare two successful Solar benchmark commits at `/perf/solar/?base=<sha>&head=<sha>`.
The old `/perf/` URL redirects to `/perf/solar/`; API endpoints remain at `/api/`.
The dashboard shows one graph per benchmark, with a metric selector and name filter.
`/api/data/history.json` returns Solar measurements for the latest 60 main-branch runs
without artifact manifests. Values are never summed across benchmarks; failed or missing
measurements leave gaps. Click a graph point to compare it with the preceding commit.

Verify benchmark metrics, history, compiler artifact diffs, repeated cached reads, and
the docs root `/`. A missing run is imported on demand; an already stored run is read
without downloading its GitHub artifact again. Keep secrets out of URLs and screenshots.

`scripts/ingest-github-runs.mjs` is the one-off local backfill tool. It uses the
authenticated `gh` CLI and the same ClickHouse schema. Do not run it from a pull
request workflow and do not give repository Actions ClickHouse credentials.

## Producer contract

The GitHub artifact is named `codegen-runtime-results` and contains `results.json`
at its root (or inside one unambiguous wrapper directory). A separate baseline
results document must not replace the run's own results. Metrics accept either a
results array or `{ results: [...] }`, `test_id`/`id`/`name` identifiers, nested
`compilers` or legacy top-level `solar`/`solc` objects, and the existing snake-case
or camel-case metric aliases. New metric meanings still require an explicit schema
change; the UI does not guess units from arbitrary fields.

Optional files live beside the results at `artifacts/<test-id>/<compiler>/...`.
Both importers discover nested UTF-8 text files without a filename allowlist.
The viewer builds its directory and compiler selectors from the stored manifest,
shows files present on either side, and loads only the selected file. Unknown
extensions render as plain text; HTML is displayed as source, never executed.
Binary files are omitted. Paths, file counts, and compressed/uncompressed sizes
are bounded; the local importer rejects symlinks. No artifact content is executed.

Existing numeric artifact URLs remain readable; path-based hashes identify newly
discovered files independently of directory order. Existing imported runs are not
automatically refreshed: adding support for previously omitted files requires a
deliberate reimport while their GitHub archives are retained. Metrics-only runs
remain usable and display an explicit empty state in the artifact viewer.
