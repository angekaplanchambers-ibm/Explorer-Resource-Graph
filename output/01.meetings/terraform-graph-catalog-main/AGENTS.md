# terraform-graph-catalog — Agent Notes

## Running this locally: use the container, never a host process

When asked to "run", "restart", or "look at" the catalog / its dev UI, **rebuild the
Docker image and recreate the container.** Do **not** run `bin/terraform-graph-catalog`
or `make run` as a standalone host process — those leak orphaned daemons on stray ports.

Tooling: **atlasdev only** (a thin env exporter that drives plain `docker compose`).
**Do not use tfcdev.**

## The container

| | |
| --- | --- |
| Dev UI | http://localhost:8088/dev/ |
| API | http://localhost:8088 |
| Container | `tfe_local_graph-catalog` (image `terraform-graph-catalog:local`) |
| Compose project | `tfe_local` (pinned via `name:` in `atlas/docker-compose-local.yml`) |
| Service def | `atlas/docker-compose.override.yml` (`graph-catalog` service) |
| Data store | its own `graph-catalog-postgres.tfe` + `graph-catalog-redis.tfe` containers (data persists across recreates) |
| Dev UI + LLM | `GRAPH_CATALOG_DEV_UI=true`; chat proxies to the host copilot API on `:4141` |

## Rebuild + recreate (after ANY Go or dev-UI change)

The dev UI assets (`internal/devui/static/**`) are compiled in via `go:embed`, so **any
JS/CSS/HTML edit requires a fresh image build** — editing files on disk does nothing to
the running container.

```sh
# 1. Build the image from current source (run from THIS repo root).
#    BuildKit + Go version derived from go.mod.
DOCKER_BUILDKIT=1 docker build \
  --build-arg GO_VERSION_FROM_GO_MOD="$(grep '^go ' go.mod | awk '{print $2}')" \
  -t terraform-graph-catalog:local .

# 2. Recreate ONLY this service (leaves its postgres/redis untouched).
cd "$ATLAS_DIR"
eval "$(atlasdev env --export)"   # sets COMPOSE_FILE + image tags; needs ATLAS_DIR + GITHUB_TOKEN
docker compose up -d --no-deps --force-recreate graph-catalog
```

Notes:
- `atlasdev env --export` is required so `docker compose` can parse the full stack (it
  supplies the other services' image tags). It hits Vault/doormat/GitHub, so it needs an
  authenticated session and can take a few seconds.
- `--no-deps` avoids restarting the catalog's Postgres/Redis.
- Run the `docker compose` step from `$ATLAS_DIR`; the `tfe_local` project name comes from
  the compose files, so do not pass `-p`.

## Verify

```sh
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8088/healthz          # 200
curl -s http://localhost:8088/dev/ | grep -o 'graph\.js\|cytoscape[^"]*'         # expect graph.js, no cytoscape
docker inspect tfe_local_graph-catalog --format '{{.Config.Image}} {{.Image}}'   # confirms the rebuilt image
```

## Don't

- Don't run a standalone `gc-devui` / `bin/terraform-graph-catalog` host process.
- Don't use tfcdev.
- Don't spin up an ad-hoc `python -m http.server` for the static assets — use the container.
