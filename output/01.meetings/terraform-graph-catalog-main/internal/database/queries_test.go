// Copyright IBM Corp. 2026

package database

import (
	"context"
	"encoding/json"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func ptr(s string) *string { return &s }

func raw(s string) json.RawMessage { return json.RawMessage(s) }

// seed loads a small multi-workspace graph used across the query tests:
//
//	ws-a (org-1): aws_vpc.main, aws_subnet.main, aws_instance.web[0..1]
//	ws-b (org-1): aws_db.main          (consumes outputs from ws-a)
//	ws-c (org-2): aws_cache.main        (consumes outputs from ws-b)
//	ws-d (org-2): aws_foo.a, aws_foo.b  (state only, no plan -> "unknown")
//
// Edges: ws-b<-ws-a, ws-c<-ws-b, giving ws-a a 2-hop blast radius (ws-b, ws-c).
func seed(t *testing.T, db *TestDB) {
	t.Helper()
	ctx := context.Background()

	// --- ws-a state ---
	ingested, err := db.IngestStateVersion(ctx, StateVersionIngest{
		WorkspaceID: "ws-a", OrgID: "org-1", ProjectID: ptr("prj-1"), StateVersionID: "sv-a1",
		Resources: []ResourceInstanceInput{
			{Address: "aws_vpc.main", ResourceType: "aws_vpc", ResourceName: "main", Provider: "registry.terraform.io/hashicorp/aws", Attributes: raw(`{"cidr_block":"10.0.0.0/16"}`)},
			{Address: "aws_subnet.main", ResourceType: "aws_subnet", ResourceName: "main", Provider: "registry.terraform.io/hashicorp/aws", Dependencies: []string{"aws_vpc.main"}, Attributes: raw(`{"cidr_block":"10.0.1.0/24"}`)},
			{Address: "aws_instance.web[0]", ResourceType: "aws_instance", ResourceName: "web", InstanceKey: "0", Provider: "registry.terraform.io/hashicorp/aws", Dependencies: []string{"aws_vpc.main", "aws_subnet.main"}, Attributes: raw(`{"instance_type":"m5.large","subnet_id":"subnet-1","private_ip":"<sensitive>"}`)},
			{Address: "aws_instance.web[1]", ResourceType: "aws_instance", ResourceName: "web", InstanceKey: "1", Provider: "registry.terraform.io/hashicorp/aws", Dependencies: []string{"aws_vpc.main", "aws_subnet.main"}, Attributes: raw(`{"instance_type":"m5.large","subnet_id":"subnet-1","private_ip":"<sensitive>"}`)},
		},
		Outputs: []StateOutputInput{
			{Name: "vpc_id", Value: raw(`"vpc-1"`)},
			{Name: "db_password", Sensitive: true}, // value nil
		},
	})
	require.NoError(t, err)
	require.True(t, ingested)

	// --- ws-a plan (configs, providers) ---
	_, err = db.IngestPlan(ctx, PlanIngest{
		WorkspaceID: "ws-a", OrgID: "org-1", ProjectID: ptr("prj-1"), StateVersionID: "sv-a1",
		Resources: []ResourceConfigInput{
			{ResourceAddress: "aws_vpc.main", ResourceType: "aws_vpc", Provider: "aws"},
			{ResourceAddress: "aws_subnet.main", ResourceType: "aws_subnet", Provider: "aws",
				Expressions: raw(`{"vpc_id":{"references":["aws_vpc.main.id","aws_vpc.main"]}}`)},
			// web depends_on vpc explicitly, and references subnet implicitly.
			{ResourceAddress: "aws_instance.web", ResourceType: "aws_instance", Provider: "aws",
				ConfigDependsOn: []string{"aws_vpc.main"},
				Expressions:     raw(`{"subnet_id":{"references":["aws_subnet.main.id"]}}`)},
		},
		Providers: []ProviderConfigInput{
			{ProviderSource: "registry.terraform.io/hashicorp/aws", VersionConstraint: ptr(">= 5.0, < 6.0"), VersionExact: ptr("5.3.0"),
				Configuration: raw(`{"region":{"constant_value":"us-east-1"},"access_key":"<sensitive>"}`)},
		},
	})
	require.NoError(t, err)

	// --- ws-b: consumes ws-a ---
	_, err = db.IngestStateVersion(ctx, StateVersionIngest{
		WorkspaceID: "ws-b", OrgID: "org-1", StateVersionID: "sv-b1",
		Resources: []ResourceInstanceInput{
			{Address: "aws_db.main", ResourceType: "aws_db_instance", ResourceName: "main", Provider: "registry.terraform.io/hashicorp/aws", Attributes: raw(`{"engine":"postgres"}`)},
		},
	})
	require.NoError(t, err)
	_, err = db.IngestPlan(ctx, PlanIngest{
		WorkspaceID: "ws-b", OrgID: "org-1", StateVersionID: "sv-b1",
		Resources:      []ResourceConfigInput{{ResourceAddress: "aws_db.main", ResourceType: "aws_db_instance", Provider: "aws"}},
		WorkspaceEdges: []WorkspaceEdgeInput{{ProducerWorkspaceID: "ws-a"}},
	})
	require.NoError(t, err)

	// --- ws-c: consumes ws-b ---
	_, err = db.IngestStateVersion(ctx, StateVersionIngest{
		WorkspaceID: "ws-c", OrgID: "org-2", StateVersionID: "sv-c1",
		Resources: []ResourceInstanceInput{
			{Address: "aws_cache.main", ResourceType: "aws_elasticache_cluster", ResourceName: "main", Provider: "registry.terraform.io/hashicorp/aws", Attributes: raw(`{"engine":"redis"}`)},
		},
	})
	require.NoError(t, err)
	_, err = db.IngestPlan(ctx, PlanIngest{
		WorkspaceID: "ws-c", OrgID: "org-2", StateVersionID: "sv-c1",
		WorkspaceEdges: []WorkspaceEdgeInput{{ProducerWorkspaceID: "ws-b"}},
	})
	require.NoError(t, err)

	// --- ws-d: state only, no plan (exercises "unknown" dependency reason) ---
	_, err = db.IngestStateVersion(ctx, StateVersionIngest{
		WorkspaceID: "ws-d", OrgID: "org-2", StateVersionID: "sv-d1",
		Resources: []ResourceInstanceInput{
			{Address: "aws_foo.a", ResourceType: "aws_foo", ResourceName: "a", Provider: "registry.terraform.io/hashicorp/aws"},
			{Address: "aws_foo.b", ResourceType: "aws_foo", ResourceName: "b", Provider: "registry.terraform.io/hashicorp/aws", Dependencies: []string{"aws_foo.a"}},
		},
	})
	require.NoError(t, err)
}

func grantAll(t *testing.T, db *TestDB) string {
	t.Helper()
	g, err := db.CreateGrant(context.Background(), []string{"ws-a", "ws-b", "ws-c", "ws-d"}, time.Hour)
	require.NoError(t, err)
	return g.GrantID
}

func TestQueryResources_FilterAndJSONBRoundTrip(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	grant := grantAll(t, db)
	ctx := context.Background()

	// resource_type + attribute filter, scoped to the grant.
	res, next, total, err := db.QueryResources(ctx, ResourceQuery{
		GrantID:      grant,
		ResourceType: "aws_instance",
		AttrFilters:  map[string]string{"instance_type": "m5.large"},
	})
	require.NoError(t, err)
	require.Nil(t, next)
	require.Equal(t, 2, total)
	require.Len(t, res, 2)

	// jsonb round-trips and the sensitive sentinel is preserved verbatim.
	var attrs map[string]any
	require.NoError(t, json.Unmarshal(res[0].Attributes, &attrs))
	require.Equal(t, "m5.large", attrs["instance_type"])
	require.Equal(t, "<sensitive>", attrs["private_ip"])
	require.Equal(t, "prj-1", *res[0].ProjectID)
	require.ElementsMatch(t, []string{"aws_vpc.main", "aws_subnet.main"}, res[0].Dependencies)

	// An attribute filter that matches nothing.
	_, _, total, err = db.QueryResources(ctx, ResourceQuery{GrantID: grant, AttrFilters: map[string]string{"instance_type": "nope"}})
	require.NoError(t, err)
	require.Equal(t, 0, total)
}

func TestQueryResources_GrantScoping(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	ctx := context.Background()

	// Grant covering only ws-a must not surface ws-b/ws-c/ws-d resources.
	g, err := db.CreateGrant(ctx, []string{"ws-a"}, time.Hour)
	require.NoError(t, err)

	res, _, total, err := db.QueryResources(ctx, ResourceQuery{GrantID: g.GrantID})
	require.NoError(t, err)
	require.Equal(t, 4, total) // vpc, subnet, web[0], web[1]
	for _, r := range res {
		require.Equal(t, "ws-a", r.WorkspaceID)
	}
}

func TestQueryResources_KeysetPagination(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	ctx := context.Background()

	g, err := db.CreateGrant(ctx, []string{"ws-a"}, time.Hour)
	require.NoError(t, err)

	var (
		seen   []string
		cursor ResourceCursor
		pages  int
	)
	for {
		res, next, total, err := db.QueryResources(ctx, ResourceQuery{GrantID: g.GrantID, Cursor: cursor, PageSize: 2})
		require.NoError(t, err)
		require.Equal(t, 4, total)
		for _, r := range res {
			seen = append(seen, r.Address)
		}
		pages++
		if next == nil {
			break
		}
		cursor = *next
		require.Less(t, pages, 10, "pagination did not terminate")
	}
	require.Equal(t, 2, pages)
	require.Equal(t, []string{
		"aws_instance.web[0]", "aws_instance.web[1]", "aws_subnet.main", "aws_vpc.main",
	}, seen)
}

func TestGetDependents_Reasons(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	grant := grantAll(t, db)
	ctx := context.Background()

	reasonByAddr := func(addr string) map[string]string {
		res, _, _, err := db.GetDependents(ctx, grant, addr, ResourceCursor{}, 0)
		require.NoError(t, err)
		m := map[string]string{}
		for _, r := range res {
			require.NotNil(t, r.DependencyReason)
			m[r.Address] = *r.DependencyReason
		}
		return m
	}

	// Dependents of the VPC: subnet references it implicitly via vpc_id; the web
	// instances declare it in depends_on (explicit).
	vpc := reasonByAddr("aws_vpc.main")
	require.Equal(t, "implicit:vpc_id", vpc["aws_subnet.main"])
	require.Equal(t, "explicit", vpc["aws_instance.web[0]"])
	require.Equal(t, "explicit", vpc["aws_instance.web[1]"])

	// Dependents of the subnet: web instances reference it implicitly via subnet_id.
	subnet := reasonByAddr("aws_subnet.main")
	require.Equal(t, "implicit:subnet_id", subnet["aws_instance.web[0]"])
	require.Equal(t, "implicit:subnet_id", subnet["aws_instance.web[1]"])

	// ws-d has no plan ingested, so its dependency reason is unknown.
	foo := reasonByAddr("aws_foo.a")
	require.Equal(t, "unknown", foo["aws_foo.b"])
}

func TestQueryProviders(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	grant := grantAll(t, db)
	ctx := context.Background()

	res, _, total, err := db.QueryProviders(ctx, ProviderQuery{GrantID: grant, ProviderSource: "registry.terraform.io/hashicorp/aws"})
	require.NoError(t, err)
	require.Equal(t, 1, total)
	require.Len(t, res, 1)
	require.Equal(t, "5.3.0", *res[0].VersionExact)

	var conf map[string]any
	require.NoError(t, json.Unmarshal(res[0].Configuration, &conf))
	require.Equal(t, "<sensitive>", conf["access_key"])

	// Substring match on version constraint.
	_, _, total, err = db.QueryProviders(ctx, ProviderQuery{GrantID: grant, VersionConstraint: "< 6.0"})
	require.NoError(t, err)
	require.Equal(t, 1, total)

	_, _, total, err = db.QueryProviders(ctx, ProviderQuery{GrantID: grant, VersionExact: "9.9.9"})
	require.NoError(t, err)
	require.Equal(t, 0, total)
}

func TestBlastRadius(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	grant := grantAll(t, db)
	ctx := context.Background()

	res, _, total, err := db.BlastRadius(ctx, grant, "ws-a", ResourceCursor{}, 0)
	require.NoError(t, err)
	// ws-b (aws_db.main) at hop 1, ws-c (aws_cache.main) at hop 2.
	require.Equal(t, 2, total)

	hops := map[string]int{}
	for _, r := range res {
		require.NotNil(t, r.HopDistance)
		hops[r.WorkspaceID] = *r.HopDistance
	}
	require.Equal(t, 1, hops["ws-b"])
	require.Equal(t, 2, hops["ws-c"])

	// A workspace nobody consumes from has an empty blast radius.
	_, _, total, err = db.BlastRadius(ctx, grant, "ws-c", ResourceCursor{}, 0)
	require.NoError(t, err)
	require.Equal(t, 0, total)
}

func TestIngestIdempotency(t *testing.T) {	db := NewTestDB(t)
	ctx := context.Background()

	in := StateVersionIngest{
		WorkspaceID: "ws-x", OrgID: "org-1", StateVersionID: "sv-x1",
		Resources: []ResourceInstanceInput{{Address: "aws_vpc.main", ResourceType: "aws_vpc", ResourceName: "main", Provider: "aws"}},
	}
	ingested, err := db.IngestStateVersion(ctx, in)
	require.NoError(t, err)
	require.True(t, ingested)

	// Re-ingesting the same state_version_id is a no-op.
	ingested, err = db.IngestStateVersion(ctx, in)
	require.NoError(t, err)
	require.False(t, ingested)

	// A new state version replaces the prior set.
	in.StateVersionID = "sv-x2"
	in.Resources = []ResourceInstanceInput{
		{Address: "aws_vpc.main", ResourceType: "aws_vpc", ResourceName: "main", Provider: "aws"},
		{Address: "aws_subnet.main", ResourceType: "aws_subnet", ResourceName: "main", Provider: "aws"},
	}
	ingested, err = db.IngestStateVersion(ctx, in)
	require.NoError(t, err)
	require.True(t, ingested)

	g, err := db.CreateGrant(ctx, []string{"ws-x"}, time.Hour)
	require.NoError(t, err)
	_, _, total, err := db.QueryResources(ctx, ResourceQuery{GrantID: g.GrantID})
	require.NoError(t, err)
	require.Equal(t, 2, total)
}

func TestUpdateProviderVersions(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	ctx := context.Background()

	// ws-a's provider was seeded with version_exact "5.3.0" — patch it.
	err := db.UpdateProviderVersions(ctx, "ws-a", []ProviderVersionUpdate{
		{ProviderSource: "registry.terraform.io/hashicorp/aws", Version: "5.9.0"},
	})
	require.NoError(t, err)

	g, err := db.CreateGrant(ctx, []string{"ws-a"}, time.Hour)
	require.NoError(t, err)
	res, _, _, err := db.QueryProviders(ctx, ProviderQuery{GrantID: g.GrantID})
	require.NoError(t, err)
	require.Len(t, res, 1)
	require.NotNil(t, res[0].VersionExact)
	require.Equal(t, "5.9.0", *res[0].VersionExact)

	// Updating a provider that doesn't exist is a silent no-op.
	err = db.UpdateProviderVersions(ctx, "ws-b", []ProviderVersionUpdate{
		{ProviderSource: "registry.terraform.io/hashicorp/aws", Version: "5.9.0"},
	})
	require.NoError(t, err)

	// Empty slice is also a no-op.
	err = db.UpdateProviderVersions(ctx, "ws-a", nil)
	require.NoError(t, err)
}

func TestListGrantWorkspaces(t *testing.T) {
	db := NewTestDB(t)
	seed(t, db)
	ctx := context.Background()

	// Grant covering ws-a (4 resources, 1 downstream) and ws-b (1 resource, 1 downstream).
	g, err := db.CreateGrant(ctx, []string{"ws-a", "ws-b"}, time.Hour)
	require.NoError(t, err)

	// Default sort: resource_count descending.
	rows, total, err := db.ListGrantWorkspaces(ctx, g.GrantID, 50, "resource_count")
	require.NoError(t, err)
	require.Equal(t, 2, total)
	require.Len(t, rows, 2)
	require.Equal(t, "ws-a", rows[0].WorkspaceID)
	require.Equal(t, "ws-b", rows[1].WorkspaceID)
	require.Equal(t, 4, rows[0].ResourceCount)
	require.Equal(t, 1, rows[1].ResourceCount)
	// ws-a has ws-b as a direct downstream.
	require.Equal(t, 1, rows[0].DownstreamWorkspaces)

	// Sort by blast_radius: ws-a still wins (most downstream).
	rows, _, err = db.ListGrantWorkspaces(ctx, g.GrantID, 50, "blast_radius")
	require.NoError(t, err)
	require.Equal(t, "ws-a", rows[0].WorkspaceID)

	// Limit respected: only 1 row returned, total unchanged.
	rows, total, err = db.ListGrantWorkspaces(ctx, g.GrantID, 1, "resource_count")
	require.NoError(t, err)
	require.Equal(t, 2, total)
	require.Len(t, rows, 1)

	// Empty result for a grant with no workspaces.
	gEmpty, err := db.CreateGrant(ctx, nil, time.Hour)
	require.NoError(t, err)
	rows, total, err = db.ListGrantWorkspaces(ctx, gEmpty.GrantID, 50, "resource_count")
	require.NoError(t, err)
	require.Equal(t, 0, total)
	require.Empty(t, rows)
}
