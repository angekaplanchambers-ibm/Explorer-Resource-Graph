// Copyright IBM Corp. 2026

// Package telemetry is a thin bundle of logging and metrics facilities, mirroring
// the Janus telemetry pattern so that the two services share an operational shape.
//
// For the PoC, metrics use a blackhole sink and DataDog tracing wrappers are
// omitted. The struct shape is preserved so that a DogStatsd sink and the
// dd-trace-go wrappers can be dropped in later without changing call sites.
package telemetry

import (
	"terraform-graph-catalog/internal/config"

	"github.com/hashicorp/go-hclog"
	metrics "github.com/hashicorp/go-metrics"
)

// Telemetry is a container for telemetry clients.
type Telemetry struct {
	Logger  hclog.Logger
	Metrics *metrics.Metrics
	sink    metrics.MetricSink
	name    string
}

// New creates a new Telemetry instance from the given configuration and service
// name string.
func New(cfg *config.Config, name string) Telemetry {
	t := Telemetry{name: name}

	level := hclog.LevelFromString(cfg.LogLevel)
	if level == hclog.NoLevel {
		level = hclog.Info
	}

	t.Logger = hclog.New(&hclog.LoggerOptions{
		Name:       name,
		Level:      level,
		JSONFormat: false,
	})

	// For the PoC we use a blackhole sink. The sink is held so that Named()
	// can derive sub-scoped metrics, matching the Janus pattern.
	var sink metrics.MetricSink = &metrics.BlackholeSink{}
	mc := metrics.DefaultConfig(name)

	m, err := metrics.New(mc, sink)
	if err != nil {
		t.Logger.Warn("Failed starting metrics", "error", err)
		m = metrics.Default()
	}

	t.sink = sink
	t.Metrics = m

	return t
}

// Named further contextualizes the telemetry clients by appending the given name
// to the existing instance's name.
func (t Telemetry) Named(name string) Telemetry {
	mname := t.name + "." + name
	mc := metrics.DefaultConfig(mname)
	mc.EnableRuntimeMetrics = false
	m, _ := metrics.New(mc, t.sink)

	return Telemetry{
		Logger:  t.Logger.Named(name),
		Metrics: m,
		sink:    t.sink,
		name:    mname,
	}
}

// Stop shuts down all of the telemetry facilities.
func (t Telemetry) Stop() {
	t.Metrics.Shutdown()
}
