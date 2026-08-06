# terraform-graph-catalog

A standalone Go service that provides a queryable index of Terraform-managed
**resources, configuration, and provider metadata** across HCP Terraform
workspaces. It is optimized for cross-workspace queries, dependency traversal,
and LLM agent use cases.

The service is extracted from Atlas following the Janus pattern: it owns its own
PostgreSQL database, uses Redis for short-lived access grants, and is configured
entirely through environment variables.

> [!WARNING]
> **Status: proof of concept.** Nothing here is set in stone whatsoever. The name, the fact that
> it's a separate UI, the schema, the *everything* is subject to change. In fact, don't even call it
> 'graph catalog' in the roadmap slides. Is this Skyway? Explorer V2? Who knows. That's for PM and design
> to propose.

## Contents

- [Architecture](#architecture)
- [Data model](#data-model)
- [Configuration](#configuration)
- [Running locally](#running-locally)
- [HTTP API](#http-api)
- [Development UI](#development-ui)
- [LLM chat & GitHub Copilot authentication](#llm-chat--github-copilot-authentication)
- [Testing](#testing)
- [Project layout](#project-layout)

## Architecture

The catalog never authorizes queries by joining against Atlas permissions.
Instead, Atlas evaluates a caller's workspace access up front and exchanges it
for a short-lived **grant** scoped to a set of workspace IDs. This keeps access
control external and lets the catalog scale to a very large number of
workspaces.

```
  terraform-state-parser ──[ingest secret]──▶ POST /ingest/state-version ─┐
  (sanitized current state)                                               │
                                                                          ▼
  Atlas ────────────────────[service secret]─▶ POST /ingest/plan ───▶ ┌───────────────────────┐
  (plan config + edges)                                               │ terraform-graph-catalog│
                                                                      │                        │
  Atlas ────[service secret]─▶ POST /api/v1/grants ──(grant_id)──────▶│  Postgres: catalog data│
                                                                      │  Redis:    grant TTLs  │
  caller / LLM agent ─▶ GET /api/v1/grants/{grant_id}/... ───────────▶│                        │
                                                                      └───────────────────────┘
```

**Ingest paths**

- **State ingest** (`POST /ingest/state-version`): the `terraform-state-parser`,
  after a successful apply, posts the sanitized current state version (resource
  instances + root outputs). Authenticated with the **ingest secret**.
- **Plan ingest** (`POST /ingest/plan`): Atlas posts plan-derived configuration
  (resource configs, provider configs, and resolved cross-workspace edges).
  Authenticated with the **service secret**.

**Query path**

- Atlas evaluates the caller's workspace permissions, then calls
  `POST /api/v1/grants` (service secret) with the allowed workspace IDs and
  receives a `grant_id` with a TTL.
- The `grant_id` is carried in the query path. Grant validity is checked against
  **Redis** (the authoritative expiry signal); the workspace set is persisted in
  **Postgres** for query-time scoping. There is no join against Atlas
  permissions at query time.

## Data model

The schema is flat and workspace-scoped. **`org_id` / `project_id` are stored
for attribution and grouping only — never as access-control keys.** Sensitive
values are replaced with the literal string `"<sensitive>"` (keys preserved).

| Table | Purpose |
| --- | --- |
| `resource_instances` | One row per resource instance per current state version (from state ingest). Carries `attributes` (jsonb) and the full `dependencies` closure. |
| `resource_configs` | Resource-level configuration from plan JSON (shared across instances of an address). |
| `workspace_providers` | Provider configurations (including aliases) from plan JSON. |
| `workspace_edges` | Cross-workspace dependency edges (`consumer → producer`), resolved by Atlas from `terraform_remote_state` references. |
| `state_outputs` | Root outputs; `value` is `null` when the output is sensitive (whole-value sensitivity). |
| `access_grants` / `access_grant_workspaces` | Query grants and their workspace sets. |

Migrations live in `internal/database/migrations` and run automatically on
startup. See `0001_init.up.sql` for the authoritative column definitions and
indexes.

## Configuration

All configuration is sourced from environment variables prefixed with
`GRAPH_CATALOG_`, with local-development defaults baked in
(`internal/config/config.go`).

| Variable | Default | Description |
| --- | --- | --- |
| `GRAPH_CATALOG_HTTP_LISTEN_ADDR` | `localhost:8088` | HTTP listen address. Use `0.0.0.0:8088` when running in a container. |
| `GRAPH_CATALOG_PG_USER` | `postgres` | Postgres user. |
| `GRAPH_CATALOG_PG_PASS` | `5E1F9A7C-…-3C5D7E9F1A2B` | Postgres password (dev default matches `compose.yml`). |
| `GRAPH_CATALOG_PG_ADDR` | `localhost:55438` | Postgres address. |
| `GRAPH_CATALOG_PG_DB` | `graph_catalog` | Postgres database name. |
| `GRAPH_CATALOG_PG_SCHEMA` | `public` | Postgres schema. |
| `GRAPH_CATALOG_REDIS_USER` | `` | Redis username. |
| `GRAPH_CATALOG_REDIS_PASS` | `` | Redis password. |
| `GRAPH_CATALOG_REDIS_ADDR` | `localhost:56385` | Redis address. |
| `GRAPH_CATALOG_REDIS_DB` | `0` | Redis database number. |
| `GRAPH_CATALOG_REDIS_TLS_ENABLED` | `false` | Enable TLS for Redis. |
| `GRAPH_CATALOG_INGEST_SECRET` | `dev-ingest-secret` | Shared secret for `POST /ingest/state-version`. |
| `GRAPH_CATALOG_SERVICE_SECRET` | `dev-service-secret` | Shared secret for `POST /ingest/plan` and `POST /api/v1/grants`. |
| `GRAPH_CATALOG_GRANT_DEFAULT_TTL` | `900` | Default grant lifetime (seconds). |
| `GRAPH_CATALOG_GRANT_MAX_TTL` | `3600` | Maximum grant lifetime (seconds); requested TTLs are clamped to this. |
| `GRAPH_CATALOG_DEV_UI` | `false` | Enable the unauthenticated dev UI under `/dev/`. **Never enable in production.** |
| `GRAPH_CATALOG_LLM_API_URL` | `` | OpenAI-compatible chat-completions endpoint for the dev UI chat panel. |
| `GRAPH_CATALOG_LLM_API_KEY` | `` | Bearer token for the LLM API. |
| `GRAPH_CATALOG_LLM_MODEL` | `gpt-4o` | Model name passed to the LLM API. Must support tool/function calling. |
| `GRAPH_CATALOG_LOG_LEVEL` | `INFO` | Log verbosity (`error`, `info`, `debug`, `trace`). |
| `GRAPH_CATALOG_DATADOG_TAGS` | `` | Reserved; unused by the PoC telemetry sink. |

## Running locally

**1. Start dependencies.** `compose.yml` provides Postgres and Redis on the
default ports the service expects:

```sh
docker compose up -d
```

This starts Postgres on `localhost:55438` and Redis on `localhost:56385`.

**2. Build and run.** Migrations run automatically on startup.

```sh
make run            # builds bin/terraform-graph-catalog and runs it
```

The server listens on `localhost:8088` by default.

**3. (Optional) explore migrations.**

```sh
./bin/terraform-graph-catalog -migrate-status   # print migration status
./bin/terraform-graph-catalog -migrate-to 1     # migrate to a specific version
./bin/terraform-graph-catalog -version          # print the build's git commit
```

**4. (Optional) enable the dev UI.**

```sh
GRAPH_CATALOG_DEV_UI=true make run
# then open http://localhost:8088/dev/
```

### Make targets

| Target | Description |
| --- | --- |
| `make build` | Build `bin/terraform-graph-catalog`. |
| `make run` | Build and run. |
| `make test` | Run `go vet` then the test suite via `gotestsum`. |
| `make fmt` | `go fmt` the module. |
| `make vet` | `go vet` the module. |
| `make cover` | Run tests with coverage and open the HTML report. |
| `make deps` | `go mod download`. |
| `make clean` | Remove build artifacts. |
| `make new-migration MIGRATION_NAME=foo` | Scaffold a new up/down migration pair. |

> The `make seed` target is a placeholder and is not yet implemented (it
> references a `cmd/seed` package that does not exist).

## HTTP API

Responses are JSON. Collection endpoints share an envelope:

```json
{ "data": [ ... ], "next_cursor": "…or null on the last page", "count": 123 }
```

`count` is the exact total across all matches; `data` is one keyset page. Pass
the returned `next_cursor` back as the `cursor` query parameter to page forward.
`page_size` bounds a page.

### Authentication

| Surface | Mechanism |
| --- | --- |
| Ingest + grant creation | `Authorization: Bearer <shared secret>` (constant-time compared). |
| Query endpoints | A valid `grant_id` in the URL path; validity is checked in Redis. An invalid or expired grant returns `404`. |
| `GET /healthz` | Open. |

### Endpoints

| Method & path | Auth | Description |
| --- | --- | --- |
| `GET /healthz` | none | Pings Postgres and Redis. `200 {"status":"ok"}` or `503`. |
| `POST /ingest/state-version` | ingest secret | Replace a workspace's resource instances + outputs. Returns `{"ingested": N}`. |
| `POST /ingest/plan` | service secret | Replace a workspace's resource configs, providers, and edges (sensitive provider config is redacted on ingest). Returns `{"ingested": N}`. |
| `POST /api/v1/grants` | service secret | Create a grant. Body `{"workspace_ids": [...], "ttl_seconds": N}`. Returns `{"grant_id": "...", "expires_at": "..."}`. |
| `GET /api/v1/grants/{grant_id}/resources` | grant | List resource instances. Filters: `resource_type`, `org_id`, `project_id`, `attr[<key>]=<value>`, `page_size`, `cursor`. |
| `GET /api/v1/grants/{grant_id}/resources/{address}/dependents` | grant | Resources that depend on `address` (supply the address **without** an instance key). Each row is annotated with `dependency_reason`. |
| `GET /api/v1/grants/{grant_id}/providers` | grant | List provider configurations. Filters: `provider_source`, `version_constraint` (substring), `version_exact`, `page_size`, `cursor`. |
| `GET /api/v1/grants/{grant_id}/workspaces/{id}/blast-radius` | grant | Resources in workspaces that directly or transitively consume `{id}`'s outputs via `terraform_remote_state`, annotated with `hop_distance`. |

### Example

```sh
SECRET=dev-service-secret

# 1. Mint a grant over two workspaces.
GRANT=$(curl -s -X POST localhost:8088/api/v1/grants \
  -H "Authorization: Bearer $SECRET" \
  -d '{"workspace_ids":["ws-aaa","ws-bbb"],"ttl_seconds":600}' \
  | jq -r .grant_id)

# 2. List all aws_instance resources visible to that grant.
curl -s "localhost:8088/api/v1/grants/$GRANT/resources?resource_type=aws_instance" | jq

# 3. Filter on an attribute value.
curl -s "localhost:8088/api/v1/grants/$GRANT/resources?attr[instance_type]=m5.xlarge" | jq
```

## Development UI

Set `GRAPH_CATALOG_DEV_UI=true` to enable the single-page dev UI and its
supporting routes, served from embedded assets at `http://localhost:8088/dev/`.
These routes are **unauthenticated** and intended only for local exploration.

| Method & path | Description |
| --- | --- |
| `POST /dev/grants/all` | Mint a grant covering every workspace currently in the catalog. |
| `GET /dev/graph` | The whole-catalog workspace graph (nodes + cross-workspace edges). |
| `GET /dev/graph/workspace/{id}` | Every resource instance in one workspace (for the within-workspace DAG). |
| `POST /dev/chat` | LLM chat over the catalog (see below). |

## LLM chat & GitHub Copilot authentication

The dev UI includes a chat panel backed by `POST /dev/chat`. Given a dev grant
and a running conversation, the server runs an OpenAI-style **tool-calling loop**
(up to 6 iterations) against the catalog's query tools — `list_resources`,
`get_dependents`, `get_blast_radius`, and `list_providers` — all scoped to the
supplied grant, so the model can never read data outside that grant's
workspaces. It returns the model's final answer plus a transparency log of every
tool call:

```json
{ "reply": "…", "tool_calls": [ { "name": "list_resources", "arguments": {…}, "count": 42 } ] }
```

### What the LLM endpoint must look like

The chat feature talks to any **OpenAI-compatible chat-completions** endpoint
that supports **function/tool calling**. The client:

- `POST`s to **exactly** `GRAPH_CATALOG_LLM_API_URL` — the URL is used verbatim,
  no path is appended, so include the full `…/chat/completions` path.
- Sends only two headers: `Content-Type: application/json` and (when a key is
  set) `Authorization: Bearer <GRAPH_CATALOG_LLM_API_KEY>`.
- Sends `model` (`GRAPH_CATALOG_LLM_MODEL`, default `gpt-4o`), `messages`,
  `tools`, and `tool_choice: "auto"`.

If `GRAPH_CATALOG_LLM_API_URL` is unset, `POST /dev/chat` returns `503`. Pick a
tool-calling-capable model (a `gpt-4o`/`gpt-4.1`-class model works well).

### Backing it with GitHub Copilot

_I know, this section is now pointless with our imminent lack of Copilot access. --Chris_

Because the catalog speaks plain OpenAI chat-completions with a bearer token and
no provider-specific headers, the most reliable way to use a **GitHub Copilot**
subscription is to run a small local proxy that exposes Copilot as an
OpenAI-compatible API: [`copilot-api`](https://github.com/ericc-ch/copilot-api).

> **Caveat:** `copilot-api` is an unofficial, reverse-engineered proxy. It is
> not supported by GitHub and may break, and excessive automated use can trip
> GitHub's abuse-detection systems. Use it responsibly, and prefer a first-party
> option (below) where possible.

**1. Start the proxy** (first run triggers a GitHub device-flow login):

```sh
npx copilot-api@latest start
# business / enterprise Copilot plans:
npx copilot-api@latest start --account-type enterprise
```

It listens on `http://localhost:4141` and exposes `POST /v1/chat/completions`
and `GET /v1/models`.

**2. Point the catalog at the proxy:**

```sh
# When the catalog runs as a local binary on the same host:
export GRAPH_CATALOG_LLM_API_URL=http://localhost:4141/v1/chat/completions

# When the catalog runs in a container (e.g. the integrated Atlas stack),
# reach the proxy on the host via host.docker.internal:
export GRAPH_CATALOG_LLM_API_URL=http://host.docker.internal:4141/v1/chat/completions

# copilot-api injects the real Copilot token itself, so the key is not used for
# auth. Leave it unset, or set any dummy value:
export GRAPH_CATALOG_LLM_API_KEY=copilot

# Choose a tool-calling-capable Copilot model (list them: GET :4141/v1/models):
export GRAPH_CATALOG_LLM_MODEL=gpt-4o
```

`copilot-api` can also run in Docker (it ships a `Dockerfile` and supports a
`GH_TOKEN` build/runtime arg for non-interactive auth) — useful if you want the
proxy alongside the rest of the stack. See its README for details.

**3. Enable the dev UI**, open `http://localhost:8088/dev/`, and use the chat
panel.

### Alternative: GitHub Models (first-party, supported)

If your account has access to **GitHub Models**, it is a first-party,
OpenAI-compatible inference API authenticated with a GitHub personal access
token (scope `models:read`). Set `GRAPH_CATALOG_LLM_API_URL` to the GitHub
Models chat-completions endpoint, `GRAPH_CATALOG_LLM_API_KEY` to your PAT, and
`GRAPH_CATALOG_LLM_MODEL` to a tool-calling-capable model. Consult the current
GitHub Models documentation for the exact endpoint and model identifiers, as
they evolve.

### Other OpenAI-compatible backends

Any OpenAI-compatible endpoint works, as long as the model supports tool
calling — for example OpenAI itself
(`https://api.openai.com/v1/chat/completions` + an API key), Azure OpenAI, or a
local server such as Ollama (`http://localhost:11434/v1/chat/completions`),
LM Studio, or vLLM.

## Testing

```sh
make test     # go vet + gotestsum
make cover    # coverage report (HTML)
```

## Project layout

```
cmd/terraform-graph-catalog/   Entrypoint: flags, migrator, HTTP server lifecycle.
internal/config/               Environment-based configuration (GRAPH_CATALOG_*).
internal/database/             Postgres access: models, migrations, ingest, queries, grants.
internal/redisstore/           Redis-backed grant-validity store (TTL keys).
internal/http/                 HTTP server, handlers, shared-secret/grant auth, pagination, LLM chat.
internal/devui/                Embedded development-UI assets.
internal/telemetry/            Telemetry (no-op blackhole sink in the PoC).
internal/version/              Build version (git commit, injected via ldflags).
```
