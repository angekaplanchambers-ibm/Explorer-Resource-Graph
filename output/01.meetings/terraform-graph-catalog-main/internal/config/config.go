// Copyright IBM Corp. 2026

// Package config provides environment-based configuration for the
// terraform-graph-catalog service. Following the Janus pattern, all
// configuration is sourced from environment variables prefixed with
// GRAPH_CATALOG_, with sensible local-development defaults baked in.
package config

import (
	"os"
	"strconv"
	"strings"
)

// Config carries configuration details about the terraform-graph-catalog
// service.
type Config struct {
	// HTTPListenAddr is the listen address for the HTTP server.
	// Default "localhost:8088".
	HTTPListenAddr string

	// PostgresUser is the Postgres user. Default "postgres".
	PostgresUser string

	// PostgresPass is the Postgres password.
	PostgresPass string

	// PostgresAddr is the Postgres server address. Default "localhost:55438".
	PostgresAddr string

	// PostgresDB is the Postgres database name. Default "graph_catalog".
	PostgresDB string

	// PostgresSchema is the Postgres schema name. Default "public".
	PostgresSchema string

	// RedisUser is the Redis username. Default "".
	RedisUser string

	// RedisPass is the Redis password. Default "".
	RedisPass string

	// RedisAddr is the Redis server address. Default "localhost:56385".
	RedisAddr string

	// RedisDB is the Redis database number. Default 0.
	RedisDB int

	// RedisTLSEnabled enables TLS for the Redis connection. Default false.
	RedisTLSEnabled bool

	// IngestSecret is the shared secret known only to terraform-state-parser,
	// used to authenticate POST /ingest/state-version.
	IngestSecret string

	// ServiceSecret is the shared secret known to Atlas, used to authenticate
	// POST /ingest/plan and POST /api/v1/grants.
	ServiceSecret string

	// GrantDefaultTTLSeconds is the default grant lifetime. Default 900 (15m).
	GrantDefaultTTLSeconds int

	// GrantMaxTTLSeconds is the maximum grant lifetime. Default 3600 (1h).
	GrantMaxTTLSeconds int

	// DevUIEnabled enables the unauthenticated development UI under /dev/.
	// Never enable in production. Default false.
	DevUIEnabled bool

	// LLMAPIURL is the OpenAI-compatible chat completions endpoint used by the
	// development UI's LLM chat panel.
	LLMAPIURL string

	// LLMAPIKey is the bearer token for the LLM API.
	LLMAPIKey string

	// LLMModel is the model name passed to the LLM API. Default "gpt-4o".
	LLMModel string

	// LogLevel configures log verbosity (error, info, debug, trace).
	// Default "info".
	LogLevel string

	// DataDogTags are global tags applied to telemetry (reserved; unused in
	// the PoC blackhole sink).
	DataDogTags []string
}

// NewConfigFromEnv initializes a Config instance using environment variables.
func NewConfigFromEnv() *Config {
	redisDB, _ := strconv.Atoi(getEnv("GRAPH_CATALOG_REDIS_DB", "0"))
	redisTLSEnabled, _ := strconv.ParseBool(getEnv("GRAPH_CATALOG_REDIS_TLS_ENABLED", "false"))
	devUI, _ := strconv.ParseBool(getEnv("GRAPH_CATALOG_DEV_UI", "false"))
	defaultTTL, _ := strconv.Atoi(getEnv("GRAPH_CATALOG_GRANT_DEFAULT_TTL", "900"))
	maxTTL, _ := strconv.Atoi(getEnv("GRAPH_CATALOG_GRANT_MAX_TTL", "3600"))

	return &Config{
		HTTPListenAddr: getEnv("GRAPH_CATALOG_HTTP_LISTEN_ADDR", "localhost:8088"),

		PostgresAddr:   getEnv("GRAPH_CATALOG_PG_ADDR", "localhost:55438"),
		PostgresUser:   getEnv("GRAPH_CATALOG_PG_USER", "postgres"),
		PostgresPass:   getEnv("GRAPH_CATALOG_PG_PASS", "5E1F9A7C-2B4D-4E6F-9A1B-3C5D7E9F1A2B"),
		PostgresDB:     getEnv("GRAPH_CATALOG_PG_DB", "graph_catalog"),
		PostgresSchema: getEnv("GRAPH_CATALOG_PG_SCHEMA", "public"),

		RedisAddr:       getEnv("GRAPH_CATALOG_REDIS_ADDR", "localhost:56385"),
		RedisUser:       getEnv("GRAPH_CATALOG_REDIS_USER", ""),
		RedisPass:       getEnv("GRAPH_CATALOG_REDIS_PASS", ""),
		RedisDB:         redisDB,
		RedisTLSEnabled: redisTLSEnabled,

		IngestSecret:  getEnv("GRAPH_CATALOG_INGEST_SECRET", "dev-ingest-secret"),
		ServiceSecret: getEnv("GRAPH_CATALOG_SERVICE_SECRET", "dev-service-secret"),

		GrantDefaultTTLSeconds: defaultTTL,
		GrantMaxTTLSeconds:     maxTTL,

		DevUIEnabled: devUI,
		LLMAPIURL:    getEnv("GRAPH_CATALOG_LLM_API_URL", ""),
		LLMAPIKey:    getEnv("GRAPH_CATALOG_LLM_API_KEY", ""),
		LLMModel:     getEnv("GRAPH_CATALOG_LLM_MODEL", "gpt-4o"),

		LogLevel:    getEnv("GRAPH_CATALOG_LOG_LEVEL", "INFO"),
		DataDogTags: splitCSV(getEnv("GRAPH_CATALOG_DATADOG_TAGS", "")),
	}
}

// splitCSV splits a comma-separated string into a slice, returning nil for an
// empty input so callers never receive a one-element slice containing "".
func splitCSV(s string) []string {
	if s == "" {
		return nil
	}
	return strings.Split(s, ",")
}

// getEnv retrieves an environment variable or returns a default value.
func getEnv(key, defaultValue string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return defaultValue
}
