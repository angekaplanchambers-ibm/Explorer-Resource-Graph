// Copyright IBM Corp. 2026

// Package version carries build-time version information for the
// terraform-graph-catalog service.
package version

// GitCommit is the git commit that was compiled. This is filled in by the
// compiler via -ldflags.
var GitCommit string
