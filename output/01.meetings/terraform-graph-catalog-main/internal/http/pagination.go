// Copyright IBM Corp. 2026

package http

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"strings"

	"terraform-graph-catalog/internal/database"
)

// collectionResponse is the shared envelope for every collection endpoint.
// NextCursor is nil (JSON null) on the final page.
type collectionResponse struct {
	Data       any     `json:"data"`
	NextCursor *string `json:"next_cursor"`
	Count      int     `json:"count"`
}

// resourceCursorJSON is the compact wire form of a resource keyset cursor.
type resourceCursorJSON struct {
	W string `json:"w"`
	A string `json:"a"`
	K string `json:"k"`
}

// providerCursorJSON is the compact wire form of a provider keyset cursor.
type providerCursorJSON struct {
	W string `json:"w"`
	S string `json:"s"`
	L string `json:"l"`
}

// parsePageSize reads the page_size query parameter; 0 (the zero value) lets the
// data layer apply its default and maximum.
func parsePageSize(q url.Values) int {
	n, err := strconv.Atoi(q.Get("page_size"))
	if err != nil || n < 0 {
		return 0
	}
	return n
}

// attrFilters extracts attribute filters expressed as attr[<key>]=<value>.
func attrFilters(q url.Values) map[string]string {
	var m map[string]string
	for k, vs := range q {
		if !strings.HasPrefix(k, "attr[") || !strings.HasSuffix(k, "]") || len(vs) == 0 {
			continue
		}
		key := k[len("attr[") : len(k)-1]
		if key == "" {
			continue
		}
		if m == nil {
			m = make(map[string]string)
		}
		m[key] = vs[0]
	}
	return m
}

// decodeResourceCursor parses a base64 resource cursor. An empty string yields an
// unset cursor (start of collection).
func decodeResourceCursor(s string) (database.ResourceCursor, error) {
	if s == "" {
		return database.ResourceCursor{}, nil
	}
	raw, err := base64.RawURLEncoding.DecodeString(s)
	if err != nil {
		return database.ResourceCursor{}, fmt.Errorf("invalid cursor: %w", err)
	}
	var j resourceCursorJSON
	if err := json.Unmarshal(raw, &j); err != nil {
		return database.ResourceCursor{}, fmt.Errorf("invalid cursor: %w", err)
	}
	return database.ResourceCursor{WorkspaceID: j.W, Address: j.A, InstanceKey: j.K, Set: true}, nil
}

// encodeResourceCursor renders a resource cursor as a base64 string, or nil when
// there is no next page.
func encodeResourceCursor(c *database.ResourceCursor) *string {
	if c == nil {
		return nil
	}
	raw, _ := json.Marshal(resourceCursorJSON{W: c.WorkspaceID, A: c.Address, K: c.InstanceKey})
	s := base64.RawURLEncoding.EncodeToString(raw)
	return &s
}

// decodeProviderCursor parses a base64 provider cursor.
func decodeProviderCursor(s string) (database.ProviderCursor, error) {
	if s == "" {
		return database.ProviderCursor{}, nil
	}
	raw, err := base64.RawURLEncoding.DecodeString(s)
	if err != nil {
		return database.ProviderCursor{}, fmt.Errorf("invalid cursor: %w", err)
	}
	var j providerCursorJSON
	if err := json.Unmarshal(raw, &j); err != nil {
		return database.ProviderCursor{}, fmt.Errorf("invalid cursor: %w", err)
	}
	return database.ProviderCursor{WorkspaceID: j.W, ProviderSource: j.S, Alias: j.L, Set: true}, nil
}

// encodeProviderCursor renders a provider cursor as a base64 string, or nil.
func encodeProviderCursor(c *database.ProviderCursor) *string {
	if c == nil {
		return nil
	}
	raw, _ := json.Marshal(providerCursorJSON{W: c.WorkspaceID, S: c.ProviderSource, L: c.Alias})
	s := base64.RawURLEncoding.EncodeToString(raw)
	return &s
}
