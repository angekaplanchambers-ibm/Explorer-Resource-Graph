// Copyright IBM Corp. 2026

// Package devui holds the static assets for the development UI, embedded into the
// binary so the service can serve a single-page app with no external build step.
// The UI is only ever mounted when GRAPH_CATALOG_DEV_UI is enabled.
package devui

import (
	"embed"
	"io/fs"
)

//go:embed static
var assets embed.FS

// FS returns the file system rooted at the static asset directory.
func FS() fs.FS {
	sub, err := fs.Sub(assets, "static")
	if err != nil {
		// The embed path is a compile-time constant, so this cannot fail in
		// practice; panic keeps the signature clean.
		panic(err)
	}
	return sub
}
