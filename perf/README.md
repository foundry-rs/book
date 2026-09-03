# Foundry performance site

This Vite app runs at `getfoundry.sh/perf/`. The browser reads only the
same-origin API. GitHub and ClickHouse credentials stay in Vercel Functions.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

## Deployment

The Vercel project root is `vocs/`. It builds the Book and this app into one
deployment. It serves this app from `/perf/` and exposes its API from
[`../api/`](../api/). Configure these
production environment variables in that Vercel project:

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

Once the credentialed backend is enabled, the Vercel cron invokes
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

Open `http://127.0.0.1:5173/?base=<base-sha>&head=<head-sha>`.

To preview the dashboard without ClickHouse or credentials, run the Vite server with
`PERF_DEMO_DATA=1`. This serves deterministic dummy runs from the local API bridge only.

Until the GitHub App and ClickHouse are configured, Vercel deploys the same
credential-free dummy API as an Edge function. It neither reads GitHub nor writes data.
To enable live on-demand imports later, replace the Edge handler in
`api/[...path].ts` with the Node adapter in `src/server/vercel.ts` and restore the cron;
the complete credentialed API and its tests are retained in this repository.

`scripts/ingest-github-runs.mjs` is the one-off local backfill tool. It uses the
authenticated `gh` CLI and the same ClickHouse schema. Do not run it from a pull
request workflow and do not give repository Actions ClickHouse credentials.
