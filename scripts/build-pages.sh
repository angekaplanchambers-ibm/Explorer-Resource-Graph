#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PAGES_DIR="$ROOT_DIR/.pages"
APP_DIR="$ROOT_DIR/explorer-resource-graph"

rm -rf "$PAGES_DIR"
mkdir -p "$PAGES_DIR"

npm --prefix "$APP_DIR" install
VITE_BASE_PATH="/Explorer-Resource-Graph/explorer-resource-graph/" npm --prefix "$APP_DIR" run build

mkdir -p "$PAGES_DIR/explorer-resource-graph"
cp -R "$APP_DIR/dist/." "$PAGES_DIR/explorer-resource-graph/"

mkdir -p "$PAGES_DIR/agentic-tfc-mock" "$PAGES_DIR/terraform-graph-catalog-mock"
cp "$ROOT_DIR/output/05.showcases/agentic-tfc-mock.html" "$PAGES_DIR/agentic-tfc-mock/index.html"
cp "$ROOT_DIR/output/05.showcases/terraform-graph-catalog-mock.html" "$PAGES_DIR/terraform-graph-catalog-mock/index.html"
