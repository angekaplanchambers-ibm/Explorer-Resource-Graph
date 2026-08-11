#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PAGES_DIR="$ROOT_DIR/.pages"
APP_DIR="$ROOT_DIR/ERG"

rm -rf "$PAGES_DIR"
mkdir -p "$PAGES_DIR"

npm --prefix "$APP_DIR" install
VITE_BASE_PATH="/Explorer-Resource-Graph/" npm --prefix "$APP_DIR" run build

cp -R "$APP_DIR/dist/." "$PAGES_DIR/"
