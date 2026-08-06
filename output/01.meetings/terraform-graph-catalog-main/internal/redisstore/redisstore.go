// Copyright IBM Corp. 2026

// Package redisstore holds short-lived access-grant validity keys in Redis.
// Grant workspace sets live in Postgres (for query-time joins); Redis holds a
// per-grant key with a TTL that is the authoritative validity/expiry signal.
package redisstore

import (
	"context"
	"crypto/tls"
	"fmt"
	"time"

	"terraform-graph-catalog/internal/config"

	"github.com/redis/go-redis/v9"
)

// Store wraps a Redis client for grant validity checks.
type Store struct {
	client *redis.Client
}

// New constructs a Store and verifies connectivity.
func New(cfg *config.Config) (*Store, error) {
	opts := &redis.Options{
		Addr:     cfg.RedisAddr,
		Username: cfg.RedisUser,
		Password: cfg.RedisPass,
		DB:       cfg.RedisDB,
	}
	if cfg.RedisTLSEnabled {
		opts.TLSConfig = &tls.Config{}
	}

	client := redis.NewClient(opts)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed pinging redis: %w", err)
	}

	return &Store{client: client}, nil
}

func grantKey(grantID string) string {
	return "grant:" + grantID
}

// SetGrant records a grant as valid for the given TTL.
func (s *Store) SetGrant(ctx context.Context, grantID string, ttl time.Duration) error {
	return s.client.Set(ctx, grantKey(grantID), "1", ttl).Err()
}

// GrantValid reports whether a grant key exists (i.e. is unexpired).
func (s *Store) GrantValid(ctx context.Context, grantID string) (bool, error) {
	n, err := s.client.Exists(ctx, grantKey(grantID)).Result()
	if err != nil {
		return false, err
	}
	return n > 0, nil
}

// Ping checks Redis connectivity for health checks.
func (s *Store) Ping(ctx context.Context) error {
	return s.client.Ping(ctx).Err()
}

// Close closes the Redis client.
func (s *Store) Close() error {
	return s.client.Close()
}
