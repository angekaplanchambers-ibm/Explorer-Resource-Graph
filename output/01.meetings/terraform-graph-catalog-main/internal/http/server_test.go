// Copyright IBM Corp. 2026

package http

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"terraform-graph-catalog/internal/database"

	"github.com/stretchr/testify/require"
)

const (
	testIngestSecret  = "dev-ingest-secret"
	testServiceSecret = "dev-service-secret"
)

// newTestServer wires a Server against a throwaway Postgres schema and the local
// Redis, and returns a running httptest server.
func newTestServer(t *testing.T) *httptest.Server {
	t.Helper()
	return newTestServerWithLLM(t, "")
}

type envelope struct {
	Data       json.RawMessage `json:"data"`
	NextCursor *string         `json:"next_cursor"`
	Count      int             `json:"count"`
}

func doReq(t *testing.T, method, url, secret string, body any) (*http.Response, []byte) {
	t.Helper()
	var r io.Reader
	if body != nil {
		b, err := json.Marshal(body)
		require.NoError(t, err)
		r = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, url, r)
	require.NoError(t, err)
	if secret != "" {
		req.Header.Set("Authorization", "Bearer "+secret)
	}
	resp, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	data, err := io.ReadAll(resp.Body)
	require.NoError(t, err)
	_ = resp.Body.Close()
	return resp, data
}

// seedViaHTTP ingests a two-workspace graph through the public ingest endpoints.
func seedViaHTTP(t *testing.T, base string) {
	t.Helper()

	// ws-a: vpc + web (web depends_on vpc), with a sensitive provider config.
	resp, _ := doReq(t, http.MethodPost, base+"/ingest/state-version", testIngestSecret, map[string]any{
		"workspace_id": "ws-a", "org_id": "org-1", "state_version_id": "sv-a1",
		"resources": []map[string]any{
			{"address": "aws_vpc.main", "resource_type": "aws_vpc", "resource_name": "main", "provider": "registry.terraform.io/hashicorp/aws", "attributes": map[string]any{"cidr_block": "10.0.0.0/16"}},
			{"address": "aws_instance.web", "resource_type": "aws_instance", "resource_name": "web", "provider": "registry.terraform.io/hashicorp/aws", "dependencies": []string{"aws_vpc.main"}, "attributes": map[string]any{"instance_type": "m5.large", "private_ip": "<sensitive>"}},
		},
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)

	resp, _ = doReq(t, http.MethodPost, base+"/ingest/plan", testServiceSecret, map[string]any{
		"workspace_id": "ws-a", "org_id": "org-1", "state_version_id": "sv-a1",
		"resources": []map[string]any{
			{"resource_address": "aws_vpc.main", "resource_type": "aws_vpc", "provider": "aws"},
			{"resource_address": "aws_instance.web", "resource_type": "aws_instance", "provider": "aws", "config_depends_on": []string{"aws_vpc.main"}},
		},
		"providers": []map[string]any{
			{"provider_source": "registry.terraform.io/hashicorp/aws", "version_constraint": ">= 5.0", "version_exact": "5.3.0",
				"configuration": map[string]any{
					"region":     map[string]any{"constant_value": "us-east-1"},
					"access_key": map[string]any{"sensitive": true},
				}},
		},
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)

	// ws-b consumes ws-a (for blast radius).
	resp, _ = doReq(t, http.MethodPost, base+"/ingest/state-version", testIngestSecret, map[string]any{
		"workspace_id": "ws-b", "org_id": "org-1", "state_version_id": "sv-b1",
		"resources": []map[string]any{
			{"address": "aws_db.main", "resource_type": "aws_db_instance", "resource_name": "main", "provider": "registry.terraform.io/hashicorp/aws"},
		},
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)
	resp, _ = doReq(t, http.MethodPost, base+"/ingest/plan", testServiceSecret, map[string]any{
		"workspace_id": "ws-b", "org_id": "org-1", "state_version_id": "sv-b1",
		"workspace_edges": []map[string]any{{"producer_workspace_id": "ws-a"}},
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)
}

func devGrant(t *testing.T, base string) string {
	t.Helper()
	resp, body := doReq(t, http.MethodPost, base+"/dev/grants/all", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var g grantResponse
	require.NoError(t, json.Unmarshal(body, &g))
	require.NotEmpty(t, g.GrantID)
	return g.GrantID
}

func TestHealth(t *testing.T) {
	ts := newTestServer(t)
	resp, _ := doReq(t, http.MethodGet, ts.URL+"/healthz", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestIngestAuth(t *testing.T) {
	ts := newTestServer(t)

	// No secret -> 401.
	resp, _ := doReq(t, http.MethodPost, ts.URL+"/ingest/state-version", "", map[string]any{
		"workspace_id": "ws-a", "org_id": "org-1", "state_version_id": "sv-a1",
	})
	require.Equal(t, http.StatusUnauthorized, resp.StatusCode)

	// Wrong secret -> 401.
	resp, _ = doReq(t, http.MethodPost, ts.URL+"/ingest/state-version", "nope", map[string]any{
		"workspace_id": "ws-a", "org_id": "org-1", "state_version_id": "sv-a1",
	})
	require.Equal(t, http.StatusUnauthorized, resp.StatusCode)

	// The service secret must not be accepted on the ingest-secret endpoint.
	resp, _ = doReq(t, http.MethodPost, ts.URL+"/ingest/state-version", testServiceSecret, map[string]any{
		"workspace_id": "ws-a", "org_id": "org-1", "state_version_id": "sv-a1",
	})
	require.Equal(t, http.StatusUnauthorized, resp.StatusCode)
}

func TestQueryFlowAndRedaction(t *testing.T) {
	ts := newTestServer(t)
	seedViaHTTP(t, ts.URL)
	grant := devGrant(t, ts.URL)

	// Unknown grant -> 404.
	resp, _ := doReq(t, http.MethodGet, ts.URL+"/api/v1/grants/not-a-grant/resources", "", nil)
	require.Equal(t, http.StatusNotFound, resp.StatusCode)

	// Resources, filtered by type.
	resp, body := doReq(t, http.MethodGet, ts.URL+"/api/v1/grants/"+grant+"/resources?resource_type=aws_instance", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var env envelope
	require.NoError(t, json.Unmarshal(body, &env))
	require.Equal(t, 1, env.Count)
	require.Nil(t, env.NextCursor)

	var resources []database.ResourceResult
	require.NoError(t, json.Unmarshal(env.Data, &resources))
	require.Len(t, resources, 1)
	var attrs map[string]any
	require.NoError(t, json.Unmarshal(resources[0].Attributes, &attrs))
	require.Equal(t, "<sensitive>", attrs["private_ip"])

	// Providers: the sensitive access_key must have been redacted on ingest.
	resp, body = doReq(t, http.MethodGet, ts.URL+"/api/v1/grants/"+grant+"/providers", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	require.NoError(t, json.Unmarshal(body, &env))
	require.Equal(t, 1, env.Count)
	var providers []database.ProviderResult
	require.NoError(t, json.Unmarshal(env.Data, &providers))
	var conf map[string]json.RawMessage
	require.NoError(t, json.Unmarshal(providers[0].Configuration, &conf))
	require.JSONEq(t, `"<sensitive>"`, string(conf["access_key"]))
	require.JSONEq(t, `{"constant_value":"us-east-1"}`, string(conf["region"]))

	// Dependents of the VPC: web depends on it explicitly.
	resp, body = doReq(t, http.MethodGet, ts.URL+"/api/v1/grants/"+grant+"/resources/aws_vpc.main/dependents", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	require.NoError(t, json.Unmarshal(body, &env))
	require.Equal(t, 1, env.Count)
	require.NoError(t, json.Unmarshal(env.Data, &resources))
	require.Equal(t, "aws_instance.web", resources[0].Address)
	require.NotNil(t, resources[0].DependencyReason)
	require.Equal(t, "explicit", *resources[0].DependencyReason)

	// Blast radius of ws-a reaches ws-b at hop 1.
	resp, body = doReq(t, http.MethodGet, ts.URL+"/api/v1/grants/"+grant+"/workspaces/ws-a/blast-radius", "", nil)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	require.NoError(t, json.Unmarshal(body, &env))
	require.Equal(t, 1, env.Count)
	require.NoError(t, json.Unmarshal(env.Data, &resources))
	require.Equal(t, "ws-b", resources[0].WorkspaceID)
	require.NotNil(t, resources[0].HopDistance)
	require.Equal(t, 1, *resources[0].HopDistance)
}

func TestCreateGrantAndPagination(t *testing.T) {
	ts := newTestServer(t)
	seedViaHTTP(t, ts.URL)

	// Create a grant for ws-a only, via the service-secret endpoint.
	resp, body := doReq(t, http.MethodPost, ts.URL+"/api/v1/grants", testServiceSecret, map[string]any{
		"workspace_ids": []string{"ws-a"}, "ttl_seconds": 600,
	})
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var g grantResponse
	require.NoError(t, json.Unmarshal(body, &g))

	// Page through ws-a's 2 resources one at a time, following next_cursor.
	var addrs []string
	url := ts.URL + "/api/v1/grants/" + g.GrantID + "/resources?page_size=1"
	for i := 0; i < 10; i++ {
		resp, body := doReq(t, http.MethodGet, url, "", nil)
		require.Equal(t, http.StatusOK, resp.StatusCode)
		var env envelope
		require.NoError(t, json.Unmarshal(body, &env))
		require.Equal(t, 2, env.Count)
		var page []database.ResourceResult
		require.NoError(t, json.Unmarshal(env.Data, &page))
		for _, r := range page {
			addrs = append(addrs, r.Address)
		}
		if env.NextCursor == nil {
			break
		}
		url = ts.URL + "/api/v1/grants/" + g.GrantID + "/resources?page_size=1&cursor=" + *env.NextCursor
	}
	require.Equal(t, []string{"aws_instance.web", "aws_vpc.main"}, addrs)

	// Grant creation requires the service secret.
	resp, _ = doReq(t, http.MethodPost, ts.URL+"/api/v1/grants", testIngestSecret, map[string]any{"workspace_ids": []string{"ws-a"}})
	require.Equal(t, http.StatusUnauthorized, resp.StatusCode)
}
