# Foundry performance site

This Vite app runs at `getfoundry.sh/perf/solar/`. The browser reads only the
same-origin API. GitHub and ClickHouse credentials stay in Vercel Functions.

TODO: Replace the temporary `/perf` and `/perf/` redirects in `vercel.json` with
a generic performance dashboard when more projects are available. Until then,
both URLs redirect to `/perf/solar/`, preserving comparison query parameters.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

## Deployment

### Snapshot read-model rollout

New installations use `db:schema`, which creates only `ingestion_jobs`,
`run_snapshots`, and `artifact_blobs`. `schema/clickhouse.sql` is retained only
as the historical legacy schema, not applied to new installations.

Before migrating an existing legacy installation, apply `schema/snapshots.sql`,
then execute `schema/backfill-snapshots.sql` with the database administrator.
The backfill is additive and restartable: it copies content-addressed bodies first
and only publishes snapshots whose bodies exist. Repeat after legacy writers drain.
Grant the website reader SELECT on `run_snapshots` and `artifact_blobs`; grant the
writer SELECT/INSERT on `run_snapshots` and INSERT on `artifact_blobs`.
Verify `arrayJoin(artifacts).content_sha256` from every snapshot exists in
`artifact_blobs`, and compare snapshot measurement/file counts with the legacy tables.
Schema creation alone is not a completed migration.
The two snapshot tables use one-row index granules because they are point-read
documents/blobs, not dense analytical fact rows. For existing tables, apply
`ALTER TABLE <table> MODIFY SETTING index_granularity=1, index_granularity_bytes=1048576`
and rewrite old parts with `OPTIMIZE TABLE <table> FINAL` during this small-data rollout.

Each immutable snapshot contains a run's measurements and manifest together.
Latest usable runs are selected by workflow ID, attempt, then publication time,
not by when an older workflow happened to be backfilled. Comparison-to-viewer links
pin snapshot revisions; artifact bodies are cached by content hash across runs.
`viewer.json` returns both selected runs' compiler catalogs and only the selected
benchmark's manifests in one query. `blobs/<sha256>.json` serves immutable bodies.
The dashboard index returns only its 12 displayed rows, the main-run total and
the preceding main commit for each row; commit prefixes resolve on the server.
Origin index/history misses coalesce for one second; immutable bodies have a bounded
8 MiB per-instance cache. These are optimizations, not distributed locks or durable storage.
Vercel logs emit `perf_api` events with route, status, API/database/SQL durations,
read rows/bytes and ClickHouse query IDs for percentile analysis. SQL reads have a
five-second execution limit and a ten-second transport timeout.
Formatted artifacts are retained in a bounded browser cache. Files larger than
512 Ki characters skip JSON formatting and interactive diffing, with a bounded
text preview and full-content downloads to keep navigation responsive.
Interactive diff computation uses patience line matching in a cancellable browser
worker with a five-second limit. Unlike unbounded Myers diffing, patience anchors
unique lines and replaces unmatched regions rather than searching for a minimal edit
sequence through repetitive assembly. It can produce coarser changes, but preserves
both files exactly. The library parses the resulting patch with three context lines
and retains both full files for context expansion. On timeout or worker failure,
both files remain downloadable with bounded previews; the failed content pair stays
failed for the page session, with no automatic retries on revisits or visibility changes.
Theme and split/unified changes reuse the computed diff. Syntax highlighting
uses the library's worker pool (one worker, retained across file/compiler switches);
intraline word decorations are enabled only when both sides together contain at most
2,000 lines, 200 changed lines, and 32,768 characters. Lines longer than 256 characters
skip word matching. Large diffs retain syntax colors and added/deleted line colors
without intraline decorations, whose Shiki processing becomes quadratic on generated
files. These are whole-diff limits: Pierre does not expose per-block decoration budgets.
Changing between decorated and undecorated diffs clears the library's highlighting
caches through `setRenderOptions`; the worker and our computed-diff cache are retained.
`@pierre/diffs` 1.4.1 includes the large-hunk stack-overflow fix upstream;
no dependency patch is needed. Its edit-session APIs are not used by this read-only viewer.
`FileDiff`/`File` use Pierre's `Virtualizer` with `setup(document)` through
`VirtualizerContext`: the browser page scrolls normally while only visible lines
are rendered. The file toolbar and side labels stick during scrolling. The file
tree can be collapsed or resized with a pointer or the separator's arrow keys;
its visibility and width reset on reload. Narrow screens stack the tree above the
diff and omit the resize handle. File cache keys
include a SHA-256 of the actual formatted text, path, and language, preventing
same-name artifacts from sharing highlighting. Completed diffs reuse the existing
bounded cache (16 MiB, one hour); cancelled computations are not retained.
DOM updates still run on the main thread. This follows the
[Diffs performance guidance](https://diffs.com/docs); workers keep the UI responsive,
but do not eliminate computation time. The separate computation worker is necessary
because `MultiFileDiff` calculates its Myers diff synchronously even with a highlighting pool.

Click a line number to highlight it; Shift-click or drag across the gutter to
select a range. Side-aware URL fragments (`#L12`, `#R12-R20`) preserve the
selection. Opening a link reveals its collapsed context and scrolls to the line
using Pierre's virtualized line positions. Changing the file, benchmark, or
compiler clears the selection. Line numbers refer to the displayed artifact
(including pretty-printed JSON).

Benchmark sources come from Solar's `source_links` result field (Solar PR #1449),
validated during import and stored once per benchmark in `run_snapshots.source_links`.
The existing run response includes these links; expanding a benchmark makes no
source request. The browser never fetches or parses Solar's Python catalog.
Historical results without source links are enriched by the importer from the
catalog at their exact Solar commit, without executing Python. The old archive
provenance map lives in `src/server/legacySources.ts`; new producer-supplied links
need no dashboard mapping changes. Failed catalog reads do not block metrics
publication and can be retried through the backend source backfill.

Before deploying this change, apply the additive `source_links` column from
`schema/snapshots.sql` using `pnpm run db:schema` with a schema-admin account.
The read account needs SELECT on this column; a table-level SELECT grant already
covers it. No new credentials are needed for the application itself.
Then run `pnpm run db:backfill-sources` with write credentials to enrich all existing
snapshots, including pinned revisions. It skips complete snapshots, preserves
their original revision and `published_at` (so latest-run selection cannot change),
and never downloads artifact bodies or modifies metrics/manifests. Failures stop
the CLI with the unresolved commits reported; rerunning resumes unfinished rows.
Alternatively, authenticated `POST /api/worker/backfill-sources` processes up to
10 snapshots per call using the deployed worker's credentials and `CRON_SECRET`.
Repeat until `scanned` is zero; resolve any `failed` commits before repeating.
This maintenance endpoint does not run automatically on the import cron.
Roll back by restoring the old deployment; the additive column can remain.

Legacy artifact URLs remain supported through snapshot manifests and content hashes.
Writers now populate only snapshots and blobs. Before retiring `runs`,
`benchmark_results`, and `artifact_files`, rerun the additive backfill, verify
measurement/manifest parity and that every referenced body exists, deploy the
snapshot-only workers, and drain old writers. Back up the legacy tables before
dropping them. A pre-snapshot deployment requires restoring those backups first.

Public object storage is not required for this stage: deduplicated bodies remain
in ClickHouse until the artifact-store access and environment scope are approved.

The Vercel project root is the Book repository root. It builds the Book, this app,
and its API into one deployment. The app is served at `/perf/solar/`, and
`scripts/build-vercel-api.mjs` adds the `/api/*` route and function to Vocs' Build
Output. Reads and imports deploy as separate Node.js 24 functions with five-minute
execution limits. Missing-run reads dispatch to the authenticated worker using
`VERCEL_URL` and `CRON_SECRET`, return HTTP 202 with `Retry-After: 1` immediately,
and the browser polls for at most 90 seconds while displaying “Importing benchmark
runs…”. Pending responses contain `status` (`queued`, `importing`, or `retry`),
`commit`, and a public-safe `message`; they are never cached. HTTP 503 is reserved
for unavailability. The client temporarily also accepts the old 503 + Retry-After
contract during rollout. A durable retry reports its actual backoff; if that exceeds
the browser's remaining budget, the UI displays the retry delay instead of falsely
claiming the run is unpublished. `waitUntil` retains the worker-dispatch request after
the read response. If deployment protection is enabled, configure
`VERCEL_AUTOMATION_BYPASS_SECRET` for same-deployment worker calls.
Dispatch deduplication/concurrency limits are per instance, not a distributed lock:
publication is idempotent and the cron remains the recovery path for main runs.
Imports use on-demand requests and the existing cron; no GitHub webhook or new secret is required.
Workers persist `importing` state in `ingestion_jobs` with a five-minute
expiry. Cron also recovers expired importing jobs (including on-demand PR imports),
as well as due retries. No schema alteration is required. These state
rows reduce duplicate work but are not atomic leases. Failed imports retain internal
details in `last_error`; public status responses deliberately omit those details.
A durable cross-instance queue is still required if imports need guaranteed
delivery independent of the function lifetime or browser retries.

`perf_import` log events report total duration and per-stage milliseconds for workflow
lookup, job/snapshot reads, GitHub metadata/artifact lookup, download headers, streamed
download plus extraction, normalization, blob preparation/writes, snapshot publication,
and job completion. Parallel stages overlap, so their sum is not wall time. The
streamed download/extraction stage intentionally includes both network and CPU work.
Compare these worker logs with `perf_api` and browser timings: time outside the API
timer is not automatically evidence of a cold start.

Run the deterministic pending/retry/missing-run browser checks with
`pnpm exec playwright test --config perf/playwright.config.ts` from the repository
root. They use a local demo server and intercepted responses, never production data.

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

Install the GitHub App only on `paradigmxyz/solar` with Actions, Contents, and Pull requests
read permission. `CLICKHOUSE_READ_*` may select the public tables and the status
columns below. Before deploying this version, grant status reads (substitute your
database/user names if different):

```sql
GRANT SELECT(workflow_run_id, commit, state, next_attempt_at, updated_at)
ON solar_perf.ingestion_jobs TO solar_perf_read;
```

This does not grant access to `last_error`. For rollback, first restore the previous
deployment, then revoke this same column grant if desired. `CLICKHOUSE_WRITE_*`
may select `run_snapshots` and `ingestion_jobs` for idempotency and
insert into the public tables and `ingestion_jobs`. Never expose either account
or the GitHub App private key to the browser.

In production, the Vercel cron invokes
`/api/worker/tick` every 15 minutes. The worker polls GitHub for successful
`main` benchmark runs and imports new artifacts. Solar only uploads its public
benchmark artifact; it has no performance-service secrets or callback step.

The importer stores retry state in ClickHouse. It retries transient GitHub
requests with backoff, keeps failed artifact imports in the queue, and never
runs code from an artifact. A missing run requested through the public data API
dispatches an authenticated background import in Vercel; the public request returns
202 and the client polls as described above. Set `INGEST_MAX_RUNS` to a value
from 1 through 20 to change the cron batch size; it defaults to 4.
Runs still in retry backoff are excluded before allocating that batch.

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
against `run_snapshots` and `artifact_blobs`. It does not verify GitHub, ingestion-job
status grants, or writer permissions.

On a preview, manually invoke `GET /api/worker/tick` with `Authorization: Bearer <CRON_SECRET>`
and check the returned `failed`, `imported`, and `scanned` counts. Vercel schedules cron
jobs only on production deployments. Check that `/api/data/index.json` contains real runs,
then compare two successful Solar benchmark commits at `/perf/solar/?base=<sha>&head=<sha>`.
The old `/perf/` URL redirects to `/perf/solar/`; API endpoints remain at `/api/`.
The dashboard shows one graph per benchmark, with a metric selector and name filter.
`/api/data/history.json?metric=total_gas` returns only the selected Solar metric for the
latest 60 main-branch runs, as a shared run axis and one value array per benchmark.
Opening an individual benchmark requests `&benchmark=<encoded name>`: one bounded database
query returns only that benchmark and metric, never other benchmarks or artifacts.
Values are never summed across benchmarks; failed or missing
measurements leave gaps. Click a graph point to compare it with the preceding commit.
The individual benchmark History section uses the same graph. Dashboard cards
without a latest measurement are hidden for the selected metric; individual benchmark
history still retains older measurements. The index contains metadata and benchmark
counts, not aggregate metrics. Compare inputs start
empty and accept full SHAs, unique published commit prefixes, branch/tag names, and PR numbers
without suggestions. Full SHAs need no lookup; `/api/resolve?ref=<ref>` resolves other refs
on submission using the GitHub App (Contents read for commits/branches/tags, Pull requests
read for PRs). Merged PRs resolve to the merge commit; open PRs resolve to their head.
Internal navigation and Back/Forward preserve the browser's data caches. Comparison metric
changes are reflected in the permalink.

Comparison rows without measurements for the selected metric are hidden. The table shows
the Solar Head value, followed by Base and the other compilers as percentage differences
relative to Head. Higher Base or other-compiler costs are green; lower costs are red.
Hovering Head or a delta reveals the exact raw value. Missing measurements and a nonzero
value against a zero Head have no defined percentage.
Byte sizes use `b`, `KiB`, `MiB`, etc. Compiler columns are discovered from the run data.

The artifact viewer has independent Left and Right selectors, each offering compilers
from both Base and Head. Defaults are Base Solar on the left and Head Solar on the right.
Selections are permalinked as `left=base:solar&right=head:solar`; older `compiler` and
`against` links remain supported. Files are discovered from the two selected sides.

Successful data responses explicitly enable the Vercel CDN cache using their HTTP cache
lifetimes. Errors, ref resolution, health checks, and worker responses are not
shared-cached. `Server-Timing` reports API duration, cumulative database duration, and query
count; database duration can exceed API duration for parallel queries. Check `x-vercel-cache`
and `age` as well: timing headers on a CDN hit describe the original cache fill, not a new query.

Successful browser reads are cached for 60 seconds (index/history), five minutes (runs),
or one hour (artifacts), with a 128-entry/32 MiB estimated-size limit per cache. Missing
artifacts and failed requests are retried, not retained. Content-addressed blob HTTP
responses cache for one year as immutable; legacy artifact URLs cache for one hour.
An uncached stored artifact uses one ClickHouse request. Compiler labels
come from the stored original results; Solar uses its run commit and missing versions
are explicitly marked unknown.
Concurrent comparison reads coalesce into `runs.json?commits=<sha>,<sha>` (one database
query for both runs, at most two full SHAs). Each result remains cached individually;
if only one side is missing, `run.json?artifacts=0` uses one database query. Missing
runs are dispatched concurrently and only missing commits are reread. The file viewer
uses `viewer.json` to fetch both runs' catalogs and the selected benchmark's manifests
in one query, then fetches the two selected bodies concurrently by content hash. It
skips sides absent from the manifest and reuses bodies shared across runs and compilers.
`artifacts.json` and the full `run.json` remain compatible legacy endpoints.

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

# Latency and schema rollout

For legacy installations only, apply `schema/clickhouse.sql`, then run `schema/backfill-labels.sql` against the same database
before deploying the normalized-label reader. After older worker invocations have drained,
rerun the idempotent backfill and verify that no labels remain empty; stop old workers that
share this database before final cutover. The backfill is additive and skips populated
labels. Original results remain available for reprocessing; normal comparison queries no
longer read them. Artifact sizes are populated at ingestion so manifests never scan text.

`Server-Timing` separates API wall time, cumulative database roundtrip time (`db`), and
ClickHouse execution time (`sql`, when the server returns its summary). Database roundtrips
include transfer/parsing and may overlap; their sum is not an extra sequential delay.
Reads request `wait_end_of_query=1` because the API already consumes complete responses;
this also buffers results on ClickHouse so the summary is final. SQL timing is omitted if
any query lacks a valid summary. Headers on CDN hits describe the original cache fill, not a new function invocation.
Mutable refs are resolved at submission and coalesced/cached at the origin for up to ten
seconds. Full commit hashes require no GitHub lookup.
